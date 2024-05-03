import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header>
            <nav className='flex flex-row justify-between items-center p-4 text-white bg-green-600'>
                <div>
                    <h1 className='text-lg'>Farmbytes Assessment</h1>
                </div>
                <div className='flex flex-row gap-8 text-base'>
                    <Link href="/">Home</Link>
                    <Link href="/">Add Product</Link>
                </div>
            </nav>
        </header>
    );
};
