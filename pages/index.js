import Head from "next/head";

import Container from "../components/Container/Container";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HomeCard from "../components/HomeCard/HomeCard";

import coffeeStores from "../public/coffee-stores";


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
        {coffeeStores.map(store => <HomeCard key={store.id} store={store}/>)}
      </div>

    </Container>
  );
}

export async function getStaticProps(){
  return {
    props: {
      coffeeStores
    }
  };
}