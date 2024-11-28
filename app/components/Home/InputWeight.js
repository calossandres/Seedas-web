import React from "react";

function InputWeight({ weight, setWeight }) {
  return (
    <div className="my-4">
      <label htmlFor="weight" className="block font-medium">
        Peso de la carga (kg):
      </label>
      <input
        type="number"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
        className="w-full border p-2 rounded"
        placeholder="Ingresa el peso de la carga"
      />
    </div>
  );
}

export default InputWeight;
