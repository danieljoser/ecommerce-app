import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async(request: Request) => {
    const { email: userEmail } = await request.json();
    
    

    try {

        await connectToDB();
        
        
        const userExists = await User.findOne({email: userEmail})

        if (!userExists) {
            return new Response('The email you submitted is not registered in this page', {status: 404});
        }
        
        
        return new Response(JSON.stringify(userExists));
    } catch (error) {
        return new Response('Failed to fetch user', {status: 500})
    }
}