import type { Metadata } from "next";
import "./globals.css";
// import ClientProvider from "./ClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "./ConvexClientProvider";

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
    // <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className="overflow-x-hidden">
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    // </ConvexAuthNextjsServerProvider>
  );
}