import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Token from "@/models/token";


export const GET = async (request: Request, { params }: any) => {
    try {
        await connectToDB();

        const token = await Token.findOne({where: {
            token: params.token
        }});

        const newUser = await User.findOne({where: {
            email: token.email
        }});

        if (!newUser) {
            return new Response('User not found', {status: 404});
        }
        return new Response(JSON.stringify(newUser), {status: 200});

    } catch (error) {
        return new Response('Failed to fetch user', {status: 500});
    }
};

export const PATCH = async (request: Request, params: any) => {
    const {username } = await request.json();

    try {
        await connectToDB();

        const existingToken = await Token.findOne({where: {
            token: params.token
        }});

        const existingUser = await User.findOne({where: {
            token: existingToken
        }});

        existingUser.username = username
        existingUser.verified = true

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), {status:200})

    } catch (error) {
        return new Response('Failed to verify user', {status: 500})
    }
}