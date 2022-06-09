import axios from "axios";
import { useEffect } from "react";
import { asyncHandler } from "../utils/async";

async function getStoresRequest ({ ll }){
  return await axios.get("/api/stores", {
    params: {
      ll
    }
  });
}

export default function useNearShops({ latLong, setLoading, setStores }){
  async function getStores(){
    setLoading(true);
    const [res] = await asyncHandler(getStoresRequest, { ll: latLong });
    location.href = "#nearby";
    setLoading(false);
    setStores(res?.data || []);
  }

  useEffect(function(){
    if(latLong) getStores();
  },[latLong]);
}