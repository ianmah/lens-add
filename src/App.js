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
    padding: 1em
`

function App() {
    const { setAuthToken } = useWallet()
    const [profile, setProfile] = useState({})

    const handleLogout = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        window.location.reload()
    }
    

    return (
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
    )
}

export default App
