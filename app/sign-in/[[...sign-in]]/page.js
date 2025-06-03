'use client';
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Imagen de fondo */}
      <Image
        src="/fondo-l.jpg"
        alt="fondo"
        fill
        className="object-cover z-0"
      />

      {/* Filtro oscuro encima de la imagen, pero detrás del formulario */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Contenedor centrado del formulario (por encima del fondo oscuro) */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
