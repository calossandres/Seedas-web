import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';

// Función para guardar datos del transportador en Firestore con múltiples publicaciones por usuario
export const saveTransportadoresToFirestore = async (data) => {
  try {
    if (!data?.userId) throw new Error("El userId es obligatorio");

    const uniqueId = `${data.userId}_${crypto.randomUUID()}`; // ID único basado en el usuario
    const docRef = doc(db, "Transportadores", uniqueId);

    await setDoc(docRef, {
      ...data,
      id: uniqueId,
      createdAt: new Date().toISOString(),
    });

    console.log("Transportador guardado correctamente.");
    return uniqueId;
  } catch (error) {
    console.error("Error al guardar el transportador:", error);
    throw error;
  }
};

// Función para obtener todas las publicaciones de un transportador por userId
export const getUserTransporters = async (userId) => {
  try {
    if (!userId) throw new Error("El userId es obligatorio");

    const q = query(collection(db, "Transportadores"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener transportadores:", error);
    throw error;
  }
};
