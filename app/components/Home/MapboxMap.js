'use client';

import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const containerStyle = {
  width: '100%',
  height: '450px',
};

function MapboxMap() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  // Refs para marcadores y ruta
  const sourceMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerId = 'route';

  useEffect(() => {
    if (mapContainerRef.current && !mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.97, 40.78], // Coordenadas iniciales (puedes cambiarlo)
        zoom: 10,
      });

      mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
  }, []);

  useEffect(() => {
    const map = mapInstance.current;

    if (!map) return;

    // Limpiar ruta existente
    const removeRouteLayer = () => {
      if (map.getLayer(routeLayerId)) {
        map.removeLayer(routeLayerId);
      }
      if (map.getSource(routeLayerId)) {
        map.removeSource(routeLayerId);
      }
    };

    // Añadir marcador
    const addMarker = (lng, lat, color, ref) => {
      if (ref.current) {
        ref.current.remove(); // elimina el marcador anterior
      }
      ref.current = new mapboxgl.Marker({ color })
        .setLngLat([lng, lat])
        .addTo(map);
    };

    // Mostrar ruta si ambos están definidos
    const drawRoute = async () => {
      if (source && destination) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

        const response = await fetch(url);
        const data = await response.json();

        const route = data.routes[0]?.geometry;

        if (!route) return;

        removeRouteLayer();

        map.addSource(routeLayerId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route,
          },
        });

        map.addLayer({
          id: routeLayerId,
          type: 'line',
          source: routeLayerId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1db7dd',
            'line-width': 5,
          },
        });

        map.fitBounds([
          [source.lng, source.lat],
          [destination.lng, destination.lat],
        ], {
          padding: 60,
        });
      } else {
        removeRouteLayer(); // si no hay source y destination, borra la ruta
      }
    };

    // Añadir marcador source
    if (source && typeof source.lng === 'number' && typeof source.lat === 'number') {
      addMarker(source.lng, source.lat, 'blue', sourceMarkerRef);
    }

    // Añadir marcador destination
    if (destination && typeof destination.lng === 'number' && typeof destination.lat === 'number') {
      addMarker(destination.lng, destination.lat, 'red', destinationMarkerRef);
    }

    drawRoute();
  }, [source, destination]);

  return <div style={containerStyle} ref={mapContainerRef}></div>;
}

export default MapboxMap;
