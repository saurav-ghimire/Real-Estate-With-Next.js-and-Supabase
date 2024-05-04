"use client"
import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';
const containerStyle = {
  width: '100%',
  height: '80vh'
};


function GoogleMapSection({cordinates, listing}) {
  
  // listing && listing.map((item, index) => (
  //   console.log('i am here', item)
  // ))

  
  const [center, setCenter] = useState({
    lat: 61.0666922, // Latitude of Canada
    lng: -107.991707 // Longitude of Canada
  });
  

  
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API
  // })

  const [map, setMap] = React.useState(null)

  useEffect(()=>{
    cordinates&&setCenter(cordinates);
  },[cordinates])
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [listing])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [listing])
  
  return ( 
    <div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {listing && listing.map((item, index) =>(

          <MarkerItem
          key={index}
          item={item}
           />
        ))}
        
      </GoogleMap>
    </div>

   );
}

export default GoogleMapSection;