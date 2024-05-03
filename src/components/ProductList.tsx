'use client'

import React from 'react';
import { getProducts } from '@/server/actions';
import { useQuery } from '@tanstack/react-query';
import { toast } from './ui/use-toast';
import { TProduct } from '@/models/Product';
import Loading from './Loading';

export default function ProductList() {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<TProduct[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchOnWindowFocus: "always",
    });

    if (isError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
        });
    }

    if (isLoading || !data) return <Loading />;
    
    return (
        <div>ProductList</div>
    );
};
