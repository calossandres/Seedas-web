"use client";
import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);

  return (
    <div>
      <input
        type="text"
        className="bg-transparent w-full outline-none"
      />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: 'pickup Location',
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00ffff',
              border: 'none',
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;
