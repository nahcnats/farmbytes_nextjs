type TCategory = {
    id: number,
    name: string,
    image: string
}
export type TProduct = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: TCategory,
    images: string[]
}