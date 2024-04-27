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
import { useEffect } from "react"
import { toast } from "sonner"

function EditListing({params}) {
  const {user} = useUser();
  const router = useRouter();
  useEffect(() => {
    user&&verifyUserRecord();
  },[user]);

  const verifyUserRecord = async() => {
    const {data, error} = await supabase
    .from('listing')
    .select('*')
    .eq('createdBy', user?.primaryEmailAddress.emailAddress)
    .eq('id', params.id);
    if(data?.length <= 0){
      router.replace('/');
    }
    if(error){
      console.log(error)
    }
  }

  const onSubmitHandler = async (formValue) => {
    
    const { data, error } = await supabase
    .from('listing')
    .update(formValue)
    .eq('id', params.id)
    .select()
            
    if(data){
      console.log(data);
      toast('Address Updated Successfully');
    }
  }

  return (
    <div className="px-10 md:px-2">
      <h2 className="font-bold text-2xl mb-2">Enter some more about listing</h2>
      <Formik
      initialValues={{ type: ''}}
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
                onChange={handleChange}
                 />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="bathroom">Bathroom</Label>
                <Input type="text" id="bathroom" name="bathroom" placeholder="Ex. 2"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="builtIn">Built In(sq. ft)</Label>
                <Input type="number" id="builtIn" name="builtIn" placeholder="Ex. 5000"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="parking">Parking</Label>
                <Input type="number" id="parking" name="parking" placeholder="Ex. 2"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="lotSize">Lot Size</Label>
                <Input type="number" id="lotSize" name="lotSize" step="0.01" placeholder="Enter lot size in square feet"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="area">Area (Sq.Ft)</Label>
                <Input type="number" id="area" name="area" step="0.01" placeholder="Ex.6000"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="price">Price ($)</Label>
                <Input type="number" id="price" name="price" step="0.01" placeholder="Ex. 40,000"
                onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="hoa">HOA (Per Month $)</Label>
                <Input type="number" id="hoa" name="hoa" step="0.01" placeholder="Ex. 100"
                onChange={handleChange} />
              </div>
              <div className="md:col-span-3 flex flex-col">
                <Label className='text-lg text-slate-500 mb-2 font-medium' htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter description" onChange={handleChange}></Textarea>
              </div>
            </div>

            <div className="flex gap-7">
              <Button type='button' variant="outline" className='text-primary border-primary'>Save</Button>
              <Button type='button'>Save and publish</Button>
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
