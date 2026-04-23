import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ChatWidgetProvider } from "@/context/ChatWidgetContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotToaster } from "@/components/HotToaster";
import { StoreHelpPanel } from "@/components/StoreHelpPanel";
import { ChatUsButton } from "@/components/ChatUsButton";
import { getSiteName, getSiteUrl } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${getSiteName()} · Tablets and accessories`,
    template: `%s · ${getSiteName()}`,
  },
  description:
    "Ovesta. Shop tablets and accessories with a clear checkout when you are signed in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <AuthProvider>
          <CartProvider>
            <ChatWidgetProvider>
              <HotToaster />
              <Navbar />
              <div className="min-h-screen">{children}</div>
              <Footer />
              <Suspense fallback={null}>
                <ChatUsButton />
              </Suspense>
              <StoreHelpPanel />
            </ChatWidgetProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
