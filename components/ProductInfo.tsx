'use client'

import React from 'react';
import Image from 'next/image';
import { Rating } from '@mantine/core';
import { useState, useEffect } from 'react';
import {  useSearchParams, useRouter } from "next/navigation";
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useSession } from 'next-auth/react';


const ProductInfo = () => {
    
    const {data: session} = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    const [product, setProduct] = useState({
        id: '',
        title: '',
        price: 0,
        description: '',
        image: '',
        rating_value: 0,
        rating_count: 0
    })

    const [count, setCount] = useState(1);
    const [submitted, setSubmitted] = useState(false)
    
    // Function to find the product clicked
    async function findProduct() {
        try {
            const response = await fetch(`/api/product/id/${id}`);
            const data = await response.json();

            setProduct({
                id: data.id,
                title: data.title,
                price: data.price,
                description: data.description,
                image: data.image,
                rating_value: data.rating_value,
                rating_count: data.rating_count
            });
        } catch (error) {
           console.log(error);
        }
        
    };

    useEffect(() => {
        if (product) findProduct();

    }, [])

    function upCount() {
        setCount(prevCount => prevCount + 1)
    }

    function downCount() {
        setCount(prevCount => prevCount - 1)
    }
    
    async function handleClick() {
        if (!session?.user) {
            alert('You need to sign in before adding a product to Cart')
            router.push('/login')
        };
        try {
            const userId = session?.user.id;
            const response = await fetch(`/api/cart`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    image: product.image,
                    productId: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: count
                })
            });
            if (response.ok) {
                
                setTimeout(() => {
                    setSubmitted(false)
                }, 5000)
                setSubmitted(true);
            }

        } catch (error) {
            console.log(error);
            
        }
        


    }

    return (
    <section className='sm:flex block'>
        {/*Desktop Mode*/}
        <div className='sm:flex hidden mx-48 '>
            <Image 
                className='h-4/5'
                src={product.image}
                alt='product image'
                width={600}
                height={800}
            />
            <div className='flex flex-col ml-12 w-full '>
                <p className='font-inter text-4xl font-extrabold'>{product.title}</p>
                <hr className='border-purple-400 border-1 mb-6'></hr>
                <p className='font-bold text-green-500 text-3xl mb-2'>{`${product.price} $`}</p>
                <div className='flex items-center gap-4 font-bold'>
                    <Rating value={product.rating_value} fractions={5} readOnly/>
                    <p>{`${product.rating_count} reviews`}</p>
                </div>
                <p className='desc mb-4'>
                    {product.description}
                </p>

                <div className='flex gap-2 mb-8'>
                    <p className='font-bold'>Quantity:</p>
                    <p>{count}</p>
                    <div className='flex'>
                        {count === 10 ? '' : <IconChevronUp stroke={1.5} onClick={upCount} cursor={'pointer'}/>}
                        {count === 1 ? '' : <IconChevronDown stroke={1.5} onClick={downCount} cursor={'pointer'}/>}
                    </div>
                </div>

                {submitted ? (
                    <button className='border-2 h-10 w-full rounded-md font-bold font-satoshi bg-green-600 text-white border-green-400
                   cursor-not-allowed mb-8' disabled>Product has been added to cart succesfully</button>
                ) : (
                    <button className='border-2 h-10 w-full rounded-md font-bold font-satoshi text-blue-950 border-blue-950
                    transition-all hover:bg-blue-950 hover:text-white hover:border-blue-900 mb-8' onClick={handleClick}>Add to Cart</button>
                )}
                
            </div>
            
        </div>

        {/*Mobile mode*/}
        <div className='sm:hidden flex-col mx-4 justify-center'>
            <Image 
                className='h-4/5'
                src={product.image}
                alt='product image'
                width={550}
                height={500}
            />
            <div className='flex flex-col w-full '>
                <p className='font-inter text-4xl font-extrabold mt-4'>{product.title}</p>
                <hr className='border-purple-400 border-1 mb-6'></hr>
                <p className='font-bold text-green-500 text-3xl mb-2'>{`${product.price} $`}</p>
                <div className='flex items-center gap-4 font-bold'>
                    <Rating value={product.rating_value} fractions={5} readOnly/>
                    <p>{`${product.rating_count} reviews`}</p>
                </div>
                <p className='desc mb-4'>
                    {product.description}
                </p>

                <div className='flex gap-2 mb-8'>
                    <p className='font-bold'>Quantity:</p>
                    <p>{count}</p>
                    <div className='flex'>
                        {count === 10 ? '' : <IconChevronUp stroke={1.5} onClick={upCount} cursor={'pointer'}/>}
                        {count === 1 ? '' : <IconChevronDown stroke={1.5} onClick={downCount} cursor={'pointer'}/>}
                    </div>
                </div>

                <button className='border-2 h-10 w-full rounded-md font-bold font-satoshi text-blue-950 border-blue-950
                transition-all hover:bg-blue-950 hover:text-white hover:border-blue-900 mb-8' onClick={handleClick}>Add to Cart</button>
            </div>
            
        </div>
    </section>
  )
}

export default ProductInfo