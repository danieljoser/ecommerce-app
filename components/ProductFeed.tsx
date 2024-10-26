'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import ProductList from './ProductList'

const ProductFeed = (): React.JSX.Element => {
  
  const [products, setProducts] = useState([]);

  const fetchProducts: () => Promise<void> = async () => {
    const response: Response = await fetch('/api/product');
    const data = await response.json();
    setProducts(data)
    

    
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  
  
    return (
        <section className='feed'>
            
            { <ProductList 
                data={products}
            /> }
        </section>
  )
}

export default ProductFeed