"use client";
import React from "react";
import Image from "next/image";

const TransporterDetails = ({ publicacion }) => {
  if (!publicacion) return null; // No renderiza nada si no hay publicación

  return (
    <div className="p-4 border rounded-md shadow-md flex items-center gap-4 select-none">
      {/* Imagen del transportador */}
      <div className="flex-shrink-0">
        <Image
          src={publicacion.image || "/source.png"}
          width={120}
          height={120}
          alt={`Imagen de ${publicacion.userName || "transportador"}`}
          className="rounded-md object-cover"
        />
      </div>

      {/* Información del transportador */}
      <div className="flex flex-col">
        <p><strong>Nombre:</strong> {publicacion.userName || "No disponible"}</p>
        <p><strong>Vehículo:</strong> {publicacion.vehicle || "No especificado"}</p>
        <p><strong>Tarifa base:</strong> ${publicacion.tarifaBase?.toLocaleString("es-CO") || "No especificado"} COP</p>
        <p><strong>Teléfono:</strong> {publicacion.phone || "No especificado"}</p>
        <p><strong>Origen:</strong> {publicacion.source?.name || "No especificado"}</p>
        <p><strong>Asientos disponibles:</strong> {publicacion.seats || "No especificado"}</p>
        <p><strong>Fecha de publicación:</strong> {publicacion.createdAt ? new Date(publicacion.createdAt).toLocaleDateString() : "No especificado"}</p>
      </div>
    </div>
  );
};

export default TransporterDetails;
