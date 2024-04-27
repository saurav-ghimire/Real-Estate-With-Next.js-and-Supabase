"use client"
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';

function AddNewListing() {
  const {user} = useUser();
  const [selectedAddress, setSelectedAddress] = useState();
  const [cordinates, setcordinates] = useState();
  const nextHandler = async ()=>{
    
      const { data, error } = await supabase
      .from('listing')
      .insert([
        { 
          address: selectedAddress.label, 
          coordinates: cordinates, 
          createdBy:user?.primaryEmailAddress?.emailAddress
        },
      ]).select();

      if(data){
        console.log('Listing Successfully Added', data);
      }
      if(error){
        console.log('error', error);
      }
              
  }
  return ( 
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex items-center justify-center flex-col gap-5'>
        <h2 className='font-bold text-2xl'>Add New Listing</h2>
        <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5 w-full'>
          <h2 className='text-gray-500 font-normal'>Enter Address which you want to add</h2>

          <GoogleAddressSearch
          SelectedAddress={(value) => {
            setSelectedAddress(value);
          }}
          setCordinates={(value) => {
            setcordinates(value);
          }}
           />
          <Button
          disabled={!selectedAddress || !cordinates}
          onClick={() => nextHandler()}
          >Next</Button>
        </div>
      </div>
    </div>
   );
}

export default AddNewListing;