import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Details from "./Details";
import { UserIdContext } from "../../context/UserIdContext";
import { deletePublication } from "../../firebase/firebaseUtils";

const Contain = () => {
  const { userId } = useContext(UserIdContext); // Usa el contexto aquí
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Productores"));
        const publicacionesData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((pub) => pub.userId === userId); // Filtra por userId
        setPublicaciones(publicacionesData);
      } catch (error) {
        console.error("Error al obtener los datos de Firebase:", error);
        setError("Hubo un problema al cargar tus publicaciones.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPublicaciones(); // Solo carga si hay un userId
    }
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
    if (!confirmDelete) return;

    try {
      await deletePublication(id);
      setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
      alert("Publicación eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      alert("Hubo un error al eliminar la publicación. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!userId) {
    return <p>No has iniciado sesión. Por favor, inicia sesión para ver tus publicaciones.</p>;
  }

  return (
    <div className="p-4 bg-white border rounded shadow-md max-h-[400px] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Tus Publicaciones</h3>
      {error && <p className="text-red-500">{error}</p>}
      {publicaciones.length === 0 ? (
        <p>No tienes publicaciones disponibles.</p>
      ) : (
        publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="mb-4 border p-2 rounded">
            <Details publicacion={publicacion} onDelete={handleDelete} />
          </div>
        ))
      )}
    </div>
  );
};

export default Contain;
