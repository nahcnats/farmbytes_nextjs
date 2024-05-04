import { TProduct } from "@/models/Product";
import { getProducts } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery<TProduct[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchOnWindowFocus: "always",
    });
}