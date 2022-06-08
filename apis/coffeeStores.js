import axios from "axios";

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

function getPhotoUrl(data){
  if(data){
    return data.prefix + "original"+ data.suffix;
  }
  return "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
}