import React from "react";

function InputPhone({ phone, setPhone }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Teléfono:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Ingresa tu número de teléfono"
      />
    </div>
  );
}

export default InputPhone;
