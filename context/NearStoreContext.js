import React, { useState, createContext, useContext } from "react";

const NearStoresContext = createContext();

function NearStoresProvider({ children }){
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  return <NearStoresContext.Provider value={{ stores, setStores, loading, setLoading }}>
    {children}
  </NearStoresContext.Provider>;
}

export default NearStoresProvider;

export function useStoresContext(){
  return useContext(NearStoresContext);
}