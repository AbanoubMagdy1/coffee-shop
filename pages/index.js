import Head from "next/head";

import Container from "../components/Container/Container";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HomeCard from "../components/HomeCard/HomeCard";
import Message from "../components/Message/Message";

import { asyncHandler } from "../utils/async";
import { getCoffeeStores } from "../apis/coffeeStores";


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
        <h3 className="heading-secondary">Cairo coffee stores</h3>
      </div>
      {coffeeStores.length == 0 && <Message>No coffee shops found</Message>}

      <div className="home-cards">
        {coffeeStores.map(store => <HomeCard key={store.fsq_id} store={store}/>)}
      </div>

    </Container>
  );
}

export async function getStaticProps(){
  const [stores] = await asyncHandler(getCoffeeStores, { ll: "30.075082866742452,31.264988029829123" });
  return {
    props: {
      coffeeStores: stores ? stores : [],
    }
  };
}

