import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppSidebar from "@/components/sidebar-components/AppSidebar";
import Link from "next/link";
import IconsBar from "@/components/fav-basket/icons-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookStore",
  description: "BookStore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b-sidebar-ring flex py-4 px-5 justify-between fixed w-full z-50 top-0 left-0 bg-background">
            <div className="flex gap-5">
              <AppSidebar />
              <h1 className="font-bold text-2xl">
                <Link href="/">BookStore</Link>
              </h1>
            </div>
            <div className="flex gap-5">
              <IconsBar />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
