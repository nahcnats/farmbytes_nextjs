'use client'

import React from 'react';
import { getProducts } from '@/server/actions';
import { useQuery } from '@tanstack/react-query';
import { toast } from './ui/use-toast';
import { TProduct } from '@/models/Product';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';
import ProductItem from './ProductItem';

export default function ProductList() {
    const {
        isLoading,
        isError,
        error,
        data
    } = useProducts();

    if (isError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
        });
    }

    if (isLoading || !data) return <Loading />;
    
    return (
        // <div className='flex flex-row flex-wrap gap-8 items-start'>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            { 
                data.map((product, index) => (
                    <ProductItem key={`${product.id}`} id={product.id} />
                ))
            }
        </div>
    );
};
