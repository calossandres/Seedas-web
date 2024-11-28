"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import { useRouter } from "next/navigation";
import CarListOptions from "./CarListOptions";
import DateSelector from "./DateSelector";
import Merchandise from "./Merchandise";
import { saveProductoresToFirestore, getUserPublications } from "../../firebase/firebaseUtils";
import { UserIdContext } from "../../context/UserIdContext";
import InputPhone from "./InputPhone";
import InputWeight from "./InputWeight"; // Importamos el nuevo componente

// Función para calcular el precio
const calculatePrice = (distance, weight, carRate) => {
  const baseRate = distance > 300 ? 2500 : 2000; // Tarifa base en pesos por km
  const weightFactor = Math.ceil(weight / 200); // El factor de peso depende de cada 200 kg.
  return (carRate * distance * (baseRate / 1000) * weightFactor).toFixed(2);
};

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const { userId } = useContext(UserIdContext);
  const [price, setPrice] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [workingHours, setWorkingHours] = useState({ date: "", start: "", end: "" });
  const [weight, setWeight] = useState(0);
  const [phone, setPhone] = useState("");
  const [merchandiseData, setMerchandiseData] = useState({ type: "", description: "" });
  const [userPublications, setUserPublications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (source && destination && selectedCar && weight > 0) {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (destination.lat - source.lat) * (Math.PI / 180);
      const dLng = (destination.lng - source.lng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(source.lat * (Math.PI / 180)) *
          Math.cos(destination.lat * (Math.PI / 180)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;

      const calculatedPrice = calculatePrice(dist, weight, selectedCar.amount); // Usa el valor de la tarifa del vehículo
      setPrice(calculatedPrice);
    } else {
      setPrice(null);
    }
  }, [source, destination, selectedCar, weight]); // Monitorea los cambios de peso y otros parámetros.

  const handlePayment = async (paymentMethod) => {
    if (!source || !destination || !selectedCar || !workingHours.date || weight <= 0 || !phone || !merchandiseData.type) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    const ProductoresData = {
      userId,
      source,
      destination,
      vehicle: selectedCar.name,
      price,
      weight,
      workingHours,
      phone,
      merchandise: merchandiseData,
      paymentMethod,
    };

    try {
      await saveProductoresToFirestore(ProductoresData);
      fetchUserPublications();

      if (paymentMethod === "online") {
        router.push(`/payment?amount=${price}`);
      } else {
        alert("Pago confirmado en efectivo. Gracias por usar nuestro servicio.");
        router.push("/zonaTrabajo");
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Hubo un error al guardar la información. Por favor, inténtalo nuevamente.");
    }
  };

  const fetchUserPublications = async () => {
    if (!userId) return;
    try {
      const publications = await getUserPublications(userId);
      setUserPublications(publications);
    } catch (error) {
      console.error("Error al cargar las publicaciones:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserPublications();
    }
  }, [userId]);

  return (
    <div>
      <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Ingresa tus ubicaciones</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <InputPhone phone={phone} setPhone={setPhone} />
        <InputWeight weight={weight} setWeight={setWeight} />
        <Merchandise setMerchandiseData={setMerchandiseData} />
        <CarListOptions distance={price ? parseFloat(price) : 0} weight={weight} setSelectedCar={setSelectedCar} />
        <DateSelector setWorkingHours={setWorkingHours} />
        {price && (
          <div>
            <p>Precio estimado: ${price} pesos</p>
            <button
              onClick={() => handlePayment("online")}
              className="mt-3 bg-gray-900 text-white p-3 rounded mr-4"
            >
              Ir a Pago en línea
            </button>
            <button
              onClick={() => handlePayment("cash")}
              className="mt-3 bg-gray-900 text-white p-3 rounded"
            >
              Pagar en efectivo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSection;

