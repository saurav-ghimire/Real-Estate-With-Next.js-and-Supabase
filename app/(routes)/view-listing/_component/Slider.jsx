import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

function Slider({imageList}) {
  return ( <div className="mt-5">
    {
      imageList ?
    <Carousel>
    <CarouselContent>
      {
        imageList && imageList.map((item, index)=>(
          <CarouselItem>
            <Image src={item.url} width={900} height={300}
            className="rounded-xl object-cover h-[360px] w-full"
             />
          </CarouselItem>
        ))
      }
      

    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  : <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg">

  </div>
}
  </div> );
}

export default Slider;