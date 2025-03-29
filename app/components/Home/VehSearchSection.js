import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { saveTransportadoresToFirestore } from '../../firebase/firebaseVeh';
import VehInputItem from './VehInputItem';
import { VehSourceContext } from '../../context/VehSourceContext';
import { VehRadiusContext } from '../../context/VehRadiusContext';
import VehicleForm from './VehicleForm';
import VehRadius from './VehRadius';
import VehDate from './VehDate';
import VehImage from './VehImage';
import { useUser } from '@clerk/nextjs'; // Importar Clerk para obtener el userId

function VehSearchSection() {
  const router = useRouter();
  const { source } = useContext(VehSourceContext);
  const { radius } = useContext(VehRadiusContext);
  const [vehicle, setVehicle] = useState({ name: '', tarifaBase: 0 });
  const [workingHours, setWorkingHours] = useState({ date: '', start: '', end: '' });
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState('');
  const [images, setImages] = useState([]);
  const { user } = useUser(); // Obtener el usuario autenticado
  const userId = user?.id; // Obtener el userId

  const handleSubmit = async () => {
    // Validación de campos
    if (!source || !vehicle || !workingHours.start || !workingHours.end || !radius || !phone || !seats || !images || !userId) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const TransportadoresData = {
      userId,
      source,
      radius: parseFloat(radius),
      phone,
      vehicle: vehicle.name, // Asegurar que se envía solo el nombre del vehículo
      tarifaBase: vehicle.tarifaBase, // Si deseas guardar la tarifa base
      seats: parseInt(seats, 10),
      images,
      workingHours,
    };

    try {
      // Guardar datos en Firestore
      await saveTransportadoresToFirestore(TransportadoresData);

      // Redirigir a la página de zona de trabajo
      alert('¡Publicación creada exitosamente!');
      router.push('/zonaTrabajo');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un problema al guardar los datos. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div>
      <div className="p-4 border rounded-lg mb-8">
        <h2 className="text-lg font-bold">Crear publicación de transporte</h2>
        <VehInputItem type="En qué zona quieres buscar trabajo" />
        <VehRadius />
        <div>
          <label className="block mb-2 font-semibold">Teléfono:</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Ingresa tu número de teléfono"
          />
        </div>

        {/* 🚗 Selección de vehículo */}
        <VehicleForm setVehicle={setVehicle} />

        {/* 🚗 Vehículo seleccionado */}
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Vehículo seleccionado:</label>
          <input
            type="text"
            value={vehicle.name}
            readOnly
            className="p-2 border rounded w-full bg-gray-200"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-semibold">Asientos disponibles:</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Ingresa el número de asientos disponibles"
          />
        </div>
        <VehImage images={images} setImages={setImages} />
        <VehDate setWorkingHours={setWorkingHours} />
        <button
          onClick={handleSubmit}
          className="mt-3 bg-gray-900 text-white p-3 rounded"
        >
          Publicar
        </button>
      </div>
    </div>
  );
}

export default VehSearchSection;
