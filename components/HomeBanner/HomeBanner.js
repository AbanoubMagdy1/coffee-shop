import React from "react";
import Image from "next/image";
import styles from "./HomeBanner.module.scss";

function HomeBanner() {
  console.log(styles);
  return (
    <section className={styles.banner}>
      <div className={styles.background}>
        <Image
          src="/home-background.png"
          alt="home background"
          layout="fill"
        />
      </div>
      <div className={styles.main}>
        <h1 className={styles.banner_title}>
          <span className={styles.title1}>Coffee</span>
        &nbsp;
          <span className={styles.title2}>Connisseur</span>
        </h1>

        <p className={styles.banner_text}>
          Here you can find you favourite coffee shops
        </p>

        <button className={`btn btn-purple ${styles.btn}`}>View shops nearby</button>
      </div>
    </section>
  );
}

export default HomeBanner;