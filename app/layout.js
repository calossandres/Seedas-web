import { Inter,Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/app/components/Header'

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
title: "seedas.com",
description: "seedas page",
}

export default function RootLayout({ children }) {
return (
  <ClerkProvider>
<html lang="en">
<body className={inter.className}>
  {/* Header */}
  <Header />
  
  {/* Contenido principal */}
  {children}
  </body>
</html>
</ClerkProvider>
)
}