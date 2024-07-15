import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { Toaster } from "sonner";
import TanstackProvider from "@/components/provider/tanstack-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testimonial - Collect in a mintutes",
  description: "Collect testimonials in a minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#151719]`}>
        <Navbar />
        <Toaster position="top-right" richColors />
        <TanstackProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TanstackProvider>
        <Footer />
      </body>
    </html>
  );
}
