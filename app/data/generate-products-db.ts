import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

type Rating = {
    rate: number
    count: number
}

export type ProductType = {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating

}

export const getProductsDB = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {method: 'GET'})
        const data = await response.json();
        console.log(data);

        await connectToDB();

        data.map((product: ProductType) => {
            
            
            Product.create({
                id: String(product.id),
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating_value: product.rating.rate,
                rating_count: product.rating.count

            })
        })
        
    } catch (error) {
        console.log(error);
        
    }
}