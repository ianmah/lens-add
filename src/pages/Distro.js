import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import LensQR from '../components/LensQR'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;`

function Home({ profile, db, ...props }) {
    const { wallet, provider } = useWallet()
    
    const handleClick = async () => {

        try {
          const docRef = await addDoc(collection(db, "codes"), {});
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
    }

    return <Container>
        <LensQR link={"https://irisapp.xyz/"}/>
        <Button onClick={handleClick}>Refresh code</Button>
    </Container>
}

export default Home