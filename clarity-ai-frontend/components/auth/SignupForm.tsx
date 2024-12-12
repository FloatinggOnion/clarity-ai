"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type Props = {};

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(50, {
			message: "Password must not be longer than 50 characters",
		}),
	teamName: z.string(),
});

const SignupForm = (props: Props) => {
	const signupForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			teamName: "",
		},
	});

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        
    }

	return(
        <div>

        </div>
    );
};

export default SignupForm;
