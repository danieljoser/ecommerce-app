'use client'

import Link from "next/link";
import Image from "next/image";
import {useState} from 'react';
import {signOut, useSession} from 'next-auth/react';


const Nav = () => {

    const { data : session } = useSession(); 
    const [providers, setProviders] = useState<any>(null)

    const [toggleDropdown, setToggleDropdown] = useState(false);


    

  return (
    <nav className="flex justify-between w-full mb-12 py-5 px-1 bg-gray-50 sm:px-20" >
        <Link href='/' className="flex gap-2 flex-center items-center" >
            <Image 
                src='/assets/images/ecomm-logo.png'
                alt="ecommerce-logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <p className="logo_text">AtYourShop</p>
        </Link>
        

        {/*Desktop Design*/}
        <div className="sm:flex gap-5 items-center font-satoshi text-gray-700 hidden">
            <Link href='/products?category=electronics&price=all&rating=all&review=all'> 
                Electronics
            </Link>
            <Link href='/products?category=jewelery&price=all&rating=all&review=all'>
                Jewelry
            </Link>
            <div className="dropdown">
                <button className="drop_btn">Clothes</button>
                <div className="dropdown_content">
                    <Link className="dropdown_link" href="/products?category=men's-clothing&price=all&rating=all&review=all">Men's</Link>
                    <Link className='dropdown_link'href="/products?category=women's-clothing&price=all&rating=all&review=all">Women's</Link>
                </div>
            </div>
        </div>


        <div className="sm:flex hidden">
            {session?.user?  (
                <div className="flex gap-5 flex-center items-center">
                    
                    
                    <div className="flex items-center gap-3">
                        <Image 
                            src={session?.user.image || '/assets/images/profile-image.png'} 
                            
                            alt='profile picture'
                            width={37}
                            height={37}
                            className='rounded-md'
                        />
                        
                        <p> {session.user.name}  </p>
                    </div>


                    <Link href='/cart' className="cart_btn">
                        Go to Cart
                    </Link>

                    <button type='button' onClick={() => signOut({callbackUrl: '/', redirect: true})} className='orange_btn'>
                        Sign Out
                    </button>

                </div>
                ) : (
                    <div className="flex gap-5 items-center">
                        <Link href='/login' className="orange_btn">
                            Log in
                        </Link>
                        <Link href='/signup' className="violet_btn">
                            Sign up
                        </Link>
                    </div>
                )}

        </div>

        {/*Mobile Design*/}
        <div className="sm:hidden flex gap-5 items-center font-satoshi text-gray-700">
            
            <div className="dropdown">
                <button className="drop_btn">Categories</button>
                <div className="dropdown_content">
                    <Link href='/products?category=electronics&price=all&rating=all&review=all' className="dropdown_link"> 
                        Electronics
                    </Link>
                    <Link href='/products?category=jewelery&price=all&rating=all&review=all' className="dropdown_link">
                        Jewelry
                    </Link>
                    <Link className="dropdown_link" href="/products?category=men's-clothing&price=all&rating=all&review=all">Men's Clothes</Link>
                    <Link className='dropdown_link'href="/products?category=women's-clothing&price=all&rating=all&review=all">Women's Clothes</Link>
                </div>
            </div>

        <div className="sm:hidden flex">
            { session?.user  ? (
                <div className="flex flex-center items-center relative">
                    
                    <Image 
                        src={session?.user.image || '/assets/images/profile-image.png'}
                        
                        alt='profile picture'
                        width={37}
                        height={37}
                        className='rounded-full'
                        onClick={() => setToggleDropdown(prevState => !prevState)}
                    />



                    {toggleDropdown && (
                    <div className='dropdown_prof'>
                        
                        <Link
                            href='/cart'
                            className='mt-5 w-full cart_btn'
                            onClick={() => setToggleDropdown(false)}
                        >
                            Go to cart
                        </Link>

                        <button 
                            type='button'
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                        className='mt-5 w-full orange_btn'
                        >
                            Sign Out
                        </button>

              </div>
            )}

                </div>
                ) : (
                    <div className="flex gap-2 items-center pl-10">
                        <Link href='/login' className="orange_btn">
                            Log in
                        </Link>
                        <Link href='/signup' className="violet_btn">
                            Sign up
                        </Link>
                    </div>
                )}

        </div>

            
        </div>
        
    </nav>
  )
}

export default Nav