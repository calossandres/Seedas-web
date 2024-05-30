import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function GoogleMaps() {
  
  /*const containerStyle = {
    width: '1000px',
    height: window.innerwidth*0.45
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'89587ae7dea7e34'}}
      >
        { /* Child components, such as markers, info windows, etc. */// }
        <></>
      //</GoogleMap>
  //) : <></>



  return (
    <div className='p-2 md:-5 border-[2px] rounded-xl'>
    <p className='text-[20px]'>get a ride</p>
</div>
  )
}

export default GoogleMaps