import React from "react";

const Details = ({ publicacion, onDelete }) => {
  if (!publicacion) return null;

  return (
    <div className="p-4 border rounded-md shadow-md w-full bg-gray-50">
      <h3 className="text-xl font-semibold mb-3">Detalles del Trabajo</h3>
      <div className="space-y-2">
        <p><strong>Origen:</strong> {publicacion.source?.name || "No especificado"}</p>
        <p><strong>Destino:</strong> {publicacion.destination?.name || "No especificado"}</p>
        <p><strong>Teléfono:</strong> {publicacion.phone || "No proporcionado"}</p>
        <p><strong>Vehículo:</strong> {publicacion.vehicle || "No especificado"}</p>
        <p><strong>Precio:</strong> ${parseFloat(publicacion.price).toLocaleString('es-CO')} COP</p>
        <p><strong>Fecha:</strong> {publicacion.workingHours?.date || "No especificada"}</p>
        <p><strong>Horario:</strong> {publicacion.workingHours?.start} - {publicacion.workingHours?.end}</p>
        <p><strong>Peso:</strong> {publicacion.weight || "No especificado"} kg</p>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onDelete(publicacion.id)}
          className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700"
        >
          Eliminar Publicación
        </button>
      </div>
    </div>
  );
};

export default Details;
