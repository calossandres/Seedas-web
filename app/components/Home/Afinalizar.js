"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";

const Afinalizar = ({ solicitudId, enCamino, statusInicial, onUpdate }) => {
  const [status, setStatus] = useState(statusInicial);

  const handleFinalizar = async () => {
    try {
      await updateDoc(doc(db, "Solicitudes", solicitudId), {
        status: "finalizado",
      });
      setStatus("finalizado");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error al finalizar servicio:", error);
    }
  };

  if (status === "finalizado") {
    return <p className="text-green-700 font-semibold mt-2">✅ Servicio finalizado</p>;
  }

  return enCamino ? (
    <>
      <p className="text-blue-600 font-semibold mt-2">El transportador ya va en camino 🚛</p>
      <button
        onClick={handleFinalizar}
        className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Finalizar servicio
      </button>
    </>
  ) : null;
};

export default Afinalizar;
