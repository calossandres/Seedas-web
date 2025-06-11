'use client'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showFirstImage, setShowFirstImage] = useState(true);

  const toggleImage = () => {
    setShowFirstImage(!showFirstImage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      {/* Header Section */}
      <header className="text-center mb-12 px-4">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Bienvenido a Seedas</h1>
        <p className="text-xl text-gray-700">
          Somos la nueva forma de conectar productores con transportadores de manera eficiente, colaborativa y sin intermediarios.
        </p>
      </header>

      {/* Text and Image Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {/* Productores */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-2">Productores</h2>
          <p className="text-center mb-4 text-gray-600">
            Accede a una red de transporte confiable para movilizar tu producción y gestiona tus publicaciones como productor.
          </p>
          <Image
            src="/productorPage.jpeg"
            alt="Productor"
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Transportadores con cambio de imagen */}
        <div
          className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={toggleImage}
        >
          <h2 className="text-2xl font-semibold mb-2">Transportadores</h2>
          <p className="text-center mb-4 text-gray-600">
            Publica tus vehículos y consigue trabajo como transportador de carga agrícola, pecuaria y más. Haz clic para ver más opciones.
          </p>
          <Image
            src={showFirstImage ? "/transporteProductorPage.jpeg" : "/transporteComPage.jpeg"}
            alt="Transportador"
            width={400}
            height={300}
            className="rounded-lg object-cover transition duration-300"
          />
          <p className="mt-2 text-sm text-gray-400">(Haz clic en la imagen para cambiar)</p>
        </div>

        {/* Transporte comunitario */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-2">Transporte comunitario</h2>
          <p className="text-center mb-4 text-gray-600">
            Explora u ofrece servicios de transporte comunitario, gestiona tus publicaciones y visualiza a los usuarios suscritos.
          </p>
          <Image
            src="/transporteComunitarioPage.jpeg"
            alt="Transporte Comunitario"
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </section>
    </div>
  );
}
