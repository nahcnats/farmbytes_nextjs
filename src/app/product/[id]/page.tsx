'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage({params} : {params: {id: number}}) {
    const { id } = params;

    return (
        <div>{id}</div>
    );
}
