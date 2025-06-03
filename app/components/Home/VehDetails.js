"use client";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const VehDetails = ({ publicacion }) => {
  const handleDelete = async () => {
    if (!publicacion?.id) return;

    try {
      await deleteDoc(doc(db, "VehComunitario", publicacion.id));
      alert("Publicación eliminada correctamente.");
    } catch (error) {
      console.error("Error eliminando publicación:", error);
      alert("Ocurrió un error al eliminar la publicación. Intenta nuevamente.");
    }
  };

  if (!publicacion) {
    return <p className="text-red-500">Error: No se pudo cargar la publicación.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4">Detalles de la Publicación</h3>

      <p><strong>Origen:</strong> {publicacion.source?.name || "No especificado"}</p>
      <p><strong>Destino:</strong> {publicacion.destination?.name || "No especificado"}</p>
      <p><strong>Teléfono:</strong> {publicacion.phone || "No especificado"}</p>
      <p><strong>Tipo de Vehículo:</strong> {publicacion.vehicle || "No especificado"}</p>
      <p><strong>Asientos Disponibles:</strong> {publicacion.seats || "No especificado"}</p>
      <p><strong>Método de Pago:</strong> {publicacion.paymentMethod || "No especificado"}</p>

      {/* Mostrar suscriptores si existen */}
      {publicacion.suscriptores && publicacion.suscriptores.length > 0 ? (
        <div className="mt-4">
          <h4 className="font-bold mb-2 text-green-700">Usuarios Suscritos:</h4>
          <ul className="list-disc list-inside">
            {publicacion.suscriptores.map((suscriptor, index) => (
              <li key={index}>
                {suscriptor.nombre} - {suscriptor.telefono}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-yellow-600 mt-4"><strong>Usuarios Suscritos:</strong> Ninguno</p>
      )}

      {/* Botón para eliminar */}
      <button
        onClick={() => {
          const confirmDelete = prompt(
            '⚠️ Para confirmar la eliminación de la publicación, escribe "eliminar"'
          );
          if (confirmDelete?.toLowerCase() === "eliminar") {
            handleDelete();
          } else {
            alert("Eliminación cancelada o texto incorrecto.");
          }
        }}
        className="mt-4 px-3 py-1 bg-[#800020] text-white text-sm rounded hover:bg-[#990022] transition"
      >
        Eliminar Publicación
      </button>
    </div>
  );
};

export default VehDetails;
