'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const GooglemapsTrans = () => {
  const [radius, setRadius] = useState(1000); // Radio predeterminado en metros
  const [center, setCenter] = useState({ lat: 4.60971, lng: -74.08175 }); // Predeterminado a Bogotá

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={13}
        onClick={(event) => {
          try {
            // Intenta establecer el centro del mapa en la posición del clic del usuario
            setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
          } catch (error) {
            console.error('Error setting map center:', error); // Registra cualquier error en la consola
          }
        }}
      >
        <Circle
          center={center}
          radius={radius}
          options={{ fillColor: 'blue', fillOpacity: 0.1, strokeColor: 'blue', strokeOpacity: 0.5 }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GooglemapsTrans;
