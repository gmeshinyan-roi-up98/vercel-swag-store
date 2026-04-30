import type { Metadata, Viewport } from "next";
import { Suspense, type ReactNode } from "react";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

import { getStoreConfig } from "@/lib/api/store";
import { CartHydratorServer } from "@/providers";
import { CartDrawer, Footer, Header } from "@/components";
import { CartStateProvider, CartUIProvider } from "@/context";
import { rootMetadata, buildRootMetadata, siteConfig } from "@/lib";

export const generateMetadata = async (): Promise<Metadata> => {
  const storeConfig = await getStoreConfig();

  if (storeConfig.success) {
    return buildRootMetadata(storeConfig.data);
  }

  return rootMetadata;
};

export const viewport: Viewport = {
  initialScale: 1,
  colorScheme: "light",
  width: "device-width",
  themeColor: siteConfig.themeColor,
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className="flex min-h-dvh flex-col">
      <CartStateProvider>
        <CartUIProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <Suspense fallback={null}>
            <CartHydratorServer />
          </Suspense>
        </CartUIProvider>
      </CartStateProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
