import '../styles/globals.css'
import {StateProvider} from "../components/state/AppContext";

function MyApp({ Component, pageProps }) {
  return (
      <StateProvider>
        {/*  WRAP THE WHOLE APP TO PROVIDE STATE*/}
      <Component {...pageProps} />
      </StateProvider>
  )
}
export default MyApp
