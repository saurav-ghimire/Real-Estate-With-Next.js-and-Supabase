"use client"
import { MapPin } from 'lucide-react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function GoogleAddressSearch({setCordinates, SelectedAddress}) {
  const selectProps = {
    placeholder: 'Search Property Address',
    isClearable: true,
    className: 'w-full',
    onChange: (place) => {
      SelectedAddress(place);
      geocodeByAddress(place.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        setCordinates({ lat, lng })
      );
    }
  };

  return ( 
    <div className='flex items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200' />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
        selectProps={selectProps}
      />
    </div>
  );
}

export default GoogleAddressSearch;
