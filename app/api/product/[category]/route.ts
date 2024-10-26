import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

export const GET = async (request: Request, {params}: any) => {

    const url = new URL(request.url)
    const price = url.searchParams.get('price');
    const rating = url.searchParams.get('rating');
    const review = url.searchParams.get('review');

    let priceQuery;
    if (price === 'lessThanTen') {
        priceQuery = {$lt: 10};
    } else if (price === 'betweenTen') {
        priceQuery = {$gte: 10, $lt: 30};
    } else if (price === 'moreThanThirty') {
        priceQuery = {$gte: 30};
    } else {
        priceQuery = false;
    }

    let ratingQuery;
    if (rating === 'fiveStars') {
        ratingQuery = {$gte: 4, $lte: 5};
    } else if (rating === 'fourStars') {
        ratingQuery = {$gte: 3, $lt: 4};
    } else if (rating === 'threeStars') {
        ratingQuery = {$lt: 3};
    } else {
        ratingQuery = false;
    }

    let reviewQuery;
    if (review === 'moreThanThree') {
        reviewQuery = {$gte: 300};
    } else if (review === 'moreThanOne') {
        reviewQuery = {$gte: 100, $lt: 300};
    } else if (review === 'lessThanOne') {
        reviewQuery = {$lt: 100};
    } else {
        reviewQuery = false;
    }
    
    try {
        await connectToDB();
        
        let categoryProducts
        
        // All queries
        if (priceQuery && ratingQuery && reviewQuery) {
            categoryProducts = await Product.find({
                category: params.category,
                price: priceQuery,
                rating_value: ratingQuery,
                rating_count: reviewQuery
            });
        
        // Searching for price and rating
        } else if (priceQuery && ratingQuery) {
            categoryProducts = await Product.find({
                category: params.category,
                price: priceQuery,
                rating_value: ratingQuery,
            });
        // Searching for price and numbers of reviews
        } else if (priceQuery && reviewQuery){
            categoryProducts = await Product.find({
                category: params.category,
                price: priceQuery,
                rating_count: reviewQuery
            });
        // Searching for value of review and numbers of reviews
        } else if (ratingQuery && reviewQuery){
            categoryProducts = await Product.find({
                category: params.category,
                rating_value: ratingQuery,
                rating_count: reviewQuery
            });
        // Searching only for price
        } else if (priceQuery){
            categoryProducts = await Product.find({
                category: params.category,
                price: priceQuery
            });
        // Searching only for rating value
        } else if (ratingQuery){
            categoryProducts = await Product.find({
                category: params.category,
                rating_value: ratingQuery
            });
        // Searching only for numbers of reviews
        } else if (reviewQuery){
            categoryProducts = await Product.find({
                category: params.category,
                rating_count: reviewQuery
            });
        // ALL PRODUCTS
        } else {
            categoryProducts = await Product.find({
                category: params.category,
            });
        }

        if (!categoryProducts) {
            return new Response('Category not found', {status: 404});
        }

        return new Response(JSON.stringify(categoryProducts), {status: 200});

    } catch (error) {
        return new Response('Failed to fetch category', {status: 500});
    }
};
