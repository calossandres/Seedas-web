"use client";

import React, { useState } from "react";

const vehicleCategories = [
  {
    category: "Motocicleta",
    examples: [
      { name: "Honda XR190", tarifa: 10000 },
      { name: "Yamaha XTZ125", tarifa: 10000 },
      { name: "Bajaj Boxer", tarifa: 10000 },
    ],
    description: "Transporte rápido y económico en veredas y caminos de difícil acceso.",
  },
  {
    category: "Motocarro",
    examples: [
      { name: "Bajaj RE", tarifa: 15000 },
      { name: "TVS King", tarifa: 15000 },
    ],
    description: "Transporte de carga ligera y pasajeros en zonas rurales con caminos irregulares.",
  },
  {
    category: "Campero",
    examples: [
      { name: "Toyota Land Cruiser", tarifa: 25000 },
      { name: "Nissan Patrol", tarifa: 25000 },
      { name: "Suzuki Jimny", tarifa: 25000 },
    ],
    description: "Vehículo 4x4 ideal para terrenos accidentados y transporte de personas en zonas montañosas.",
  },
  {
    category: "Camioneta",
    examples: [
      { name: "Toyota Hilux", tarifa: 30000 },
      { name: "Nissan Frontier", tarifa: 30000 },
      { name: "Ford Ranger", tarifa: 30000 },
    ],
    description: "Transporte mixto de carga y pasajeros, útil para el agro y ganadería.",
  },
  {
    category: "Camión Pequeño (Estacas o Furgón)",
    examples: [
      { name: "Chevrolet NHR", tarifa: 50000 },
      { name: "Kia K2700", tarifa: 50000 },
      { name: "Foton BJ1049", tarifa: 50000 },
    ],
    description: "Distribución de productos agrícolas y ganaderos en distancias cortas y medianas.",
  },
  {
    category: "Camión Mediano",
    examples: [
      { name: "Chevrolet NPR", tarifa: 70000 },
      { name: "Isuzu NKR", tarifa: 70000 },
      { name: "JAC 1063", tarifa: 70000 },
    ],
    description: "Transporte de productos en mayor volumen, como carga de frutas, verduras o ganado.",
  },
  {
    category: "Volqueta",
    examples: [
      { name: "Hino 500", tarifa: 90000 },
      { name: "Chevrolet FVR", tarifa: 90000 },
      { name: "Sinotruk Howo", tarifa: 90000 },
    ],
    description: "Transporte de materiales de construcción en fincas y proyectos rurales.",
  },
  {
    category: "Bus o Buseta Rural",
    examples: [
      { name: "Chevrolet NPR Bus", tarifa: 60000 },
      { name: "Mercedes-Benz LO 916", tarifa: 60000 },
    ],
    description: "Movilización de pasajeros en rutas rurales y transporte escolar.",
  },
  {
    category: "Chiva o Escalera",
    examples: [
      { name: "Chevrolet Chiva", tarifa: 55000 },
      { name: "Dodge Chiva", tarifa: 55000 },
      { name: "Ford Chiva", tarifa: 55000 },
    ],
    description: "Vehículo tradicional en zonas rurales para transporte de personas y carga.",
  },
];

function VehicleForm({ setVehicle }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Estado para resaltar el vehículo seleccionado

  const handleToggle = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleSelectVehicle = (veh) => {
    setVehicle({ name: veh.name, tarifaBase: veh.tarifa });
    setSelectedVehicle(veh.name); // Almacenar el nombre del vehículo seleccionado
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 font-semibold">Seleccione el tipo de vehículo:</label>

      <div className="border rounded-lg p-2 bg-gray-100">
        {vehicleCategories.map((cat, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => handleToggle(cat.category)}
              className="w-full text-left font-semibold p-2 bg-gray-200 rounded-md"
            >
              {cat.category} {openCategory === cat.category ? "▲" : "▼"}
            </button>

            {openCategory === cat.category && (
              <div className="mt-2 bg-white border rounded-md p-2">
                <p className="text-sm text-gray-600 mb-2">{cat.description}</p>
                <ul>
                  {cat.examples.map((veh, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSelectVehicle(veh)}
                      className={`p-2 cursor-pointer flex justify-between rounded-md transition-all
                      ${selectedVehicle === veh.name ? "border-2 border-black bg-gray-300" : "hover:bg-gray-200"}`}
                    >
                      {veh.name}
                      <span className="text-gray-600">${veh.tarifa.toLocaleString()} COP</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleForm;
