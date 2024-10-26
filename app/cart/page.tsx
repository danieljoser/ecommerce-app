'use client'

import CartList from '@/components/CartList';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CartProduct } from '@/type/types';
const page = () => {

  const {data: session} = useSession();

  const [totalAmount, setTotalAmount] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [deleted, setDeleted] = useState(0);
  const [bought, setBought] = useState(false)

  const router = useRouter();

  const handleDelete = async (product: CartProduct) => {
    const hasConfirmed = confirm('Are you sure you want to delete this order?')

    if (hasConfirmed) {
      try {
        const userId = session?.user.id
        const orderId = product._id.toString();
        await fetch(`/api/cart/${userId}?orderId=${orderId}`, {method: 'DELETE'});

        const filteredProducts = products.filter((p: CartProduct) => p._id !== product._id )

        setProducts(filteredProducts);
        setDeleted(prevDeleted => prevDeleted + 1);
  
    
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCheckout = () => {
    setBought(true);
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }

  const getOrderProducts = async () => {

    
    const userId = session?.user.id;
    const response = await fetch(`/api/cart/${userId}`);
    const data = await response.json();
    setProducts(data);
  };

  

  const calculateTotalAmount = () => {
  
    const total = products.reduce((n: any, {items}: any) => n + (items.price * items.quantity), 0);
    setTotalAmount(total);
  }

  
  const calculateTotalProducts = () => {
    const total = products.reduce((n: any, {items}: any) => n + items.quantity, 0);
    setTotalProducts(total);
  }

  useEffect(() => {
    if (products){
      getOrderProducts();
    };
    
    setTimeout(() => {
      calculateTotalAmount();
      calculateTotalProducts();
    }, 500)

  }, [session, totalAmount, totalProducts, deleted])

  return (
    <section className='flex flex-col sm:mx-32 mx-8 mb-8'>
      <p className='font-bold text-xl mb-4 font-inter'>{session?.user.name}'s products cart</p>
      <div className='grid grid-cols-5 gap-4'>
        <p className='col-span-2 font-bold'>Item</p>
        <p className='font-bold'>Price</p>
        <p className='font-bold'>Quantity</p>
        <p className='font-bold'>Total</p>

      </div>
      <hr className='border-yellow-400 border-2 mb-6'></hr>
      <CartList 
        data={products}
        handleDelete = {handleDelete}
      />
      <hr className='border-yellow-400 border-2 '></hr>
      <div className='grid grid-cols-5 items-center'>
        <p className='col-start-4 text-right mr-6 text-lg font-satoshi text-gray-600 sm:text-xl max-w-4xl'>Order Summary:</p>
        <div className='flex flex-col text-lg  font-satoshi text-gray-900 sm:text-xl max-w-4xl'>
          <p>Total Products: <i className='text-indigo-800 font-bold'>{totalProducts}</i></p>
          <p>Total Cost: <i className='text-green-700 font-bold'>{totalAmount ? Number(totalAmount).toFixed(2) : 0}$</i></p>
        </div>
        
      </div>

      <button className="flex self-center justify-center mt-6 font-bold text-lg rounded-md bg-transparent border-2 border-green-500
       text-black transition-all hover:bg-green-500 hover:text-white py-2 px-24 w-1/4" onClick={handleCheckout}>Checkout</button>
      <p className='text-center text-lg text-blue-950 font-bold mt-6'>
        {bought ? 'Thank you for your purchase! You will be receiving an email with a form for the next steps' : ''}
      </p>
    </section>
  )
}

export default page