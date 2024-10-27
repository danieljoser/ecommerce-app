import React from 'react'


import ProductFeed from '@/components/ProductFeed';
import '@mantine/core/styles.css';

const Home = (): React.JSX.Element => {


  return (
    <section className='w-full flex items-center flex-col px-20 mt-20'>
      <h1 className='head_text'>
        <span className='violet_gradient'>Enjoy the Best Products</span> 
        <br className='max-md:hidden'/>
        {' '}<span className='orange_gradient'> at the Cheapest Prices </span>
      </h1>
      <p className='desc text-center'>
        In AtYourShop you can find the best offers you will ever see!
        If you are looking for electronic devices for your house, or
        you want to improve the way you look and feel confident about yourself,
        all that and more you can find in our store. Come take a look!
      </p>

      <ProductFeed />
    </section>
  )
}

export default Home;