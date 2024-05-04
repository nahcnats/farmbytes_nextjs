'use client'

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProduct } from '@/hooks/useProduct';
import { cn } from '@/lib/utils';
import { toast } from './ui/use-toast';
import Loading from './Loading';

interface BlurImageProps {
    id: number,
    title: string,
    thumbnail: string
}

export default function ProductItem({id} : {id: number}) {
    const {
        isLoading,
        isError,
        error,
        data
    } = useProduct(id);
    const [isImageLoading, setisImageLoading] = useState(true);
    
    const BlurImage = useCallback(
        ({ thumbnail, title, id }: BlurImageProps) => {
            return (
                <Link href={`/product/${id}`}>
                    <Image
                        src={thumbnail}
                        alt={title}
                        objectFit='cover'
                        width={500}
                        height={500}
                        className={cn(
                            "duration-700 ease-in-out group-hover:opacity-75",
                            isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                        )}
                    onLoadingComplete={() => setisImageLoading(false)}
                    />
                </Link>
            );
        },
        [isImageLoading]
    );

    if (isError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
        });
    }

    if (isLoading || !data) return <Loading />;
    
    return (
        <div className="card">
            <div className="h-auto w-auto mb-4">
                <BlurImage
                    thumbnail={data?.thumbnail}
                    title={data?.title}
                    id={data?.id}
                />
            </div>
            
            <div className="flex flex-col items-center justify-end p-5 space-y-4">
                <Link href="`/product/${data?.id}`">
                    <h3 className="font-semibold line-clamp-2" >{data?.title}</h3>
                </Link>
                <p className='line-clamp-1 text-sm'>{data?.description}</p>
                <p className="mb-2">RM {data?.price}</p>
            </div>
        </div>
    );
}
