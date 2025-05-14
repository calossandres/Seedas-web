"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const VehSolicitudes = () => {
  const { user } = useUser();
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchSolicitudes = async () => {
      const q = query(
        collection(db, "Solicitudes"),
        where("transportadorId", "==", user.id)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSolicitudes(data);
    };

    fetchSolicitudes();
  }, [user]);

  const confirmarSolicitud = async (solicitudId, publicacionId) => {
    try {
      await updateDoc(doc(db, "Solicitudes", solicitudId), {
        status: "confirmado",
      });

      await updateDoc(doc(db, "Productores", publicacionId), {
        status: "confirmado",
      });

      setSolicitudes((prev) =>
        prev.map((s) =>
          s.id === solicitudId ? { ...s, status: "confirmado" } : s
        )
      );
    } catch (error) {
      console.error("Error al confirmar la solicitud:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Solicitudes de Transporte Recibidas</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes dirigidas a ti.</p>
      ) : (
        solicitudes.map((solicitud) => (
          <div key={solicitud.id} className="border p-4 mb-4 rounded shadow">
            <p><strong>Origen:</strong> {solicitud.source?.name}</p>
            <p><strong>Destino:</strong> {solicitud.destination?.name}</p>
            <p><strong>Precio:</strong> ${solicitud.price}</p>
            <p>
              <strong>Estado:</strong>
              <span className={`ml-2 font-semibold ${
                solicitud.status === "confirmado"
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}>
                {solicitud.status}
              </span>
            </p>

            {solicitud.status !== "confirmado" && (
              <button
                onClick={() => confirmarSolicitud(solicitud.id, solicitud.publicationId)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
              >
                Confirmar Solicitud
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VehSolicitudes;
