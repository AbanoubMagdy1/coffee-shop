import React from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./HomeCard.module.scss";


function HomeCard({ store }) {
  console.log(store);
  return (
    <div className={clsx("glass", styles.homeCard)}>
      <Image
        src={store.imgUrl}
        alt={store.name}
        layout="responsive"
        width={1}
        height={1}
      />
      <p className={clsx(styles.homeCardName)}>{store.name}</p>
    </div>
  );
}

export default HomeCard;