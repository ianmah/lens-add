import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Wallet from '../components/Wallet'
import Address from '../components/Address'
import { useAccount } from 'wagmi'
import { ADMIN_LIST } from '../utils/constants'
import header from '../assets/header.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    min-height: 80vh;
`

const Wrapper = styled.div`
    padding: 1em;
`

function Home({ profile, setProfile, db, ...props }) {
    const { address, isConnected } = useAccount()
    return <>
    <img src={header} style={{ width: '30vw', position: 'absolute', top: 0, left: '9vw' }} alt='decoration' />
    <Address/>
    <Container>
        {!isConnected && <Wallet setProfile={setProfile} profile={profile}/>}
        {isConnected && ADMIN_LIST.has(address) && 
        <>
            <h1>Dashboard</h1>
            <Link to={'distro'}>
                <Button onClick={() => {}}>Generate Code</Button>
            </Link>
            <p style={{ color: 'grey', marginTop: '1em' }} >Generate a QR code that allows users to scan and join the Lens Whitelist</p>
        </>
        }
        {isConnected && !ADMIN_LIST.has(address) && <Wrapper>
            <h1>You do not currently have access</h1>
            <p>Please sign in with an admin address.</p>
            <p style={{ color: 'grey' }} >If you need to swap wallets, click your wallet address to sign out.</p>
            </Wrapper>
        }
        
    </Container>
    </>
}

export default Home