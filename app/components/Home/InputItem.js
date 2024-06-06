'use client';
import React, { useState, useEffect, useContext } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Image from 'next/image';
import { DestinationContext } from '../../context/DestinationContext';
import { SourceContext } from '../../context/SourceContext';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    type === 'source'
      ? setPlaceholder('Pickup Location')
      : setPlaceholder('Dropoff Location');
  }, [type]);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry.location) {
        console.log(place.geometry.location.lng());
        if (type === 'source') {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          });
        }
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image src={type === 'source' ? '/source.png' : '/source.png'} width={15} height={15} />

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          components: { DropdownIndicator: false },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#000ffff00',
              border: 'none',
              boxShadow: 'none',
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
