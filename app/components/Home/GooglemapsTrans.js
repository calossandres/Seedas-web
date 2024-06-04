'use client';
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const GooglemapsTrans = () => {
  const [radius, setRadius] = useState(1000); // Default radius in meters
  const [center, setCenter] = useState({ lat: 4.60971, lng: -74.08175 }); // Default to Bogota

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={13}
        onClick={(event) => setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() })}
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
