import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Money for Life - Compound Interest Calculator",
  description:
    "Discover the power of compound interest. Calculate your net income after taxes and see how consistent investing can transform your financial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
