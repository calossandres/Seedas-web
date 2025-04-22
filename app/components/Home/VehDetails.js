"use client";
import React from "react";

const VehDetails = ({ publicacion }) => {
  if (!publicacion) {
    console.log("No se recibió ninguna publicación.");
    return <p className="text-red-500">Error: No se pudo cargar la publicación.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Detalles de la Publicación</h3>

      <p><strong>Origen:</strong> {publicacion.source?.name || "No especificado"}</p>
      <p><strong>Destino:</strong> {publicacion.destination?.name || "No especificado"}</p>
      <p><strong>Teléfono:</strong> {publicacion.phone || "No especificado"}</p>
      
      <p><strong>Tipo de Vehículo:</strong> {publicacion.vehicle || "No especificado"}</p>
      <p><strong>Asientos Disponibles:</strong> {publicacion.seats || "No especificado"}</p>

      <p><strong>Método de Pago:</strong> {publicacion.paymentMethod || "No especificado"}</p>

      {publicacion.images?.length > 0 ? (
        <div className="mt-4">
          <strong>Imágenes del Vehículo:</strong>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {publicacion.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vehículo ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ) : (
        <p><strong>Imágenes del Vehículo:</strong> No se han subido imágenes</p>
      )}
    </div>
  );
};

export default VehDetails;
