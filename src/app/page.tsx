import ProductList from "@/components/ProductList";
import { getProducts } from "@/server/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

export default async function Home() {
  const queryClient = new QueryClient();

  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <main>
      {/* 
        HydrationBoundary adds a previously dehydrated state into the queryClient 
        that would be returned by useQueryClient(). If the client already contains data, 
        the new queries will be intelligently merged based on update timestamp.
      */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </main>
  );
}
