import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katalysa Parent Portal | School Management System",
  description: "Modern, secure parent portal for managing student academics, fees, and school communications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

