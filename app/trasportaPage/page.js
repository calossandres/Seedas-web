'use client';
import React, { useState } from 'react';
import SearchSectionTrans from '../components/Home/SearchSectionTrans';
import GooglemapsTrans from '../components/Home/GooglemapsTrans';
import VehicleForm from '../components/Home/VehicleForm';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

export default function TransportaPage() {

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchSectionTrans type="source" placeholder="Ubicación de recogida" />
            <VehicleForm />
          </div>
          <div className="col-span-2">
            <GooglemapsTrans />
          </div>
        </div>
      
  );
}

