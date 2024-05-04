'use client'

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from './SaveButton';
import { useAddProduct } from '@/hooks/useAddProduct';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    thumbnail: z.string().min(2, {
        message: "Thumpbnail must be at least 2 characters.",
    }),
});

export default function AddProductForm() {
    const { mutateAsync } = useAddProduct();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            thumbnail: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await mutateAsync({
                title: values.title,
                description: values.description,
                price: values.price,
                thumbnail: values.thumbnail,
            });

            router.push('/');
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: err.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (RM)</FormLabel>
                            <FormControl>
                                <Input 
                                    type='number   '
                                    {...field}
                                    onChange={event => field.onChange(+event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Image URL"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-center items-center'>
                    <SaveButton
                        isSubmitting={form.formState.isSubmitting}
                        onCancel={() => {
                            form.reset()
                        }}
                    />
                </div>
            </form>
        </Form>
    );
}
