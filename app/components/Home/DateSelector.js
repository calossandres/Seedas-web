"use client";

import React, { useEffect, useState } from "react";

const DateSelector = ({ setWorkingHours }) => {
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();

    // Hoy como mínimo
    const todayStr = today.toISOString().split("T")[0];
    setDate(todayStr);
    setMinDate(todayStr);

    // Guardar en workingHours el valor inicial (hoy)
    setWorkingHours((prev) => ({
      ...prev,
      date: todayStr,
    }));
  }, [setWorkingHours]);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setWorkingHours((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleBlur = () => {
    if (!date) {
      alert("Recuerda escoger la fecha en la que necesitas el transporte.");
    }
  };

  return (
    <div className="my-4">
      <label htmlFor="date" className="block font-medium">
        Fecha en la que necesitas el transporte:
      </label>
      <input
        type="date"
        id="date"
        value={date}
        min={minDate} // Solo permite escoger fechas desde hoy
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full p-2 rounded-lg bg-gray-100 focus:outline-none"
      />
      <p className="text-xs text-gray-500 mt-1">
        Solo se pueden escoger fechas desde hoy en adelante.
      </p>
    </div>
  );
};

export default DateSelector;
