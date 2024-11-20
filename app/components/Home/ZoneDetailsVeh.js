import React from 'react';

const ZoneDetailsVeh = ({ publicacion }) => {
  if (!publicacion) {
    return null;
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-semibold">Detalles del Transporte</h3>
      <p><strong>Origen:</strong> {publicacion.source.name}</p> {/* Origen */}
      <p><strong>Vehículo:</strong> {publicacion.vehicle}</p> {/* Vehículo */}
      <p><strong>Radio:</strong> {publicacion.radius} km</p> {/* Radio */}
      <p><strong>Teléfono:</strong> {publicacion.phone}</p> {/* Teléfono */}
      <p><strong>Asientos disponibles:</strong> {publicacion.seats}</p> {/* Asientos */}
      <p><strong>Fecha:</strong> {publicacion.workingHours.date}</p> {/* Fecha */}
      <p><strong>Horario:</strong> {publicacion.workingHours.start} - {publicacion.workingHours.end}</p> {/* Horario */}
     
    </div>
  );
};

export default ZoneDetailsVeh;
