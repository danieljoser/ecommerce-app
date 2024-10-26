'use server'

import { connectToDB } from "@/utils/database";
import Token from "@/models/token";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        
        await connectToDB();
        const verificationToken = await Token.findOne({
            where: {
                email: email
            }
        })
        
        return verificationToken;

    } catch (error) {
        console.log(error);
        
    }
}