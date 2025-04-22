'use client';

import React, { useContext } from 'react';
import { VehRadiusContext } from '../../context/VehRadiusContext';

function VehRadius() {
    const { radius, setRadius } = useContext(VehRadiusContext);

    return (
        <div className="mt-4">
            <label className=' font-bold'>Radio de operación (km):</label>
            <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="p-2 border rounded w-full"
                placeholder="Ingrese el radio en kilómetros"
            />
        </div>
    );
}

export default VehRadius;

