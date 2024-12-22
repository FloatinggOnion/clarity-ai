"use client";

import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Form, Input, InputOtp } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {};

const PasswordResetForm = (props: Props) => {
	const { signIn } = useAuthActions();
	const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
	const [otp, setOtp] = useState("");

	const router = useRouter();

	const handleInitialSubmit = (e: any) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		void signIn("password", data).then(() =>
			setStep({ email: data.get("email") as string })
		);
	};

	const handleNewPasswordSubmit = (e: any) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		void signIn("password", data);
	};

	return step === "forgot" ? (
		<Form
			className="w-full lg:w-[35vw] flex flex-col items-center gap-4 shadow-xl px-5 py-7 rounded-lg space-y-6 border border-neutral-200"
			onSubmit={handleInitialSubmit}
		>
			<div className="text-center">
				<h1 className="text-xl font-semibold">Reset your password</h1>
			</div>
			<Input
				isRequired
				errorMessage="Please enter a valid email"
				label="Email"
				labelPlacement="outside"
				name="email"
				placeholder="Enter your email"
				type="email"
			/>

			<Input name="flow" type="hidden" value="reset" />

			<div className="flex justify-between gap-4 w-full">
				<Button
					type="submit"
					className="w-full bg-neutral-800 text-white"
				>
					Send code
				</Button>

				<Button
					type="button"
					onPress={() => router.push("/sign-in")}
					className="w-full"
				>
					Cancel
				</Button>
			</div>
		</Form>
	) : (
		<Form onSubmit={handleNewPasswordSubmit}>
			<InputOtp
				isRequired
				length={6}
				value={otp}
				onValueChange={setOtp}
				aria-label="OTP input field"
				placeholder="Enter OTP"
				validationBehavior="native"
				size="lg"
				variant="underlined"
				description="Enter the OTP sent to your email."
				errorMessage="Invalid OTP code."
			/>

			<Input
				isRequired
				label="Password"
				labelPlacement="outside"
				placeholder="New password"
				name="newPassword"
				type="password"
			/>

			<Input name="email" value={step.email} type="hidden" />

			<Input name="flow" value="reset-verification" type="hidden" />

			<Button type="submit">Continue</Button>

			<Button type="button" onPress={() => router.push("/sign-in")}>
				Cancel
			</Button>
		</Form>
	);
};

export default PasswordResetForm;
