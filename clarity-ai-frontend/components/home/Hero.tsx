"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";
import { Spotlight } from "../ui/spotlight";
import { Vortex } from "../ui/vortex";
import { useTheme } from "next-themes";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {

    const handleClick = () => {
        window.scrollTo({ top: window.innerHeight - 10, behavior: "smooth" });
    }

	return (
		<div className="h-[90vh] flex flex-col justify-evenly">
			<Vortex
				backgroundColor={"black"}
				rangeY={300}
				particleCount={100}
				baseHue={120}
				className="flex flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
			>
				<div>
					<Link href={"/"} className="text-xl font-bold underline-offset-2 decoration-green-500 flex">
						Clarity<p className="text-green-500 no-underline">AI</p>
					</Link>
				</div>
				<div
					className={`text-3xl lg:text-5xl h-full mx-auto flex flex-col justify-center space-y-6`}
				>
					<h1 className="text-center uppercase">
						Your Business. Your Knowledge.
					</h1>
					<p className="text-green-500 text-center lg:text-end uppercase">
						In a CHATBOT.
					</p>
				</div>

				<div className="flex flex-col justify-center items-center space-y-8">
					<div
						className={`text-center text-neutral-900 dark:text-neutral-400`}
					>
						<p>
							Simplify your customer support process with
							automation.
						</p>
						<p>
							Enjoy a smoother and more efficient way to manage
							tickets.
						</p>
					</div>
					<Button
						borderRadius="1.75rem"
						className="bg-slate-900 text-green-500 border-slate-800"
                        onClick={handleClick}
					>
						Learn More
					</Button>
				</div>
			</Vortex>
		</div>
	);
};

export default Hero;
