'use client';
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative w-full min-h-[600px]"> {/* altura mínima */}
      {/* Imagen de fondo */}
      <Image
        src="/fondo-l.jpg"
        alt="fondo"
        fill
        className="object-cover z-0"
      />

      {/* Fondo semitransparente si quieres */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Formulario centrado */}
      <div className="relative z-20 flex items-center justify-center py-16">
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
}
