import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import ApolloProvider from './components/Apollo'
import { useWallet } from './utils/wallet'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Home from './pages/Home'
import Distro from './pages/Distro'
import Claim from './pages/Claim'
import Button from './components/Button'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdzmM2zpA58lUsJZ2aO61oQLwrf28JPW4",
    authDomain: "irisxyz.firebaseapp.com",
    projectId: "irisxyz",
    storageBucket: "irisxyz.appspot.com",
    messagingSenderId: "712326880671",
    appId: "1:712326880671:web:9c351f81f091525ad9b1aa"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const Container = styled.div`
`

function App() {
  
    const { chains, provider } = configureChains(
        [chain.mainnet, chain.polygon],
        [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
        publicProvider()
        ]
    );
    
    const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        chains
    });
    
    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider
    })

  
    const { setAuthToken } = useWallet()
    const [profile, setProfile] = useState({})

    const handleLogout = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        window.location.reload()
    }
    

    return (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <ApolloProvider>
                <ThemeProvider>
                    <GlobalStyle />
                    {profile.id && <Button onClick={handleLogout}>Logout</Button>}
                    <Routes>
                        <Route path='/' element={<Container><Home profile={profile} /></Container>}/>
                        <Route path='/distro' element={<Container><Distro profile={profile} db={db} /></Container>}/>
                        <Route path='/claim/:code' element={<Container><Claim db={db} /></Container>}/>
                    </Routes>
                </ThemeProvider>
            </ApolloProvider>
          </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default App
