'use client'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showProducerImage, setShowProducerImage] = useState(true);
  const [showTransporterImage, setShowTransporterImage] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="text-center mb-14 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
          Bienvenido a <span className="text-green-700">SEEDAS</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Conectamos productores y transportadores rurales mediante una plataforma moderna, colaborativa y sin intermediarios.
        </p>
      </header>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl px-6">
        {/* Productores */}
        <div
          onClick={() => setShowProducerImage(!showProducerImage)}
          className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Productores</h2>
          <p className="text-center mb-4 text-gray-500 text-sm md:text-base leading-relaxed">
            Publica tus productos agrícolas o pecuarios y encuentra transporte seguro y asequible.
            <span className="block mt-1 text-gray-400 text-xs">(Haz clic para cambiar la imagen)</span>
          </p>
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={showProducerImage ? "/pageproductor.png" : "/pageproductorfoot.png"}
              alt="Productores"
              width={500}
              height={350}
              className="w-full h-[250px] md:h-[200px] object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Transportadores */}
        <div
          onClick={() => setShowTransporterImage(!showTransporterImage)}
          className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Transportadores</h2>
          <p className="text-center mb-4 text-gray-500 text-sm md:text-base leading-relaxed">
            Publica tus vehículos y recibe solicitudes de transporte agrícola, pecuario o comunitario.
            <span className="block mt-1 text-gray-400 text-xs">(Haz clic para cambiar la imagen)</span>
          </p>
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={showTransporterImage ? "/pagetrasportadorprod.png" : "/pagetransportadorcomu.png"}
              alt="Transportadores"
              width={500}
              height={350}
              className="w-full h-[250px] md:h-[200px] object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Transporte comunitario */}
        <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Transporte comunitario</h2>
          <p className="text-center mb-4 text-gray-500 text-sm md:text-base leading-relaxed">
            Explora u ofrece transporte compartido entre comunidades rurales y gestiona tus publicaciones de forma fácil.
          </p>
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/pagecomunitar.png"
              alt="Transporte Comunitario"
              width={500}
              height={350}
              className="w-full h-[250px] md:h-[200px] object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
