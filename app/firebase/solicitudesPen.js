import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const saveSolicitudToFirestore = async (data) => {
  try {
    const solicitudId = `solicitud_${crypto.randomUUID()}`;
    const docRef = doc(db, "Solicitudes", solicitudId);

    await setDoc(docRef, {
      ...data,
      id: solicitudId,
      createdAt: new Date().toISOString(),
    });

    console.log("Solicitud guardada con ID:", solicitudId);
    return solicitudId;
  } catch (error) {
    console.error("🔥 Error al guardar la solicitud:", error.message, error.stack);
    throw new Error("No se pudo guardar la solicitud en Firestore.");
  }
};
