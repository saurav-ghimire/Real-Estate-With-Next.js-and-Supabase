"use client"
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_component/Slider";
import Details from "../_component/Details";


function ViewListing({params}) {
  useEffect(() => {
    getListingDetails()
  },[])
  const [listingDetails, setListingDetails] = useState();
   const getListingDetails = async () => {
    const {data, error}=await supabase
    .from('listing')
    .select('*,listingImages(url, listing_id)')
    .eq('id', params.id)
    .eq('active', true)

    if(data){
      setListingDetails(data[0]);
    }
    if(error){
      toast('Server Side Error')
    }
  }

  
  return ( 
    <div className="px-4 md:px-32 lg:px-32 my-3 overflow-hidden">
      <Slider imageList={listingDetails?.listingImages} />

      <Details details={listingDetails} />
    </div>
   );
}

export default ViewListing;