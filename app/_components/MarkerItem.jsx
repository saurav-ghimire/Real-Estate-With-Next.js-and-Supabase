import { MarkerF } from "@react-google-maps/api";


function MarkerItem({item}) {
  console.log(item)
  return ( 
    <div>
      <MarkerF
      position={item.coordinates}
      icon={{
        url:'/pin.png'
      }}
      >

      </MarkerF>
    </div>
   );
}

export default MarkerItem;