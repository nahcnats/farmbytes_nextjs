'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductItem from '@/components/ProductItem';

export default function ProductPage({params} : {params: {id: number}}) {
    const { id } = params;

    return (
        <div className='space-y-8'>
            <Link href="/">
                back to Home
            </Link>

            <div className='flex flex-1 justify-center'>
                <ProductItem id={`${id}`} />
            </div>

            
        </div>
    );
}
