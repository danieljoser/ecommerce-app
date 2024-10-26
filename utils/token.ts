'use server'

import {v4 as uuidv4} from 'uuid';
import { getVerificationTokenByEmail } from '@/app/data/verification-token';
import { connectToDB } from './database';
import Token from '@/models/token';

export const generateVerificationToken = async (email: string) => {
    // generate a random token
    const token = uuidv4();
    console.log(token);
    
    const expires = new Date().getTime() + (1000 * 60 * 60 * 24) // 24 hours in milisecs
    console.log(expires);
    

     // Check if a token already exists for a user
    const verifiedToken = await getVerificationTokenByEmail(email);

    

    if (verifiedToken) {
        await connectToDB();
        try {
            await Token.findByIdAndDelete(verifiedToken._id);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    // create a new verification token
    await connectToDB();
    const verificationToken = await Token.create({
            email: email,
            token: token,
            expires: new Date(expires)
    });

    return JSON.stringify(verificationToken.token); 
};