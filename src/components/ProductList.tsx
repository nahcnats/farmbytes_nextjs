'use client'

import React from 'react';
import { getProducts } from '@/server/actions';
import { useQuery } from '@tanstack/react-query';
import { toast } from './ui/use-toast';
import { TProduct } from '@/models/Product';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';

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
        <div>ProductList</div>
    );
};
