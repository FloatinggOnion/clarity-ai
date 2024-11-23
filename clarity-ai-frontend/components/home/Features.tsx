"use client";

import React from "react";
import { motion } from "framer-motion";
import FeaturesSectionDemo from "../blocks/features-section-demo-2";

type Props = {};

const Features = (props: Props) => {
	return (
		<section
			id="features"
			className="h-[100vh] flex flex-col items-center py-24"
		>
			<h1 className="flex gap-3 text-xl lg:text-3xl">
				Deploy your Chatbot in{" "}
				<p className="text-green-500 underline underline-offset-4">
					3 simple steps
				</p>
			</h1>

			<div className="flex w-full justify-between text-center my-14">
				<motion.div
					initial={{
						y: 10,
						opacity: 0,
					}}
					whileInView={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						duration: 0.5,
						bounce: 0.5,
					}}
					className="w-1/3 flex flex-col items-center gap-6 mt-10"
				>
					<h3 className="text-white text-3xl font-bold bg-green-500 w-fit px-2.5 rounded-full">1</h3>
					<h4 className="text-xl font-bold text-green-500">Upload</h4>
					<p>Upload your website link, or any document to serve as a knowledge base.</p>
				</motion.div>
				<motion.div
					initial={{
						y: 10,
						opacity: 0,
					}}
					whileInView={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						duration: 0.5,
						delay: 0.5,
						bounce: 0.5,
					}}
					className="w-1/3 flex flex-col items-center gap-6 mt-10"
				>
					<h3 className="text-white text-3xl font-bold bg-green-500 w-fit px-2.5 rounded-full">2</h3>
					<h4 className="text-xl font-bold text-green-500">Train</h4>
					<p>Customize the chatbot to match your brand.</p>
				</motion.div>
				<motion.div
					initial={{
						y: 10,
						opacity: 0,
					}}
					whileInView={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						duration: 0.5,
						delay: 1,
						bounce: 0.5,
					}}
					className="w-1/3 flex flex-col items-center gap-6 mt-10"
				>
					<h3 className="text-white text-3xl font-bold bg-green-500 w-fit px-2.5 rounded-full">3</h3>
					<h4 className="text-xl font-bold text-green-500">Deploy</h4>
					<p>Copy the code snippet and paste it in your website.</p>
				</motion.div>
			</div>

			<div className="my-12">
				<h3 className="text-3xl text-start">Cool features...and more</h3>
				<FeaturesSectionDemo />
			</div>
		</section>
	);
};

export default Features;
