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

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
    color: grey;
`

function Home({ profile, setProfile, ...props }) {
    const { isConnected } = useAccount()
  
    return <Container>
        <Address/>
        {!isConnected && <Wallet setProfile={setProfile} profile={profile}/>}
        {isConnected &&
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link to={'distro'}>
            <Button onClick={() => {}}>Generate Code</Button>
            </Link>        
            <br/>
            <br/>
            <p>Generate a QR code that allows users to scan and join the Lens Whitelist</p>
        </>
        }
        
    </Container>
}

export default Home