import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/ui/animated-section";
import { Providers } from "@/components/providers";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSWithShikhar - Learn AI/ML from Industry Experts",
  description: "Empowering professionals to upskill in AI/ML through highly gamified experiential learning programs. Learn from Ivy League alumni and tech giants.",
  keywords: ["AI", "Machine Learning", "Online Courses", "Tech Education", "Programming"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
        <Providers>
          <LayoutWrapper>
            <PageTransition>
              {children}
            </PageTransition>
          </LayoutWrapper>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
