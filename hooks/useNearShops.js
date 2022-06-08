import { useState, useEffect } from "react";
import { getCoffeeStores } from "../apis/coffeeStores";
import { asyncHandler } from "../utils/async";

export default function useNerShops(latLong){
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getStores(){
    setLoading(true);
    const [stores] = await asyncHandler(getCoffeeStores, { ll: latLong });
    setLoading(false);
    setStores(stores || []);
  }

  useEffect(function(){
    if(latLong) getStores();
  },[latLong]);

  return { loading, stores };
}