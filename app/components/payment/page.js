// app/payment/page.js
"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Payment from "./index"; // ✅ ahora apunta correctamente al mismo folder

function PaymentContent() {
  const searchParam = useSearchParams();
  const amount = parseFloat(searchParam.get("amount"));

  if (isNaN(amount)) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: Monto inválido
      </div>
    );
  }

  return <Payment price={amount} />;
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-gray-500 mt-10">
          Cargando pago...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
