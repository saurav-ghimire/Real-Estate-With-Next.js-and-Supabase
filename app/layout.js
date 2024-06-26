import { Roboto } from 'next/font/google'

import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})
export const metadata = {
  title: "Real Estate App",
  description: "Find the nearest property",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
            {children}
        </Provider>
        <Toaster />
        </body>
    </html>
    </ClerkProvider>
  );
}
