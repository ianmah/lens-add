import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import ApolloProvider from './components/Apollo'
import { useWallet } from './utils/wallet'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Home from './pages/Home'
import Wallet from './components/Wallet'
import Button from './components/Button'

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
                    <Wallet setProfile={setProfile} profile={profile}/>
                    <Routes>
                        <Route path='/' element={<Container><Home profile={profile} /></Container>}/>
                    </Routes>
                </ThemeProvider>
            </ApolloProvider>
    )
}

export default App
