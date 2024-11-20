import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Subir imagen a Firebase Storage
export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Guardar datos en Firestore
export const saveTransportadoresToFirestore = async (data) => {
  try {
    const docRef = doc(db, 'Transportadores', `${Date.now()}`);
    await setDoc(docRef, data);
    alert('Reserva guardada correctamente.');
  } catch (error) {
    console.error('Error al guardar la reserva:', error);
    alert('No se pudo guardar la reserva.');
  }
};
