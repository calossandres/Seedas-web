const TransporterCard = ({ transportador }) => {
    return (
      <div className="border p-4 rounded shadow mb-4">
        <p><strong>Nombre:</strong> {transportador.name}</p>
        <p><strong>Zona:</strong> {transportador.location}</p>
        <p><strong>Vehículo:</strong> {transportador.vehicle}</p>
        <p><strong>Teléfono:</strong> {transportador.phone}</p>
      </div>
    );
  };
  
  export default TransporterCard;
  