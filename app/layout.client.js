"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { useEffect } from "react";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import { useClerkFirebaseSync } from "./firebase/config";

function AuthSync() {
  const { connectClerkToFirebase } = useClerkFirebaseSync();

  useEffect(() => {
    connectClerkToFirebase();
  }, []);

  return null;
}

export default function ClientLayout({ children }) {
  return (
    <ClerkProvider localization={esES}>
      <Header />
      <AuthSync />
      {children}
      <Footer />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
        rel="stylesheet"
      />
    </ClerkProvider>
  );
}
