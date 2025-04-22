'use client';

import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { VehDestinationContext } from '../context/VehDestinationContext';
import { VehSourceContext } from '../context/VehSourceContext';
import VehMapbox from '../components/Home/VehMapbox';
import VehSearchSection from '../components/Home/VehSearchSection';
import VehContain from "../components/Home/VehContain";
import { VehUserIdContext } from "../context/VehUserIdContext";

export default function TransportPage() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const { user, isLoaded } = useUser();
  const userId = isLoaded && user ? user.id : null;

  return (
    <VehUserIdContext.Provider value={{ userId }}>
    <VehDestinationContext.Provider value={{ destination, setDestination }}>
      <VehSourceContext.Provider value={{ source, setSource }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <VehSearchSection />
          </div>
          <div className="col-span-2">
            <VehMapbox />
          </div>
          <div className="p-4 bg-white border rounded shadow-md w-full max-w-full">
            <VehContain />
          </div>
        </div>
      </VehSourceContext.Provider>
    </VehDestinationContext.Provider>
    </VehUserIdContext.Provider>
  );
}
