'use client';

import { createContext } from 'react';

export const VehRadiusContext = createContext({
    radius: 5, // Valor por defecto del radio (en kilómetros)
    setRadius: () => {}, // Función vacía como placeholder
});