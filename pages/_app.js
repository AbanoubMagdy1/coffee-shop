import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer/>
    </>
  )
}

export default MyApp
