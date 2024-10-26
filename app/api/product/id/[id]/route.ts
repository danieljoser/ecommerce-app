import { connectToDB } from "@/utils/database"
import Product from "@/models/product"

export const GET = async (request: Request, {params}: any) => {
    try {
        await connectToDB();

        const product = await Product.findOne({
            id: params.id
        });

        if (!product) {
            return new Response('Product not found', {status: 404});
        }

        return new Response(JSON.stringify(product), {status: 200});

    } catch (error) {
        return new Response('Failed to fetch product', {status: 500})
        
    }
}