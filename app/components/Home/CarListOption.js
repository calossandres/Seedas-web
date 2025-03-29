import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import TransporterDetails from './TransporterDetails';

const CarListOption = ({ setSelectedCar }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // Estado para almacenar la publicación seleccionada

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Transportadores'));
        const publicacionesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPublicaciones(publicacionesData);
      } catch (error) {
        console.error('Error al obtener los datos de Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando datos...</p>;
  }

  return (
    <div className="grid gap-2 p-2 border rounded-md bg-white shadow-md w-auto text-sm h-1/5">
      {publicaciones.map((publicacion) => (
        <div
          key={publicacion.id}
          className={`cursor-pointer p-2 rounded-md transition-all duration-200 
            ${selectedId === publicacion.id ? "border-2 border-black" : "hover:bg-gray-200"}`}
          onClick={() => {
            setSelectedCar(publicacion);
            setSelectedId(publicacion.id); // Guarda la ID de la publicación seleccionada
          }}
        >
          <TransporterDetails publicacion={publicacion} />
        </div>
      ))}
    </div>
  );
};

export default CarListOption;
