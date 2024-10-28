'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./ProductList";


const Filter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    let category = searchParams.get('category');
  
    if (category) {
      category = category.replace('-', " ");
    }

    const [products, setProducts] = useState([]);

    
    
    

    const [formData, setFormData] = useState({
        priceFilter: 'all',
        ratingFilter: 'all',
        reviewFilter: 'all'
    });

    const handleChange = (event: any) => {
        const {name, value} = (event.target as HTMLInputElement);

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    };

    const getProducts = async () => {
        const response = await fetch(`/api/product/${category}?price=${formData.priceFilter}&rating=${formData.ratingFilter}&review=${formData.reviewFilter}`, {method: 'GET'});
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        
        
        router.push(`/products?category=${category}&price=${formData.priceFilter}&rating=${formData.ratingFilter}&review=${formData.reviewFilter}`)
        getProducts();
    }, [formData, category])
    


  return (
    <div className='feed w-full flex sm:flex-row items-center h-full px-20 mt-20 flex-col'>
        <form className='flex sm:flex-col gap-24 bg-slate-100 px-6 py-10 rounded-md shadow-2xl border-slate-900 flex-row'>
            <fieldset className='font-satoshi'>
                <legend className='font-bold font-inter mb-4'>Filter by Price</legend>

                <input type='radio' id='all-prices' name='priceFilter' value='all'
                    checked={formData.priceFilter === 'all'} onChange={handleChange}    
                />
                <label htmlFor='all-prices'>All</label>
                <br />

                <input type='radio' id='less-ten' name='priceFilter' value='lessThanTen'
                    checked={formData.priceFilter === 'lessThanTen'} onChange={handleChange}
                />
                <label htmlFor='less-ten'>Less than 10$</label>
                <br />

                <input type='radio' id='between-ten' name='priceFilter' value='betweenTen'
                    checked={formData.priceFilter === 'betweenTen'} onChange={handleChange}
                />
                <label htmlFor='between-ten'>Between 10$-30$</label>
                <br />

                <input type='radio' id='more-thirty' name='priceFilter' value='moreThanThirty'
                    checked={formData.priceFilter === 'moreThanThirty'} onChange={handleChange}
                />
                <label htmlFor="more-thirty">More than 30$</label>
            </fieldset>

            <fieldset>
                <legend className='font-bold font-inter mb-4'>Filter by Rating</legend>

                <input type='radio' id='all-rating' name='ratingFilter' value='all'
                    checked={formData.ratingFilter === 'all'} onChange={handleChange}
                />
                <label htmlFor='all-rating'>All</label>
                <br />

                <input type='radio' id='five-stars' name='ratingFilter' value='fiveStars'
                    checked={formData.ratingFilter === 'fiveStars'} onChange={handleChange}
                />
                <label htmlFor='five-stars'>Between 4 and 5 stars</label>
                <br />

                <input type='radio' id='between-three' name='ratingFilter' value='fourStars'
                    checked={formData.ratingFilter === 'fourStars'} onChange={handleChange}
                />
                <label htmlFor='between-three'>Between 3 and 4 stars</label>
                <br />

                <input type='radio' id='less-three' name='ratingFilter' value='threeStars'
                    checked={formData.ratingFilter === 'threeStars'} onChange={handleChange}
                />
                <label htmlFor="less-three">Less than 3 stars</label>
            </fieldset>

            <fieldset>
                <legend className='font-bold font-inter mb-4'>Filter by Number of Reviews</legend>

                <input type='radio' id='all-reviews' name='reviewFilter' value='all'
                    checked={formData.reviewFilter === 'all'} onChange={handleChange}
                />
                <label htmlFor='all-reviews'>All</label>
                <br />

                <input type='radio' id='more-three' name='reviewFilter' value='moreThanThree'
                    checked={formData.reviewFilter === 'moreThanThree'} onChange={handleChange}
                />
                <label htmlFor='more-three'>More than 300 reviews</label>
                <br />

                <input type='radio' id='between-one' name='reviewFilter' value='moreThanOne'
                    checked={formData.reviewFilter === 'moreThanOne'} onChange={handleChange}
                />
                <label htmlFor='between-one'>Between 100 and 299 reviews</label>
                <br />

                <input type='radio' id='less-one' name='reviewFilter' value='lessThanOne'
                    checked={formData.reviewFilter === 'lessThanOne'} onChange={handleChange}
                />
                <label htmlFor="less-one">Less than 100 reviews</label>
            </fieldset>
        </form>

        <ProductList 
            data={products}
        /> 

    </div>
  )
}

export default Filter