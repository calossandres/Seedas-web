"use client";

import { useState } from 'react';

export default function PaymentButton() {
  const [paymentLink, setPaymentLink] = useState(null);

  const createPreference = async () => {
    const response = await fetch('/api/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Producto de Ejemplo',
        unit_price: 100,
        quantity: 1,
      }),
    });

    const data = await response.json();
    setPaymentLink(data.init_point); // Guarda el link de pago en el estado
  };

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <button 
        onClick={createPreference} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Generar Link de Pago
      </button>
      
      {paymentLink && (
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Link de pago generado:</p>
          <a 
            href={paymentLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Ir a Pagar
          </a>
        </div>
      )}
    </div>
  );
}
