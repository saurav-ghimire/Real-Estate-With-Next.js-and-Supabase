import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Filter from "./Filter";

function Listing({ listingData, handleSearchButton, searchAddress, setBathCount, setBedCount, setHomeType, setParkingCount }) {
  const [address, setAddress] = useState("");

  return (
    <>
      <div>
        <div className="p-3 flex gap-4 items-center">
          <GoogleAddressSearch
            SelectedAddress={(value) => {
              searchAddress(value);
              setAddress(value);
            }}
            setCordinates={(value) => console.log(value)}
          />
          <Button className="flex gap-2" onClick={handleSearchButton}>
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>
        
        <Filter
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setHomeType={setHomeType}
        setParkingCount={setParkingCount}
         />

        <div className="p-3">
          <h2 className="text-lg">{address && <div>Found {listingData?.length} for <span className="text-primary font-bold">{address?.label}</span></div>}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listingData?.length > 0 ? (
            listingData?.map((item, index) => (
              <div
                key={index}
                className="p-2 border border-transparent cursor-pointer rounded-md transition-colors hover:border-primary"
              >
                <Image
                  src={item.listingImages[0].url}
                  height={200}
                  width={700}
                  alt="Image"
                  className="rounded-lg object-cover h-[200px]"
                />
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">${item.price}</h2>
                  <h2 className="flex gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" /> {item.address}
                  </h2>
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center">
                      <BedDouble className="h-4 w-4" /> {item.bedroom}
                    </h2>
                    <h2 className="flex w-full gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center">
                      <BathIcon className="h-4 w-4" /> {item.bathroom}
                    </h2>
                    <h2 className="flex w-full gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center">
                      <Ruler className="h-4 w-4" /> {item.area}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={item}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Listing;
