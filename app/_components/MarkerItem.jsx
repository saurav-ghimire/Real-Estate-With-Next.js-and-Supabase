import { MarkerF, OverlayView } from "@react-google-maps/api";
import { useState } from "react";
import MarketListingItem from "./MarketListingItem";

function MarkerItem({item}) {
  const [selectedListing, setSelectedListing] = useState(null);

  const handleMarkerClick = () => {
    setSelectedListing(item);
  };

  return ( 
    <div>
      <MarkerF
        position={item.coordinates}
        onClick={handleMarkerClick}
        icon={{
          url:'/pin.png'
        }}
      >
        {
          selectedListing && 
          <OverlayView
            position={selectedListing.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarketListingItem
              closeHandler={() => setSelectedListing(null)}
               item={selectedListing} />
            </div>
          </OverlayView>
        }
      </MarkerF>
    </div>
  );
}

export default MarkerItem;
