import Image from 'next/image';

function CarListItem({ car, distance, alt }) {
  return (
    <div className="flex gap-4">
      <Image
        src={car.image}
        width={100}
        height={100}
        alt={`Imagen del vehículo ${car.name}`}  // Descripción clara del vehículo
      />
      <div>
        <h3>{car.name}</h3>
        <p>Precio: ${car.amount}</p>
        <p>Distancia: {distance} km</p>
      </div>
    </div>
  );
}

export default CarListItem;
