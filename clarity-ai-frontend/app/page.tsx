import Image from "next/image";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Contact from "@/components/home/Contact";

export default function Home() {
	const navItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Features",
			link: "#features",
		},
		{
			name: "Contact",
			link: "#contact",
		},
	];

	return (
		<div className="w-full min-h-screen text-white px-10 justify-between">
			<FloatingNav navItems={navItems} />
			<Hero />
			<Features />
			<Contact />
		</div>
	);
}
