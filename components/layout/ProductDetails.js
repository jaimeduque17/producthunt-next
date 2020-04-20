import React from 'react'

const ProductDetails = ({ product }) => {
    const { id, comments, created, description, company, name, url, imageUrl, vote } = product
    return (
        <li>
            <div>
                <div></div>
                <div>{name}</div>
            </div>
            <div></div>
        </li>
    )
}

export default ProductDetails