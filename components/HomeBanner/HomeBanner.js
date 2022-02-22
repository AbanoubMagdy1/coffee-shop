import React from "react";
import styles from "./HomeBanner.module.scss";

function HomeBanner() {
  console.log(styles);
  return (
    <section className={styles.banner}>
      <h1 className={styles.banner_title}>
        Coffee <span className={styles.title2}>Connisseur</span>
      </h1>

      <p className={styles.banner_text}>
          Here you can find you favourite coffee shops
      </p>

      <button className="btn btn-purple">View shops nearby</button>
    </section>
  );
}

export default HomeBanner;