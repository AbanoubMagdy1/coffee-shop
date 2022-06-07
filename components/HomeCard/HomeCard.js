import React from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./HomeCard.module.scss";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

async function getPlacePhoto(url){
  console.log(process.env.FOURSQUARES_API);
  return await axios.get(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARES_API
    }, params: {
      limit: 1
    }
  });
}

function getPhotoUrl(data){
  if(data){
    return data.prefix + "original"+ data.suffix;
  }
}

function HomeCard({ store }) {
  const { data } = useSWR(`https://api.foursquare.com/v3/places/${store.fsq_id}/photos`, getPlacePhoto);
  const imgUrl = getPhotoUrl(data?.data?.[0]) || "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

  return (
    <Link href={`/${store.id}`} passHref={true}>
      <a>
        <div className={clsx("glass", styles.homeCard)}>
          <Image
            src={imgUrl}
            alt={store.name}
            layout="responsive"
            width={1}
            height={1}
          />
          <p className={clsx(styles.homeCardName)}>{store.name}</p>
        </div>
      </a>
    </Link>

  );
}

export default HomeCard;