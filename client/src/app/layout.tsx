import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ReactQueryProvider } from "./providers/reactQuery";

const satoshiFont = localFont({
  src: "/fonts/Satoshi-Variable.woff2",
});

export const metadata: Metadata = {
  title: "NoteMark",
  description: "A Personal Notes App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshiFont.className} antialiased h-full`}>
        <ReactQueryProvider> {children}</ReactQueryProvider>
      </body>
    </html>
  );
}
