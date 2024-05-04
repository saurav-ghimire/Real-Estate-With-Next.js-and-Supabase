import { Button } from "@/components/ui/button";
import { BathIcon, BedDouble, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";


function MarketListingItem({item,  closeHandler}) {
  return ( 
    <>
     <div className="p-2 border border-transparent bg-white cursor-pointer rounded-md transition-colors hover:border-primary
                  w-[170px]
                "
              >
                <X
                onClick={() => closeHandler()}
                 />
                <Image
                  src={item.listingImages[0].url}
                  height={100}
                  width={150}
                  alt="Image"
                  className="rounded-lg object-cover h-[150px]"
                />
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">${item.price}</h2>
                  
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center">
                      <BedDouble className="h-4 w-4" /> {item.bedroom}
                    </h2>
                    <h2 className="flex w-full gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center">
                      <BathIcon className="h-4 w-4" /> {item.bathroom}
                    </h2>
                  </div>
                  <Button className='sm'>View Details</Button>
                </div>
              </div>
    </>
   );
}

export default MarketListingItem;