"use client"
import { supabase } from "@/utils/supabase/client";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ListingMapViews({type}) {

  const [listing, SetListing] = useState();
  const [serachAddress, setSerachAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState();
  useEffect(() => {
    getLatestListing();
  },[])
  const getLatestListing = async() =>{
    const {data, error} = await supabase
    .from('listing')
    .select(`*, listingImages(url, listing_id)`)
    .eq('active', 'TRUE' )
    .eq('type', type )
    .order('id', {ascending:false})

    if(data){
      console.log(data)
      SetListing(data);
    }
    if(error){
      toast('Server Side Error'); 
    }

  }

  const handleSearchButton = async () => {
    const searchTerm = serachAddress?.value?.structured_formatting.main_text
    let query = await supabase
    .from('listing')
    .select(`*, listingImages(url, listing_id)`)
    .eq('active', 'TRUE' )
    .eq('type', type )
    .gte('bathroom', bathCount )
    .gte('parking', parkingCount )
    .gte('bedroom', bedCount )
    .order('id', {ascending:false})
    .like('address', '%'+searchTerm+'%')
    const {data, error} = query
    if(homeType){
      query=query.eq('propertyType', homeType)
    }
    if(data){
      SetListing(data);
    }
    
  }

  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
      <Listing 
      listingData={listing} handleSearchButton={handleSearchButton} searchAddress={(v)=>setSerachAddress(v)}
      setBathCount={setBathCount}
      setBedCount={setBedCount}
      setHomeType={setHomeType}
      setParkingCount={setParkingCount}
       />
      </div>
      <div>
        Map
      </div>
    </div>
   );
}

export default ListingMapViews;