import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";

export const POST: (arg0: Request) => Promise<Response> = async (req) => {
    const {userId, image, productId, name, price, quantity} = await req.json();
    
    try {
        await connectToDB();

        const userCart = await Cart.findOne({
            userId: userId,
            'items.id': productId
        });

        if (!userCart) {
            const newUserCart = new Cart({
                userId: userId,
                items: {
                    id: productId,
                    image: image,
                    name: name,
                    price: price,
                    quantity: quantity
                }
            });
            await newUserCart.save();

            return new Response(JSON.stringify(newUserCart), {status: 200});
        };

       
        userCart.items.quantity = userCart.items.quantity + quantity;
        userCart.save();

        return new Response(JSON.stringify(userCart), {status: 200})
       



    } catch (error) {
        return new Response('Could not find your cart at the time', {status: 500})
    }
}