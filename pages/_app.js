import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer/>
    </>
  );
}

export default MyApp;
