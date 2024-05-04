import { addProduct } from '@/server/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type TAddProductProps = {
    title: string,
    description: string,
    price: number,
    thumbnail: string
}

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TAddProductProps) => addProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        },
        onError: (error: any) => {
            throw error;
        }
    });
}