import { CartProduct } from "@/type/types"
import Image from "next/image"
import { CartData } from "@/type/types"

const CartList = ({data, handleDelete}: CartData) => {

  

  return (
    <div className="flex flex-col ">
            
      {data.map((product: CartProduct) => (             
        <div className="grid grid-cols-5 gap-4 text-left ml-2 mb-12">
          <div className="flex gap-6 items-center col-span-2">
              <Image 
                src={product.items.image}
                width={150}
                height={100}
                alt="product-image"
                className="object-contain h-[250px] w-[250px]"
              />
              <div className="flex flex-col justify-between px-4">
                <p className="sm:flex hidden text-slate-500 text-sm font-inter mb-4">Order Id: {product._id}</p>
                <p className="sm:flex hidden">{product.items.name}</p>
              </div>
          </div>
          <p className="font-satoshi text-lg">{product.items.price}$</p>
          <p className="font-satoshi text-lg">{product.items.quantity}</p>
          <p className="font-satoshi text-lg text-slate-700">{product.items.price * product.items.quantity}$</p>
          <button className="mt-6 rounded-lg bg-transparent border border-red-500 text-red-500
          hover:bg-red-500 hover:text-white py-1 px-2 sm:w-1/2 w-full" onClick={() => handleDelete && handleDelete(product)}>Delete Order</button>
        
        </div>
      ))}  

    </div> 
  )
}

export default CartList