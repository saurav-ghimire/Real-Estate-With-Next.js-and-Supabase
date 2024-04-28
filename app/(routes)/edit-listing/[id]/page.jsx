"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/utils/supabase/client"
import { useUser } from "@clerk/nextjs"
import { Formik } from "formik"
import {  useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import FileUpload from "../_components/fileUpload"
import Loader from "./loader"


function EditListing({params}) {
  const {user} = useUser();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  useEffect(() => {
    
    user&&verifyUserRecord();
  },[user]);

  const verifyUserRecord = async() => {
    
    const {data, error} = await supabase
    .from('listing')
    .select('*,listingImages(listing_id,url)' )
    .eq('createdBy', user?.primaryEmailAddress.emailAddress)
    .eq('id', params.id);
    if(data?.length <= 0){
      router.replace('/');
    }
    if(error){
      console.log(error);
      setLoading(false);
    }
    if(data){
      console.log(data)
      setListing(data[0]);
    }
    
  }

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
    .from('listing')
    .update(formValue)
    .eq('id', params.id)
    .select()
            
    if(data){
      console.log(data);
      setLoading(false);
      toast('Listing Updated Successfully');
    }
    for (const image of images) {
        const file = image;
        const fileName = Date.now().toString();
        const fileExt=fileName.split('.').pop();
        const {data, error} = await supabase.storage
        .from('ListingImage')
        .upload(`${fileName}`, file, {
          contentType:`image/${fileExt}`,
          upsert:false
        })

        if(error){
          console.log(error)
          setLoading(false);
          toast('Error While Uploading Images');
        }else{
          const imageUrl=process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
          const {data, error} = await supabase
          .from('listingImages')
          .insert([{url:imageUrl, listing_id:params?.id}])
          .select();
        }

        setLoading(false);
    }
  }

  return (
    <div className="px-10 md:px-2">
      <h2 className="font-bold text-2xl mb-2">Enter some more about listing</h2>
      <Formik
      initialValues={{ 
        type: '',
        profileImage:user?.imageUrl,
        username: user?.fullName
      }}
      onSubmit={(values) => (
        onSubmitHandler(values)
      )}
       >
        {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
      <form onSubmit={handleSubmit}>
        <div className="p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rent or Sell */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg text-slate-500 mb-2 font-medium">Rent or Sell</h2>
              <RadioGroup name='type' defaultValue="rent"
              onValueChange={(e) => values.type=e}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent" id="rent" />
                  <Label htmlFor="rent">Rent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sale" id="sale" />
                  <Label htmlFor="sale">Sale</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg text-slate-500 mb-2 font-medium">Property Type</h2>
              <Select name="propertyType"
              onValueChange={(e)=>values.propertyType=e}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single Family House">Single Family House</SelectItem>
                  <SelectItem value="Town House">Town House</SelectItem>
                  <SelectItem value="Condo">Condo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Multiple Fields Wrapper */}
            <div className="md:col-span-3 grid grid-cols-3 gap-6">
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="bedroom">Bedroom</Label>
                <Input type="number" id="bedroom" name="bedroom" placeholder="Ex. 2"
                defaultValue={listing?.bedroom}
                onChange={handleChange}
                 />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="bathroom">Bathroom</Label>
                <Input type="text" id="bathroom" name="bathroom" placeholder="Ex. 2"
                defaultValue={listing?.bathroom}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="builtIn">Built In(sq. ft)</Label>
                <Input type="number" id="builtIn" name="builtIn" placeholder="Ex. 5000"
                defaultValue={listing?.builtIn}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="parking">Parking</Label>
                <Input type="number" id="parking" name="parking" placeholder="Ex. 2"
                defaultValue={listing?.parking}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="lotSize">Lot Size</Label>
                <Input type="number" id="lotSize" name="lotSize" step="0.01" placeholder="Enter lot size in square feet"
                defaultValue={listing?.lotSize}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="area">Area (Sq.Ft)</Label>
                <Input type="number" id="area" name="area" step="0.01" placeholder="Ex.6000"
                defaultValue={listing?.area}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="price">Price ($)</Label>
                <Input type="number" id="price" name="price" step="0.01" placeholder="Ex. 40,000"
                defaultValue={listing?.price}
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="hoa">HOA (Per Month $)</Label>
                <Input type="number" id="hoa" name="hoa" step="0.01" placeholder="Ex. 100"
                defaultValue={listing?.hoa}
                onChange={handleChange} />
              </div>
              <div className="md:col-span-3 flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter description" 
                onChange={handleChange}
                defaultValue={listing?.description}>
                </Textarea>
              </div>
            </div>

            {/* File Upload */}
            <div className="md:col-span-3">
              <h2 className="text-lg text-slate-500 mb-2 font-medium">Upload Property Images</h2>
              <FileUpload 
              setImages={(value) => setImages(value)}
              imageList={listing?.listingImages}
               />
            </div>

            <div className="flex gap-7">
              <Button variant="outline" className='text-primary border-primary'>Save</Button>
              <Button disabled={loading}>
                {
                  loading? <Loader /> : 'Save and publish'
                }</Button>
            </div>
          </div>
        </div>
      </form>
      )}
      </Formik>
    </div>
  );
}

export default EditListing;
