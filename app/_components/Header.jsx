"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Header() {
  const path = usePathname();
  
  const {isSignedIn,user} = useUser();

  console.log(user);
  
  return ( 
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-50 bg-white'>
      <div className='flex gap-14 items-center'>
        <Image src='/logo.svg' height={150} width={150} alt='logo' />
        <ul className='hidden md:flex gap-5'>
        <Link href={'/'}><li className={`font-medium cursor-pointer transition-all ease-in-out hover:text-primary ${path == '/'&& 'text-primary'}`}>For Sell</li></Link>
        <Link href={'/'}> <li className='font-medium cursor-pointer hover:text-primary'>For Rent</li></Link>
        <Link href={'/'}><li className='font-medium cursor-pointer hover:text-primary'>Agent Finder</li></Link>
        </ul>
      </div>
      <div className='flex gap-2'>
        <Link href={'/add-new-listing'}><Button className='flex gap-2 bg-primary'><PlusIcon className='w-5 m-0' /> Post Your Add</Button></Link>
        {
          isSignedIn ?
          <UserButton /> :
          <Link href={'/sign-in'}><Button variant="outline">Login</Button></Link>
        }
        

      </div>
    </div>
   );
}

export default Header;