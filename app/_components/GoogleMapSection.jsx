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

  useEffect(() => {
    // Center the map around the average coordinates of the listings
    if (listing && listing.length > 0) {
      const sumLat = listing.reduce((acc, item) => acc + item?.coordinates.lat, 0);
      const sumLng = listing.reduce((acc, item) => acc + item?.coordinates.lng, 0);
      const avgLat = sumLat / listing?.length;
      const avgLng = sumLng / listing?.length;
      setCenter({ lat: avgLat, lng: avgLng });
    }
  }, [listing]);
  const onLoad = React.useCallback(function callback(map) {
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
        zoom={10}
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