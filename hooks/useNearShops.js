import axios from "axios";
import { useState, useEffect } from "react";
import { asyncHandler } from "../utils/async";

async function getStoresRequest ({ ll }){
  return await axios.get("/api/stores", {
    params: {
      ll
    }
  });
}

export default function useNerShops(latLong){
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getStores(){
    setLoading(true);
    const [res] = await asyncHandler(getStoresRequest, { ll: latLong });

    setLoading(false);
    setStores(res?.data || []);
  }

  useEffect(function(){
    if(latLong) getStores();
  },[latLong]);

  return { loading, stores };
}