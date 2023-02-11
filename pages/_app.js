import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/style.css'
import '../styles/responsive.css'
import '../styles/color.css'
import {CrowdsaleContextProvider} from '../context/CrowdsaleContext'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

// the chainId our app wants to be running on
// for our example the Polygon Mumbai Testnet
const desiredChainId = ChainId.BinanceSmartChainTestnet;


function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>

    <CrowdsaleContextProvider>
      <Component {...pageProps} />
    </CrowdsaleContextProvider>

    </ThirdwebProvider>

  )

  
}

export default MyApp
