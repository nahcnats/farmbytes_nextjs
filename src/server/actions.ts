import { server } from '@/lib/utils';
import { TProduct } from '@/models/Product';
import { TAddProductProps } from '@/types/addProductProps';

export const getProducts = async () => {
    try {
        const response = await server.get(`/products`);

        const products = await response.data;

        return products;
    } catch (error: any) {
        throw error?.message;
    }
}

export const getProduct = async (id: string) => {
    try {
        const response = await server.get(`/products`);

        const products = await response.data;
        const product = products.find((product: TProduct) => product.id === id);

        return product;
    } catch (error: any) {
        throw error?.message;
    }
}

export const addProduct = async (data: TAddProductProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                price: data.price,
                image: data.thumbnail,
            })
        });

        const status = await response.json();

        return status;
    } catch (error: any) {
        throw error?.message;
    }
}