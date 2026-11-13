import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackMatrix | Editorial Anti-Slop Platform",
  description: "Next-generation platform for HackMatrix Finals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
