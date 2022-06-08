import { useState } from "react";
import { extractErrorMessage } from "../utils/async";

export default function useLocation(){
  const [latLong, setLatLong] = useState("");
  const [err, setError] = useState("");

  function successCallback(position){
    const { latitude, longitude } = position.coords;
    setLatLong(`${latitude.toFixed(14)},${longitude.toFixed(14)}`);
  }

  function errorCallback(err){
    setError(extractErrorMessage(err));
  }

  function getLocation(){
    if(!navigator.geolocation){
      setError("Your browser doesn't support locations");
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }

  return { getLocation, latLong, err };
}