"use client"
import { supabase } from "@/utils/supabase/client";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

function ListingMapViews({type}) {

  const [listing, SetListing] = useState();
  const [serachAddress, setSerachAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState();
  const [cordinates, setCordinates] = useState();
  
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
    const searchTerm = serachAddress?.value?.structured_formatting.main_text;
  
    // Initialize the query with basic filters
    let query = supabase
      .from('listing')
      .select(`*, listingImages(url, listing_id)`)
      .eq('active', 'TRUE')
      .eq('type', type);
  
    // Add additional filters if they are not empty or null
    if (searchTerm) {
      query = query.like('address', '%' + searchTerm + '%');
    }
    if (bedCount > 0) {
      query = query.gte('bedroom', bedCount);
    }
    if (bathCount > 0) {
      query = query.gte('bathroom', bathCount);
    }
    if (parkingCount > 0) {
      query = query.gte('parking', parkingCount);
    }
    if (homeType) {
      query = query.eq('propertyType', homeType);
    }
  
    // Execute the query
    const { data, error } = await query;
  
    if (data) {
      console.log(bedCount,bathCount,parkingCount,homeType)
      SetListing(data);
    } else if (error) {
      toast('Error fetching listings');
    }
  };
  

  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <div>
      <Listing 
      listingData={listing} handleSearchButton={handleSearchButton} searchAddress={(v)=>setSerachAddress(v)}
      setBathCount={setBathCount}
      setBedCount={setBedCount}
      setHomeType={setHomeType}
      setParkingCount={setParkingCount}
      setCordinates={setCordinates}
       />
      </div>
      <div className="block md:fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]">
        <GoogleMapSection
        listing={listing}
        cordinates={cordinates}
         />
      </div>
    </div>
   );
}

export default ListingMapViews;