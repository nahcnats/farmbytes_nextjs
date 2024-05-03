import { TProduct } from "@/models/Product";

export const getGetProducts = async (): Promise<TProduct[] | undefined> => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/products`);

        const products = await response.json();

        return products;
    } catch (error: any) {
        console.log(error?.message);
    }
}

export const getProduct = async (id: number): Promise<TProduct | undefined> => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/products${id}`);

        const product = await response.json();

        return product;
    } catch (error: any) {
        console.log(error?.message);
    }
}

export const addProduct = async (data: TProduct): Promise<string | undefined> => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/products}`, {
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
                images: data.images
            })
        });

        const product = await response.json();

        return product;
    } catch (error: any) {
        console.log(error?.message);
    }
}