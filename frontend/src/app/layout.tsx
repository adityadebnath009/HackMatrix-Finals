import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEGISX — Autonomous Closed-Loop AI Safety & Defense Shield",
  description:
    "Autonomous red-teaming, deterministic Pydantic validation boundaries, and cryptographic proof for enterprise AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[#051424] text-[#d4e4fa]">
        {children}
      </body>
    </html>
  );
}
