import Head from "next/head";

import Container from "../components/Container/Container";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HomeCard from "../components/HomeCard/HomeCard";

import coffeeStores from "../public/coffee-stores";
import { asyncHandler } from "../utils/async";
import axios from "axios";


export default function Home({ coffeeStores }){
  return (
    <Container>
      <Head>
        <title>Find coffee shops</title>
        <meta title="coffee shops"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <HomeBanner/>
      <div className="my-3">
        <h3 className="heading-secondary">Common coffee stores</h3>
      </div>
      <div className="home-cards">
        {coffeeStores.map(store => <HomeCard key={store.fsq_id} store={store}/>)}
      </div>

    </Container>
  );
}
//fsq34I0wfJWAGUomJDmGbd18OjQWv3Yn3MD2L8OmL4vYgSQ=
export async function getStaticProps(){
  const [res] = await asyncHandler(getCoffeeStores);
  return {
    props: {
      coffeeStores: res ? res.data.results : coffeeStores
    }
  };
}

async function getCoffeeStores(){
  return await axios.get("http://api.foursquare.com/v3/places/search", {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARES_API
    }, params: {
      query: "coffee shop",
      //near: "NYC",
      ll: "30.075082866742452,31.264988029829123",
      limit: 6
    } }
  );
}