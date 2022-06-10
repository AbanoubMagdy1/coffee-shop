import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

import { IoIosCafe } from "react-icons/io";
import { MdPlace } from "react-icons/md";


import Container from "../components/Container/Container";
import Message from "../components/Message/Message";

import { extractErrorMessage } from "../utils/async";
import { getPhotoUrl } from "../utils/dataUtils";



async function getStoreDetails({ fsq_id }){
  return await axios.get(`https://api.foursquare.com/v3/places/${fsq_id}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARES_API,
    }, params: {
      fields: "name,location,photos,website"
    }
  });
}

export default function CoffeeStore(){
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR({ fsq_id: id }, getStoreDetails);

  if(!error && !data) return <h3>Loading...</h3>;

  if(error) return (<Container>
    <Message>{extractErrorMessage(error)}</Message>
  </Container>);

  const store = data.data;
  console.log(store);
  const imgUrl = getPhotoUrl(store?.photos?.[0]);

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
        <h3 className="heading-secondary">{data.name}</h3>
      </div>

      <div className="coffee-page">
        <div className="coffee-page__img">
          <Image
            src={imgUrl}
            alt={data.name}
            layout="responsive"
            width={1}
            height={1}
          />
        </div>

        <div className="coffee-page__card glass">
          <p className="heading-tertiary center-p">
            <IoIosCafe className="icon"/> &nbsp;{store.name}
          </p>
          <p className="heading-tertiary center-p">
            <MdPlace className="icon"/> &nbsp;{store.location.address}
          </p>
          { store.website && <a className="btn btn-purple mt-2" href={store.website}>Visit store website</a>}
        </div>
      </div>
    </Container>
  );
}
