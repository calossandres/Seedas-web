'use client';

import React, { useEffect, useRef, useContext } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Image from 'next/image';
import { DestinationContext } from '../../context/DestinationContext';

function InputDestination() {
  const { setDestination } = useContext(DestinationContext);
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (!geocoderRef.current) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        placeholder: 'Ingresa destino',
        types: 'place,address',
        countries: 'co,us',
      });

      geocoderRef.current.addTo('#veh-geocoder-destination');

      geocoderRef.current.on('result', (event) => {
        const { geometry, place_name } = event.result;
        if (geometry?.coordinates) {
          const [lng, lat] = geometry.coordinates;
          setDestination({ lat, lng, name: place_name });
        }
      });
    }

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.clear();
      }
    };
  }, [setDestination]);

  return (
    <div className="relative z-[9998] bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image src="/source.png" width={15} height={15} alt="Destino" />
      <div id="veh-geocoder-destination" className="w-full" />
    </div>
  );
}

export default InputDestination;
