import React from "react";

type Props = {
	email: string;
	token: string;
};

const PasswordResetEmailTemplate = (props: Props) => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl">Hello, {props.email}!</h1>

			<p>
				We hear you forgot your password. Use the token below to reset
				it:
			</p>
			<span className="text-center border border-neutral-200 border-dashed px-4 py-2">
				{props.token}
			</span>
		</div>
	);
};

export default PasswordResetEmailTemplate;
