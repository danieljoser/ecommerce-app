export type CartProduct = {
    _id: string
    userId: string
    items: Items
};

type Items = {
    id: string,
    name: string,
    price: number,
    quantity: number
    image: string
}

export type CartData = {
    data: CartProduct[],
    handleDelete: (arg0: any) => Promise<void>
}