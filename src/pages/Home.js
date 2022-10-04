import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Wallet from '../components/Wallet'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
    color: grey;
`

function Home({ profile, setProfile, ...props }) {
    const { wallet, provider } = useWallet()
  
    return <Container>
        {!wallet.signer && <Wallet setProfile={setProfile} profile={profile}/>}
        {wallet.signer &&
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