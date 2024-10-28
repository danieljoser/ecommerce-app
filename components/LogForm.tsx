'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import {signIn, useSession, getProviders, ClientSafeProvider} from 'next-auth/react'
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';
import comparePassword from "@/utils/comparePass";
import { generateVerificationToken } from "@/utils/token";
import Token from "@/models/token";

type form = {
    type: string
}

type inputForm = {
    email: string
    password: string
}



const LogForm = ({ type }: form) => {

    const router = useRouter();
    const {data: session} = useSession()


    let isLogin: boolean;

    if (type === 'login') {
        isLogin = true;
    } else {
        isLogin = false;
    }

    const [providers, setProviders] = useState<any>(null)
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const setupProvider: () => Promise<void> = async () => {
            const response = await getProviders();

            setProviders(response)
        }

        setupProvider();
    }, [])

    const handleChange = (e: any) => {
        
        const targetEvent = (e.target) as HTMLInputElement; 
            
        setForm(prevForm => {
                return {
                    ...prevForm,
                    [targetEvent.name] : targetEvent.value
                }
            }        
        )
    }

    


    const signUpEmail = async (e: any) => {
        
        e.preventDefault();
        
        const saltRounds = 10;

        bcrypt.hash(form.password, saltRounds, async function(err: Error | null, hash: string) {

            if (err) {
                throw new Error('There was a problem storing your password');
            }

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: form.email.toLowerCase(),
                        password: hash
                    })
                });
                if (response.ok) {
                    const verificationToken = await generateVerificationToken(form.email);
                    try {
                        const newResponse = await fetch('/api/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                email: form.email.toLowerCase(),
                                token: verificationToken
                            })
                        })
                        if (newResponse.ok) {
                        
                            router.push('/verification');
                        }
                    } catch (error) {
                        console.log(error);
                        
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })
    }


  return (
    
    <div>

        {isLogin ? (
            <section className='w-full flex items-center flex-col px-20'>
                <h1 className='text-xl font-satoshi'>Log in with your email or with your Google account</h1>
                <form className="sm:w-3/12 mt-10 w-full flex flex-col gap-5 glassmorphism font-satoshi ">
                    
                    <div className='flex flex-col'>
                        <Link href='/api/auth/signin' className="orange_btn">
                            Sign in with Google or with your account
                        </Link>   
                    </div>
                    <div className="flex flex-col items-center gap-4">
                
                        <p>Don't have an account?</p>
                            <div className="flex items-center gap-4">
                                <Link href='/signup' className="orange_btn">
                                    Register
                                </Link>
                            </div>
                    </div>
                </form>
                
            </section>
            
        ) : (
            <section className='w-full flex items-center flex-col px-20'>

                <h1 className='text-xl font-satoshi'>Register with your email</h1>
                <form className="sm:w-3/12 mt-10 w-full flex flex-col gap-5 glassmorphism font-satoshi ">
                    <div className='flex flex-col'>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input
                            id='email'
                            type="email" 
                            placeholder='example@domain.com'
                            className='form_input'
                            onChange={handleChange}
                            name='email'
                            value={form.email}
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="pass">
                            Password
                        </label>
                        <input
                            id='pass'
                            type="password"
                            className='form_input'
                            onChange={handleChange}
                            name='password'
                            value={form.password}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <button
                            type="submit"
                            className='violet_btn'
                            onClick={signUpEmail}
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p>Already have an account?</p>
                            <div className="flex items-center gap-4">
                                <Link href='/api/auth/signin' className="orange_btn">
                                    Sign in
                                </Link>   
                            </div>
                    </div>
                </form>

            </section>
        )}
    </div>
  )
}

export default LogForm