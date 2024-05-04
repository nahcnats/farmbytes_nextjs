import { addProduct } from '@/server/actions';
import { TAddProductProps } from '@/types/addProductProps';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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