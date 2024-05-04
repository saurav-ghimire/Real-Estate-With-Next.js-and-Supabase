import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { BathIcon, BedDouble, MapPin, Ruler } from "lucide-react";
import Image from "next/image";

function Details({ details }) {
  console.log(details)
  return ( 
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-4">${details?.price}</h2>
          <p className="text-gray-600 mb-4">{details?.address}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold ">Property Type:</span>
              <span className="ml-2">{details?.propertyType}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Bedrooms:</span>
              <span className="ml-2">{details?.bedroom}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Bathrooms:</span>
              <span className="ml-2">{details?.bathroom}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Area:</span>
              <span className="ml-2">{details?.area} sqft</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Built In:</span>
              <span className="ml-2">{details?.builtIn}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Parking:</span>
              <span className="ml-2">{details?.parking}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">Lot Size:</span>
              <span className="ml-2">{details?.lotSize}</span>
            </div>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <span className="text-lg font-bold">HOA:</span>
              <span className="ml-2">${details?.hoa}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{details?.description}</p>
          

          <div className="mt-5">
            <h2 className="text-4xl font-bold mb-4">Map</h2>
            <div>
            <GoogleMapSection 
            cordinates={details?.coordinates}
            listing={[details]}
             /> 
            </div>
          </div>

          <div className="flex mt-10 justify-between items-start bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                <Image src={details?.profileImage} height={16} width={16} alt="Profile" className="object-cover w-full h-full" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-bold">{details?.username}</h2>
                <p className="text-gray-600">{details?.createdBy}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Contact Agent</h2>
              
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
