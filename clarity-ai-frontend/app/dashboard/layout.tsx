"use client";

import React from "react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

type Props = {
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const router = useRouter();

	if (isAuthenticated === false) {
		router.push("/sign-in");
	}

	return (
		<div className="">
			<div className="flex h-screen justify-between">
				<div className="">
					<Sidebar />
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
