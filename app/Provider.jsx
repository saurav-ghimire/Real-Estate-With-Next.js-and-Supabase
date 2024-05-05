"use client"
import { LoadScript } from "@react-google-maps/api";
import Header from "./_components/Header";


function Provider({children}) {
  return ( 
    <div>
      <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
      libraries={['places']}
      >
      <Header />
        <div className='px-4 mt-1 md:mt-[100px] md:px-20'>
          {children }
        </div>
        </LoadScript>
    </div>
  );
}

export default Provider;