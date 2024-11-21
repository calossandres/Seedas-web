import React from 'react';
import { useAuth } from '@clerk/nextjs'; // Importa useAuth para obtener el correo de Clerk

const Details = ({ publicacion }) => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const email = user ? user.primaryEmailAddress : ''; // Correo del usuario logueado

  if (!publicacion) {
    return null;
  }

  // Construir mensaje para WhatsApp o correo
  const message = ` 
    Hola, me interesa esta publicación:
    - Origen: ${publicacion.source.name}
    - Destino: ${publicacion.destination.name}
    - Vehículo: ${publicacion.vehicle}
    - Precio: ${parseFloat(publicacion.price).toLocaleString('es-CO')} COP
    - Fecha: ${publicacion.workingHours.date}
    - Horario: ${publicacion.workingHours.start} - ${publicacion.workingHours.end}
    - Peso: ${publicacion.weight} kg
  `;

  // Función para enviar a WhatsApp
  const handleSendWhatsApp = () => {
    const phone = publicacion.phone || ''; // Número de teléfono del usuario
    if (!phone) {
      alert('El número de teléfono no está disponible.');
      return;
    }
}

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-semibold">Detalles del Trabajo</h3>
      <p><strong>Origen:</strong> {publicacion.source.name}</p>
      <p><strong>Destino:</strong> {publicacion.destination.name}</p>
      <p><strong>Teléfono:</strong> {publicacion.phone}</p>
      <p><strong>Vehículo:</strong> {publicacion.vehicle}</p>
      <p><strong>Precio:</strong> ${parseFloat(publicacion.price).toLocaleString('es-CO')} COP</p>
      <p><strong>Fecha:</strong> {publicacion.workingHours.date}</p>
      <p><strong>Horario:</strong> {publicacion.workingHours.start} - {publicacion.workingHours.end}</p>
      <p><strong>Peso:</strong> {publicacion.weight} kg</p>
      <div className="mt-4 flex gap-2">
       
      </div>
    </div>
  );
};

export default Details;
