'use client';

import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'; // Asegúrate de tener turf instalado
import { VehSourceContext } from '../../context/VehSourceContext';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const containerStyle = {
    width: '100%',
    height: '450px',
};

function VehMapbox({ radius }) {
    const { source } = useContext(VehSourceContext); // Contexto de la fuente
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapInstance.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.08175, 4.60971], // Bogotá como valor predeterminado
                zoom: 10,
            });

            mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        }
    }, []);

    useEffect(() => {
        if (mapInstance.current && source) {
            const { lng, lat } = source;

            // Marca de origen
            new mapboxgl.Marker({ color: 'blue' })
                .setLngLat([lng, lat])
                .addTo(mapInstance.current);

            mapInstance.current.setCenter([lng, lat]);

            // Agregar circunferencia
            if (radius) {
                const circle = turf.circle([lng, lat], radius, {
                    steps: 64,
                    units: 'kilometers',
                });

                if (mapInstance.current.getLayer('circle-layer')) {
                    mapInstance.current.getSource('circle-source').setData(circle);
                } else {
                    mapInstance.current.addSource('circle-source', {
                        type: 'geojson',
                        data: circle,
                    });

                    mapInstance.current.addLayer({
                        id: 'circle-layer',
                        type: 'fill',
                        source: 'circle-source',
                        paint: {
                            'fill-color': '#00BCD4',
                            'fill-opacity': 0.3,
                        },
                    });
                }
            }
        }
    }, [source, radius]);

    return <div style={containerStyle} ref={mapContainerRef}></div>;
}

export default VehMapbox;
