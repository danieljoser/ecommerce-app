import Image from "next/image"
import Router, { useRouter } from "next/navigation"
type ProductCard = {
    _id: string
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating_value: number
    rating_count: number
    __v: string
}

type Product = {
    product: ProductCard
}

const ProductCard = ({product}: Product) => {

    const router = useRouter();

    function handleClick() {
        router.push(`/products/id/?id=${product.id}`)
    }

  return (
    
    <div className="product_card mt-10 cursor-pointer" onClick={handleClick} >
        
        <div className="flex justify-center mr-5 bg-slate-50 rounded-md">
            <Image 
                src={product.image}
                alt="product-image"
                width={150}
                height={100}
                className="object-contain h-[150px] w-[150px]"
        
            />
        </div>
    
        <div className="flex flex-col mt-4 text-sm font-satoshi gap-5 ">
            <p className="font-bold">{product.title}</p>
            <p className="text-green-600 font-bold">{`${product.price}$`}</p>
            <div className="flex align-middle">
                <p className="font-bold">{product.rating_value} </p>
                <Image src={'/assets/images/star.jpg'} alt="star-img" height={20} width={20}/>
                <p className="ml-1">({product.rating_count})</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard