import Head from "next/head";

import Container from "../components/Container/Container";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HomeCard from "../components/HomeCard/HomeCard";
import Message from "../components/Message/Message";

import useLocation from "../hooks/useLocation";
import useNearShops from "../hooks/useNearShops";

import { asyncHandler } from "../utils/async";
import { getCoffeeStores } from "../apis/coffeeStores";
import { useStoresContext } from "../context/nearStoreContext";


export default function Home({ coffeeStores }){
  const { stores, loading, setLoading, setStores } = useStoresContext();
  const { getLocation, latLong, err } = useLocation();
  useNearShops({ latLong, setLoading, setStores });

  return (
    <Container>
      <Head>
        <title>Find coffee shops</title>
        <meta title="coffee shops"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <HomeBanner getLocation={getLocation} loading={loading}/>
      <div className="my-3">
        <h3 className="heading-secondary">San francisco coffee stores</h3>
      </div>
      {coffeeStores.length == 0 && <Message>No coffee shops found</Message>}

      <div className="home-cards">
        {coffeeStores.map(store => <HomeCard key={store.fsq_id} store={store}/>)}
      </div>
      <span id="nearby"></span>
      {err && <Message>{err}</Message>}
      {stores.length && <div className="my-3">
        <h3 className="heading-secondary">Nearby stores</h3>
      </div>
      }
      <div className="home-cards">
        {stores.map(store => <HomeCard key={store.fsq_id} store={store}/>)}
      </div>
    </Container>
  );
}

export async function getStaticProps(){
  const [stores] = await asyncHandler(getCoffeeStores, { ll: "37.76831609924992,-122.42819563159775" });
  return {
    props: {
      coffeeStores: stores ? stores : [],
    }
  };
}

