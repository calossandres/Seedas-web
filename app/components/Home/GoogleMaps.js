"use client";

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { decodeFormState } from 'next/dist/server/app-render/entry-base';

const containerStyle = {
  width: '100%',
  height: '450px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMaps() {
//  const { isLoaded } = useJsApiLoader({
//    id: 'google-map-script',
//    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
//  });
const {source, setSource}=useContext(SourceContext);
const {destination, setDestination}=useContext(DestinationContext);

const [center, setCenter] = useState({
  lat: -3.745,
  lng: -38.523
});

  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDirectionRoutePoints]=useState([])

  useEffect(()=>{
    if(source?.length=![]&&map)
      {
        map.panTo(
          {
            lat:source.lat,
            lng:source.lng
          }
        )
        setCenter({
          lat:source.lat,
          lng:source.lng
        })
      }
      if(source.lenght!=[]&&destination.lenght!=[])
        {
          directionRoute();
        }
  },[source])


  useEffect(()=>{
    if(destination?.length=![]&&map)
      {
        setCenter({
          lat:destination.lat,
          lng:destination.lng
        })
      }

      if(source.lenght!=[]&&destination.lenght!=[])
        {
          directionRoute();
        }
  },[destination])

  const directionRoute=()=>{
    const DirectionsService=new google.maps.DirectionsService();
    console.log('DIE')

    DirectionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status===google.maps.DirectionsService.OK)
        {
          setDirectionRoutePoints(result)
        }
        else{
          console.error('error');
        }

    })
  }


  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '89587ae7dea7e34' }}
    >
      {source.lenght!=[]? <MarkerF
      position={{lat:source.lat,lng:source.lng}}
      icon={{
        url:"/source.png",
        scaledSize:{
          width:20,
          height:20
        }
      }}
      >
        <OverlayView
          position={{lat:source.lat,lng:source.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{source.label}</p>
            </div>
        </OverlayView>
      </MarkerF>:null}

      {destination.lenght!=[]? <MarkerF
      position={{lat:destination.lat,lng:destination.lng}}
      icon={{
        url:"/source.png",
        scaledSize:{
          width:20,
          height:20
        }
      }}

      >
        <OverlayView
          position={{lat:destination.lat,lng:destination.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{destination.label}</p>
            </div>
        </OverlayView>
      </MarkerF>:null}


      {/* Child components, such as markers, info windows, etc. */}

      <DirectionsRenderer
      directions={directionRoutePoints}
      options={{
        polylineOptions:{
          strokeColor:'#000',
          strokeWeight:5
        },
        suppressMarkers:true
      }}
      />
    </GoogleMap>
  ) 
}

export default GoogleMaps;
