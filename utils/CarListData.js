"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const CarListData = ({ onSelect }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCars(carList);
      } catch (error) {
        console.error("Error al obtener los vehículos: ", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-2">Selecciona un vehículo</h2>
      <ul>
        {cars.map((car) => (
          <li
            key={car.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(car)}
          >
            {car.name} - Capacidad: {car.capacity}kg - Tarifa: ${car.amount}/km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarListData;
