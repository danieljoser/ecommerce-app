import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";


export const GET = async(request: Request, {params}: any) => {
    try {
        await connectToDB();

        const orderCart = await Cart.find({
            userId: params.userid
        });

        if (!orderCart) {
            return new Response('The user has not sent anything to the cart yet', {status: 404})
        };

        return new Response(JSON.stringify(orderCart), {status: 200})


    } catch (error) {
        return new Response('Failed to fetch the user cart', {status: 500})
    }
}

export const DELETE = async (request: Request, {params}: any) => {
    const url = new URL(request.url)
    const orderId = url.searchParams.get('orderId');
    try {
        await connectToDB();
        await Cart.findByIdAndDelete(orderId);
        
        return new Response('Order deleted succesfully', {status: 200});

    } catch (error) {
        return new Response('There was an error deleting the order, try again later', {status: 500})
    }
}