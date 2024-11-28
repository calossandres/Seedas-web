import { CarListData } from '../../../utils/CarListData';
import React, { useState } from 'react';
import CarListItem from './CarListItem';

function CarListOptions({ distance, weight, setSelectedCar }) {  // Recibe weight como prop
  const [activeIndex, setActiveIndex] = useState();

  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recomendado</h2>
      {CarListData.map((item, index) => (
        <div
          key={item.id}
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex === index ? 'border-[3px]' : ''}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);  // Envía el carro seleccionado a SearchSection
          }}
        >
          <CarListItem car={item} distance={distance} weight={weight} />  {/* Pasa weight aquí */}
        </div>
      ))}
    </div>
  );
}

export default CarListOptions;
