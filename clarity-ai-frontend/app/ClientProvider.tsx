// app/ClientProvider.tsx
"use client";

import { ThemeProviders } from "@/components/theme-provider";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";

const convex = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL! as string
);

export default function ClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProviders>
			<ConvexAuthNextjsProvider client={convex}>
				{children}
			</ConvexAuthNextjsProvider>
		</ThemeProviders>
	);
}
