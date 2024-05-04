"use client"
import { UserButton, UserProfile } from "@clerk/nextjs";
import { BuildingIcon } from "lucide-react";
import MyListing from "../_component/MyListing";


function User() {
  return ( 
  <div className="my-6 md:px-10 lg:px-32">
    <h2 className="font-bold text-2xl py-4">Profile</h2>
    <UserProfile>
      <UserButton.UserProfilePage
      label="My Listing"
      labelIcon={<BuildingIcon className="h-5 w-5" />}
      url="my-listing"
      >
        <MyListing />
      </UserButton.UserProfilePage>
    </UserProfile>
  </div>
 );
}

export default User;