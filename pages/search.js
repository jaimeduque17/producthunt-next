import React, {useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import ProductDetails from '../components/layout/ProductDetails'
import useProducts from '../hooks/useProducts'

const Search = () => {

  const router = useRouter()

  const { query: { q }} = router

  // All products
  const { products } = useProducts('created')
  const [result, setResult] = useState([])

  useEffect(() => {
    const searchItem = q.toLowerCase()
    const filterItem =  products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchItem) || 
        product.description.toLowerCase().includes(searchItem)
      )
    });
    setResult(filterItem);
    
}, [ q, products ]);

  return (
    <div>
      <Layout>
        <div className="products-list">
          <div className="container">
            <ul className="bg-white">
              {result.map(product => (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Search
