import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Wallet from '../components/Wallet'
import Address from '../components/Address'
import { useAccount } from 'wagmi'
import { ADMIN_LIST } from '../utils/constants'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    text-align: center;
    min-height: 80vh;
`

function Home({ profile, setProfile, ...props }) {
    const { address, isConnected } = useAccount()
  
    return <>
    <Address/>
    <Container>
        {!isConnected && <Wallet setProfile={setProfile} profile={profile}/>}
        {isConnected && ADMIN_LIST.has(address) && 
        <>
            <Link to={'distro'}>
                <Button onClick={() => {}}>Generate Code</Button>
            </Link>
            <p style={{ color: 'grey', marginTop: '1em' }} >Generate a QR code that allows users to scan and join the Lens Whitelist</p>
        </>
        }
        {!ADMIN_LIST.has(address) && <>
            <h1>You do not currently have access</h1>
            <p>Please sign in with an admin address.</p>
            <p style={{ color: 'grey' }} >If you need to swap wallets, click your wallet address to sign out.</p>
            </>
        }
        
    </Container>
    </>
}

export default Home