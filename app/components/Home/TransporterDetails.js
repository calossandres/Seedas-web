"use client";
import React from "react";
import Image from "next/image";

const TransporterDetails = ({ publicacion }) => {
  if (!publicacion) {
    return <p className="text-red-500">Error: No se pudo cargar la información del transportador.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Detalles del Transportador</h3>
      
      {/* Mostrar imagen del transportador */}
      <Image
        src={publicacion.image || "/source.png"} 
        width={100}
        height={100}
        alt={`Imagen de ${publicacion.name || "transportador"}`}
        className="rounded-md"
      />

      {/* Datos del transportador */}
      <p><strong>Nombre:</strong> {publicacion.name || "No disponible"}</p>
      <p><strong>Vehículo:</strong> {publicacion.vehicle || "No especificado"}</p>
      <p><strong>Capacidad:</strong> {publicacion.capacity || "No especificado"} kg</p>
      <p><strong>Tarifa base:</strong> ${publicacion.tarifaBase?.toLocaleString("es-CO") || "No especificado"} COP</p>
      <p><strong>Teléfono:</strong> {publicacion.phone || "No especificado"}</p>
      <p><strong>Origen:</strong> {publicacion.source?.name || "No especificado"}</p>
      <p><strong>Asientos disponibles:</strong> {publicacion.seats || "No especificado"}</p>
      <p><strong>Fecha:</strong> {publicacion.workingHours?.date || "No especificado"}</p>
    
    </div>
  );
};

export default TransporterDetails;
