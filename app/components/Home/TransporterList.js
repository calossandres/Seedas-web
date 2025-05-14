"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserTransporters } from "../firebase/transportadores"; // Ajusta ruta según ubicación real
import TransporterCard from "./TransporterCard";

const TransporterList = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const result = await getUserTransporters(user.id);
      setData(result);
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mis Publicaciones de Transporte</h2>
      {data.map((transportador) => (
        <TransporterCard key={transportador.id} transportador={transportador} />
      ))}
    </div>
  );
};

export default TransporterList;
