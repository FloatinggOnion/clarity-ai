"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

const SignInForm = (props: Props) => {
	const [action, setAction] = useState<string>("");
	const { signIn } = useAuthActions();
	const [step, setStep] = useState<"signUp" | "signIn">("signIn");

	const { toast } = useToast();
	const router = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const flow = data.get("flow") as string;

        const signInData = {
            email,
            password,
            flow,
        };

        console.log(signInData);

		void signIn("password", signInData).then(() => {
			toast({
				title:
					step === "signUp"
						? "Sign up successful"
						: "Sign in successful",
				description: `You have successfully signed ${step === "signUp" ? "up" : "in"}`,
				duration: 5000,
			});
			router.push("/dashboard");
		});
		// router.push("/dashboard");
	};

	const toggleStep = () => setStep(step === "signIn" ? "signUp" : "signIn");

	return (
		<Form
			className="w-full lg:w-[35vw] flex flex-col items-center gap-4 shadow-xl px-5 py-7 rounded-lg space-y-6 border border-neutral-200"
			validationBehavior="native"
			onReset={() => setAction("reset")}
			onSubmit={handleSubmit}
		>
			<div className="text-center">
				<h4 className="text-xl font-semibold">
					{step === "signIn" ? "Sign In" : "Sign Up"}
				</h4>
				<p>{step === "signIn" ? "to Clarity AI" : "for an account"}</p>
			</div>
			<div className="w-full flex flex-col gap-6">
				<Input
					isRequired
					errorMessage="Please enter a valid email"
					label="Email"
					labelPlacement="outside"
					name="email"
					placeholder="Enter your email"
					type="email"
				/>
				<Input name="flow" type="hidden" value={step} />
				<div className="flex flex-col w-full gap-2">
					<Input
						isRequired
						label="Password"
						labelPlacement="outside"
						name="password"
						placeholder="Enter your password"
						type="password"
					/>
					{step === "signIn" && (
						<Link
							href={"/password-reset"}
							className="text-end text-sm underline underline-offset-2"
						>
							Forgot password
						</Link>
					)}
				</div>
			</div>

			<Button type="submit" className="w-full bg-neutral-800 text-white">
				<p className="font-semibold">
					{step === "signIn" ? "Sign in" : "Sign up"}
				</p>
			</Button>

			<span className="flex gap-1" onClick={toggleStep}>
				{step === "signIn" ? (
					<span className="flex gap-1 items-end">
						Don&apos;t have an account?{" "}
						<p className="underline underline-offset-2 cursor-pointer">
							Sign up
						</p>
					</span>
				) : (
					<span className="flex gap-1 items-end">
						Already have an account?{" "}
						<p className="underline underline-offset-2 cursor-pointer">
							Sign in
						</p>
					</span>
				)}
			</span>
		</Form>
	);
};

export default SignInForm;
