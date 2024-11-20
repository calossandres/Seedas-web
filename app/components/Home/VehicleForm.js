'use client';

import React from 'react';

function VehicleForm({ setVehicle }) {
    const vehicles = ['Moto', 'Carro', 'Camión']; // Lista de vehículos disponibles

    return (
        <div className="mt-4">
            <label htmlFor="vehicle-select" className="block mb-2 font-semibold">
                Seleccione el tipo de vehículo:
            </label>
            <select
                id="vehicle-select"
                onChange={(e) => setVehicle(e.target.value)}
                className="p-2 border rounded w-full"
            >
                <option value="">Seleccione</option>
                {vehicles.map((veh, index) => (
                    <option key={index} value={veh}>
                        {veh}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default VehicleForm;

