import Image from "next/image";
import { Button } from "@/components/ui/button"
import ListingMapViews from "./_components/ListingMapViews";

export default function Home() {
  return (
    <div className="p-0 md:p-10">
      <ListingMapViews type="sell" />
    </div>
  );
}
