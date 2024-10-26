import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async(request: Request) => {
    const {email: userEmail, password: userPass} = await request.json();

    try {
        await connectToDB();
        // check if the user already exists
        const userExists = await User.findOne({email: userEmail});

        

        if (userExists) {
            return new Response('The email you submitted is already registered in this page, try to log in', {status: 404});
        } else {
            const newUser = new User({email: userEmail, password: userPass, username:'userPlaceholder', verified: false})
            console.log(newUser);
            await newUser.save();
            

            return new Response('Succesfully stored the user', {status: 201});
        }
    } catch (error) {
        return new Response('Failed to fetch user', {status: 500})
    }
}