'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProductList from "@/components/ProductList"
import Filter from "@/components/Filter"

const Category = () => {


  
  return (
    <section className="feed w-full flex sm:flex-row items-center h-full px-20 mt-20 flex-col">
      <Filter />
      
    </section>
  )
}

export default Category