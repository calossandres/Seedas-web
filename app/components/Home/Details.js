import React from 'react';

const Details = ({ publicacion }) => {
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
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // Función para enviar por correo electrónico
  const handleSendEmail = () => {
    const email = publicacion.email || ''; // Correo del usuario que creó la publicación
    if (!email) {
      alert('El correo electrónico no está disponible.');
      return;
    }
    const mailtoURL = `mailto:${email}?subject=Interés en la publicación&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoURL;
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-semibold">Detalles del Trabajo</h3>
      <p><strong>Origen:</strong> {publicacion.source.name}</p>
      <p><strong>Destino:</strong> {publicacion.destination.name}</p>
      <p><strong>Teléfono:</strong> {publicacion.phone}</p>
      <p><strong>Vehículo:</strong> {publicacion.vehicle}</p>
      <p><strong>Precio:</strong> ${parseFloat(publicacion.price).toLocaleString('es-CO')} COP</p>
      <p><strong>Fecha:</strong> {publicacion.workingHours.date}</p>
      <p><strong>Horario:</strong> {publicacion.workingHours.start} - {publicacion.workingHours.end}</p>
      <p><strong>Peso:</strong> {publicacion.weight} kg</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSendWhatsApp}
          className="bg-green-500 text-white px-2 py-1.5 rounded-md"
        >
          Enviar a WhatsApp
        </button>
        <button
          onClick={handleSendEmail}
          className="bg-blue-800 text-white px-2 py-1.5 rounded-md"
        >
          Enviar por Correo
        </button>
      </div>
    </div>
  );
};

export default Details;
