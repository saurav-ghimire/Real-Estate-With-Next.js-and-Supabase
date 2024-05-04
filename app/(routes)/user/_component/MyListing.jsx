import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { BathIcon, BedDouble, MapPin, Ruler } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function MyListing() {
  const [listing, setListing] = useState();
  const user = useUser();
  
  useEffect(() =>{
    getUserListing()
  },[])

  const getUserListing = async() => {
    const {data, error} = await supabase
    .from('listing')
    .select('*,listingImages(url, listing_id)')
    .eq('createdBy', user.user.primaryEmailAddress.emailAddress)
 
   if(data){
    setListing(data)
   }
   if(error){
    toast('Something went wrong');
   }

  }

  const deleteItem = async (id) => {
    try {
      // Delete listing images associated with the specified listing_id
      await supabase
        .from('listingImages')
        .delete()
        .eq('listing_id', id);
  
      // Delete the listing
      await supabase
        .from('listing')
        .delete()
        .eq('id', id)
        .eq('createdBy', user.user.primaryEmailAddress.emailAddress);
  
      toast('Listing Deleted Successfully');
      getUserListing();
    } catch (error) {
      toast('Error while deleting: ' + error.message);
    }
  };
  
  
  return ( 
    <div>
      <h2 className="font-bold text-2xl">Manage your Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {listing?.length > 0 ? (
            listing?.map((item, index) => (
              
                  <div
                key={index}
                className="p-2 border border-transparent cursor-pointer rounded-md transition-colors hover:border-primary relative"
              >
                <Link className="absolute top-2 right-2" href={'/view-listing/' + item.id}>
                    <Button>View</Button>
                  </Link>
                <h2 className="bg-primary text-white  absolute p-2">{item.active? 'Published' : 'Draft'}</h2>
                <Image
                  src={item?.listingImages[0]?
                    item?.listingImages[0]?.url
                    : '/placeholder.png'
                  }
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
                <div className="mt-2 flex gap-2">
                  <Link  href={'/edit-listing/' + item.id}><Button>Edit</Button></Link>
                  
                  <AlertDialog>
                  <AlertDialogTrigger><Button variant="destructive" >Delete</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your listing
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button onClick={() => deleteItem(item.id)} >Delete</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

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
   );
}

export default MyListing;