import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({data}: any) => {
  return (
    <div className='product_list'>
            
             {data.map((product: any) => (             
                <ProductCard 
                    product = {product}
                />
            ))}  

    </div> 
  )
}

export default ProductList