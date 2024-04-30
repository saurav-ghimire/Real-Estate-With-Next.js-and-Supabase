import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bath, BedDouble, CarFront, HomeIcon } from "lucide-react";

function Filter({setBathCount,setBedCount,setHomeType,setParkingCount}) {
  return (
    <div className="px-3 py-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2"><BedDouble className="text-primary h-5 w-5" /> 2+</h2>
          </SelectItem>
          <SelectItem value="3">
          <h2 className="flex gap-2"><BedDouble className="text-primary h-5 w-5" /> 3+</h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2"><BedDouble className="text-primary h-5 w-5" /> 4+</h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2"><BedDouble className="text-primary h-5 w-5" /> 5+</h2>
          </SelectItem>
        </SelectContent>
      </Select>
      
      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2"><Bath className="text-primary h-5 w-5" /> 2+</h2>
          </SelectItem>
          <SelectItem value="3">
          <h2 className="flex gap-2"><Bath className="text-primary h-5 w-5" /> 3+</h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2"><Bath className="text-primary h-5 w-5" /> 4+</h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2"><Bath className="text-primary h-5 w-5" /> 5+</h2>
          </SelectItem>
        </SelectContent>
      </Select>


      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2"><CarFront className="text-primary h-5 w-5" /> 2+</h2>
          </SelectItem>
          <SelectItem value="3">
          <h2 className="flex gap-2"><CarFront className="text-primary h-5 w-5" /> 3+</h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setHomeType}>
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Single Family Home">
            <h2 className="flex gap-2 "><HomeIcon className="text-primary h-5 w-5"/> Single Family Home</h2>
          </SelectItem>
          <SelectItem value="Town House">
          <h2 className="flex gap-2 "><HomeIcon className="text-primary h-5 w-5"/> Town House</h2>
          </SelectItem>
          <SelectItem value="Condo">
          <h2 className="flex gap-2 "><HomeIcon className="text-primary h-5 w-5"/> Condo</h2>
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}

export default Filter;