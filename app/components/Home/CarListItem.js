import Image from 'next/image';  

function CarListItem({ car, distance, weight }) {
    const priceWithWeight = car.amount * distance * (weight > 500 ? 1.5 : 1.0);
  
    return (
      <div className="flex gap-4">
        <Image
          src={car.image}
          width={100}
          height={100}
          alt={`Imagen del vehículo ${car.name}`} 
        />
        <div>
          <h3>{car.name}</h3>
          <p>Precio base: ${car.amount}</p>
          
        </div>
      </div>
    );
  }
export default CarListItem;