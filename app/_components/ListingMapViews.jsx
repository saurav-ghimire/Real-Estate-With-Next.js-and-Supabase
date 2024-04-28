"use client"
import { supabase } from "@/utils/supabase/client";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ListingMapViews({type}) {

  const [listing, SetListing] = useState();

  useEffect(() => {
    getLatestListing();
  })
  const getLatestListing = async() =>{
    const {data, error} = await supabase
    .from('listing')
    .select(`*`)
    .eq('active', 'TRUE' )
    .eq('type', type )

    if(data){
      SetListing(data);
    }
    if(error){
      toast('Server Side Error');
    }

  }
  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
      <Listing />
      </div>
      <div>
        Map
      </div>
    </div>
   );
}

export default ListingMapViews;