'use client'

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQueryClient } from '@tanstack/react-query';
import { SaveButton } from './SaveButton';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    price: z.number(),
    thumbnail: z.string().min(2, {
        message: "Thumpbnail must be at least 2 characters.",
    }),
});

export default function AddProductForm() {
    const queryClient = useQueryClient();
    const [toggleSave, setToggleSave] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            thumbnail: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                                    readOnly={!toggleSave}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SaveButton
                    toggleSave={toggleSave}
                    isSubmitting={form.formState.isSubmitting}
                    onCancel={() => {
                        form.reset()
                        setToggleSave(v => !v)
                    }}
                />
            </form>
        </Form>
    );
}
