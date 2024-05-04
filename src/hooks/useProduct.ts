import { TProduct } from "@/models/Product";
import { getProduct } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number) => {
    return useQuery<TProduct[], Error>({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        refetchOnWindowFocus: "always",
    });
}