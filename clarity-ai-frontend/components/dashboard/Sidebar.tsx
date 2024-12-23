import React from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	useDisclosure,
	Button,
	Link,
	Tooltip,
} from "@nextui-org/react";
import {
	AvatarIcon,
	ExitIcon,
	FileIcon,
	GroupIcon,
} from "@radix-ui/react-icons";
import {
	IconChartLine,
	IconCurrencyDollar,
	IconGalaxy,
	IconLogicNor,
} from "@tabler/icons-react";

type Props = {};

const Sidebar = (props: Props) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [size, setSize] = React.useState("md");

	return (
		<div className="flex flex-col h-screen p-5 border border-r-1 border-neutral-200">
			<div className="flex gap-2 items-center my-3">
				<IconGalaxy />
				<h1 className="text-xl font-semibold">Clarity AI</h1>
			</div>
			<hr className="border border-neutral-200 my-6" />
			<div>
				<div className="my-3">
					<h3 className="text-neutral-700 text-sm px-2">Main Menu</h3>
				</div>

				<hr />

				<div className="flex flex-col w-full">
					<Link
						href={"/#"}
						className="flex gap-2 items-center my-3 hover:bg-neutral-200 py-3 px-2 w-full rounded-lg text-neutral-900 font-semibold text-lg whitespace-nowrap"
					>
						<IconChartLine size={15} className="" />
						<h4 className="">Overview</h4>
					</Link>
					<hr />
					<Link
						href={"/dashboard/files"}
						className="flex gap-2 items-center my-3 hover:bg-neutral-200 py-3 px-2 w-full rounded-lg text-neutral-900 font-semibold text-lg whitespace-nowrap"
					>
						<FileIcon className="" />
						<h4 className="">Manage files</h4>
					</Link>
					<hr />
					<Link
						href={"/dashboard/team"}
						className="flex gap-2 items-center my-3 hover:bg-neutral-200 py-3 px-2 w-full rounded-lg text-neutral-900 font-semibold text-lg whitespace-nowrap"
					>
						<IconCurrencyDollar className="" />
						<h4 className="w-full">Manage Subscription</h4>
					</Link>
					<hr />
					<Link
						href={"/dashboard/team"}
						className="flex gap-2 items-center my-3 hover:bg-neutral-200 py-3 px-2 w-full rounded-lg text-neutral-900 font-semibold text-lg whitespace-nowrap"
					>
						<GroupIcon className="" />
						<h4 className="">Team</h4>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
