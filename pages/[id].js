import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Container from "../components/Container/Container";

import coffeeStores from "../public/coffee-stores";


export default function CoffeeStore({ store }){
  return (
    <Container>
      <Head>
        <title>Coffee store</title>
        <meta title="coffee shops"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Link href="/" passHref={true}>
        <a className="btn btn-transparent">Back</a>
      </Link>

      <div className="my-3">
        <h3 className="heading-secondary">{store.name}</h3>
      </div>

      <div className="coffee-page">
        <div className="coffee-page__img">
          <Image
            src={store.imgUrl}
            alt={store.name}
            layout="responsive"
            width={1}
            height={1}
          />
        </div>

        <div className="coffee-page__card glass">
          <p className="heading-tertiary">Address: {store.address}</p>
          <p className="heading-tertiary">Neighbourhood: {store.neighbourhood}</p>
          <a className="btn btn-purple mt-2" href={store.websiteUrl}>Visit store website</a>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps({ params }){
  return {
    props: {
      store: coffeeStores.find(store => store.id == params.id)
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: coffeeStores.map(store => ({ params: { id: String(store.id) } })),
    fallback: false
  };
}