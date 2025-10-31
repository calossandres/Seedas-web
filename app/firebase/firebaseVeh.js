// firebaseVeh.js
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 🔹 Generar un ID único
const generateUniqueId = (userId) => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${userId}_${crypto.randomUUID()}`;
  }
  return `${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// ✅ Subir imagen a Firebase Storage
export const uploadImageToStorage = async (file, userId) => {
  try {
    if (!file) throw new Error("No se seleccionó ninguna imagen");
    if (!userId) throw new Error("El userId es obligatorio para subir imágenes");

    const uniqueName = `${userId}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `vehiculos/${uniqueName}`);

    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    console.log("✅ Imagen subida correctamente:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    throw error;
  }
};

// ✅ Guardar transporte del PRODUCTOR
export const saveVehProductorToFirestore = async (data) => {
  try {
    if (!data?.userId) throw new Error("El userId es obligatorio");

    const uniqueId = generateUniqueId(data.userId);
    const docRef = doc(db, "Transportadores", uniqueId);

    await setDoc(docRef, {
      ...data,
      id: uniqueId,
      createdAt: new Date().toISOString(),
    });

    console.log("✅ Transporte productor guardado correctamente.");
    return uniqueId;
  } catch (error) {
    console.error("❌ Error al guardar transporte productor:", error);
    throw error;
  }
};

// ✅ Obtener publicaciones PRODUCTOR de un usuario
export const getUserVehProductor = async (userId) => {
  try {
    const q = query(collection(db, "Transportadores"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error al obtener transportes productor:", error);
    throw error;
  }
};
