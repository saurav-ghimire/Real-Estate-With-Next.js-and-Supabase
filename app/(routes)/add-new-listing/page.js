import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import { Button } from '@/components/ui/button';
import React from 'react';

function AddNewListing() {
  return ( 
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex items-center justify-center flex-col gap-5'>
        <h2 className='font-bold text-2xl'>Add New Listing</h2>
        <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5 w-full'>
          <h2 className='text-gray-500 font-normal'>Enter Address which you want to add</h2>

          <GoogleAddressSearch />
          <Button>Next</Button>
        </div>
      </div>
    </div>
   );
}

export default AddNewListing;