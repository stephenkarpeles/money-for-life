import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Money for Life - Compound Interest Calculator",
  description:
    "Hey kids, let's learn about compound interest! Just remember: saving and investing is boring now, but SUPER FUN later! 6-7!",
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
