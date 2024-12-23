import React from "react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { IconGalaxy } from "@tabler/icons-react";

type Props = {};

const NewSidebar = (props: Props) => {
	return (
		<Sheet>
			<SheetTrigger className="h-full flex flex-col p-5 border-r border-neutral-200">
				<AlignJustify className="flex focus:ring-0 top-5" />
			</SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[350px]" side={"left"}>
				<SheetHeader>
					<SheetTitle className="text-2xl font-bold flex gap-2 items-center">
						<IconGalaxy />
						<h1>ClarityAI</h1>
					</SheetTitle>
					<hr />
					<SheetDescription>Navigation Menu</SheetDescription>
				</SheetHeader>
				<div className="my-12 flex flex-col gap-2 h-full">
					<Link
						href={"/"}
						className="py-4 px-1 rounded-md hover:bg-neutral-200"
					>
						Home
					</Link>
					<Link
						href={"/generate"}
						className="py-4 px-1 rounded-md hover:bg-neutral-200"
					>
						Generate
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default NewSidebar;
