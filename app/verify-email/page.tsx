'use client'

import { useEffect, useState } from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'

const EmailVerification = (): React.JSX.Element => {

  const router = useRouter();
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    verified: false
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/update-user/${token}`);
      const data = await response.json();

      setUpdatedUser({
        username: data.username,
        verified: data.verified
      })
    }
    if (token) getUserDetails();
  }, [token])

  const updateUsername = async (e: Event) => {
    e.preventDefault();
    if (!token) alert('Verification token not found!');

    try {
      const response = await fetch(`/api/update-user/${token}`, {
        method: 'PATCH',
        body: JSON.stringify({
          username: updatedUser.username,
          verified: true
        })
      });
      if (response.ok) {
        alert('The user has been created, please log in with your new account')
        router.push('/');
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
        <ProfileForm 
          updatedUser = {updatedUser}
          setUpdatedUser = {setUpdatedUser}
          handleSubmit = {updateUsername}
          
        />
    </div>
  )
}

export default EmailVerification