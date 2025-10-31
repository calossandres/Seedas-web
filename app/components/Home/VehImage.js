//VehImage.js
"use client"; 
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase/config"; 

export default function VehImage({ images = [], setImages }) {  // 👈 Props con valor por defecto
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("Por favor, sube una imagen del vehículo.");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("Subiendo imagen, por favor espera...");

    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `vehiculos/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // 👇 Agrega la URL al array
      setImages((prev) => [...prev, url]);
      console.log("✅ Imagen subida correctamente:", url);
      setMessage("✅ Imagen subida con éxito. Puedes continuar.");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      setMessage("❌ Error al subir la imagen. Intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 border border-gray-300 p-4 rounded-xl bg-gray-50">
      <p className="mb-3 font-semibold text-black">{message}</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white p-2"
      />

      {uploading && (
        <div className="flex items-center mt-2 text-blue-900">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-blue-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Subiendo imagen...</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 justify-start">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`vehículo-${idx}`}
              className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
