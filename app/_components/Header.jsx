import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Image from "next/image";


function Header() {
  return ( 
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-200 bg-white'>
      <div className='flex gap-14 items-center'>
        <Image src='/logo.svg' height={150} width={150} alt='logo' />
        <ul className='hidden md:flex gap-5'>
          <li className='font-medium cursor-pointer transition-all ease-in-out hover:text-primary'>For Sale</li>
          <li className='font-medium cursor-pointer hover:text-primary'>For Rent</li>
          <li className='font-medium cursor-pointer hover:text-primary'>Agent Finder</li>
        </ul>
      </div>
      <div className='flex gap-2'>
        <Button className='flex gap-2 bg-primary'><PlusIcon className='w-5 m-0' /> Post Your Add</Button>
        
        <Button variant="outline">Login</Button>

      </div>
    </div>
   );
}

export default Header;