'use client';

import React, { useContext, useState } from 'react';
import { VehSourceContext } from '../../context/VehSourceContext';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function VehInputItem({ type }) {
    const { setSource } = useContext(VehSourceContext);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 2) {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                        value
                    )}.json?access_token=${mapboxgl.accessToken}`
                );
                const data = await response.json();
                setSuggestions(data.features || []);
            } catch (error) {
                console.error('Error al obtener sugerencias:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        const { center, place_name } = suggestion;
        setSource({ lng: center[0], lat: center[1], name: place_name });
        setInputValue(place_name);
        setSuggestions([]);
    };

    return (
        <div className="mt-4">
            <label className="block font-bold mb-2">{type}</label>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                placeholder="Ingrese una ubicación"
            />
            {suggestions.length > 0 && (
                <ul className="border bg-white mt-2 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VehInputItem;
