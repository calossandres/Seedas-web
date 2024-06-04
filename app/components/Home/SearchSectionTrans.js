'use client';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const SearchSectionTrans = ({ type, placeholder, setLocation }) => {
  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          onChange: (place) => setLocation(place),
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
        }}
      />
    </div>
  );
};

export default SearchSectionTrans;
