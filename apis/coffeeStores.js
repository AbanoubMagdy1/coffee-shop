import axios from "axios";
import { getPhotoUrl } from "../utils/dataUtils";

export async function getCoffeeStores({ ll }){
  console.log(process.env.NEXT_PUBLIC_FOURSQUARES_API, ll);
  const res = await axios.get("http://api.foursquare.com/v3/places/search", {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARES_API,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }, params: {
      query: "coffee shop",
      ll,
      limit: 6,
      fields: "fsq_id,name"
    } }
  );

  const placesPhotos = await Promise.all(res.data.results.map(({ fsq_id }) => getPlacePhoto(fsq_id)));

  const stores = res.data.results.map((store, i) => ({
    ...store,
    imgUrl: getPhotoUrl(placesPhotos[i].data?.[0])
  }));

  return stores;
}

async function getPlacePhoto(fsq_id){
  return await axios.get(`https://api.foursquare.com/v3/places/${fsq_id}/photos`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARES_API
    }, params: {
      limit: 1
    }
  });
}

