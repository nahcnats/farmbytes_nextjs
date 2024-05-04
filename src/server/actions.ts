import { server } from '@/lib/utils';
import { TAddProductProps } from '@/types/addProductProps';

export const getProducts = async () => {
    try {
        const response = await server.get(`/products/?categoryId=18`);

        const products = response.data;

        return products;
    } catch (error: any) {
        throw error?.message;
    }
}

export const getProduct = async (id: number) => {
    try {
        const response = await server.get(`/products/${id}`);

        const product = response.data;

        return product;
    } catch (error: any) {
        throw error?.message;
    }
}

export const addProduct = async (data: TAddProductProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                categoryId: 18
            })
        });

        const status = await response.json();

        console.log('status', status)

        return status;
    } catch (error: any) {
        throw error?.message;
    }
}