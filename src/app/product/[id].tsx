'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function Product() {
    const params = useParams();
    const { id } = params;

    return (
        <div>[id]</div>
    );
}
