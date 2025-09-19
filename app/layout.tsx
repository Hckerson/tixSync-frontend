'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/server/setup/apollo/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
