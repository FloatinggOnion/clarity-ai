import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { fira_code } from "@/lib/font";
import "./globals.css";


export const metadata: Metadata = {
	title: "Clarity AI",
	description: "Your Business. Your Knowledge. In a Chatbot",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fira_code.className} overflow-x-hidden`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
