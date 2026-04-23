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
import { getSiteUrl } from "@/lib/site";
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

const siteUrl = getSiteUrl();
const shareTitle = "Ovesta Store";
const shareDescription =
  "Quality tech and electronics at ovestastore.com. Secure checkout, fast support, and gear you can trust.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${shareTitle} · ovestastore.com`,
    template: `%s · ${shareTitle}`,
  },
  description: shareDescription,
  applicationName: shareTitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: shareTitle,
    title: shareTitle,
    description: shareDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
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
