import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vikas Morabagi | Data Analyst",
  description: "Portfolio of Vikas Morabagi - Data Analyst, SQL, Python, Power BI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-200 antialiased overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}