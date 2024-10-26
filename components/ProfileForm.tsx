import React, { Dispatch, SetStateAction } from 'react'

type UpdatedUser = {
  username: string
  verified: boolean
}

type ProfileForm = {
  updatedUser: UpdatedUser
  setUpdatedUser: Dispatch<SetStateAction<UpdatedUser>>
  handleSubmit: (arg0: any) => Promise<void>
}

const ProfileForm = ({updatedUser, setUpdatedUser, handleSubmit}: ProfileForm) => {
  
  return (
    <div className='flex place-content-center'>
        <form 
        onSubmit={handleSubmit}
        className="sm:w-3/12 mt-10 w-full flex flex-col gap-5 glassmorphism font-satoshi ">
            <label htmlFor='firstName'>
              First Name
            </label>
            <input id='firstName' type='text' className='form-input' required/>
            <label htmlFor='lastName'>
              Last Name
            </label>
            <input id='lastName' type='text' className='form-input' required/>
            <label htmlFor='username'>
              Username
            </label>
            <input id='username' type='text' className='form-input' value={updatedUser.username}
              onChange={(e) => setUpdatedUser({
                ...updatedUser, username: (e.target.value)
              })}
            />
            <button
              type='submit'
              className='violet_btn'
            >
              Save info
            </button>
        </form>

    </div>
  )
}

export default ProfileForm