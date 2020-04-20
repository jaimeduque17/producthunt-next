import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'
import Layout from '../components/layout/Layout'
import ProductDetails from '../components/layout/ProductDetails'

const Home = () => {

  const [products, setProducts] = useState([])

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('created', 'desc').onSnapshot(handlerSnapshot)
    }
    getProducts()
  }, [])

  function handlerSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setProducts(products)
  }

  return (
    <div>
      <Layout>
        <div className="products-list">
          <div className="container">
            <ul className="bg-white">
              {products.map(product => (
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

export default Home
