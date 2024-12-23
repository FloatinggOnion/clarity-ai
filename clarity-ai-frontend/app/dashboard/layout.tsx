"use client";

import React from "react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import NewSidebar from "@/components/dashboard/NewSidebar";

type Props = {
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	const router = useRouter();

	return (
		<div className="">
			<div className="flex h-screen justify-between">
				<div className="">
					<NewSidebar />
					{/* <Sidebar /> */}
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
