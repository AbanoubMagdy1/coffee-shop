import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import "../styles/globals.scss";

import NearStoresProvider from "../context/nearStoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <NearStoresProvider>
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer/>
    </NearStoresProvider>
  );
}

export default MyApp;
