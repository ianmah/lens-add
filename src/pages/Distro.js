import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import LensQR from '../components/LensQR'
import { HOSTNAME } from '../utils/constants'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
`

function Home({ profile, db, ...props }) {
    const { wallet, provider } = useWallet()
    const [nextUrl, setNextUrl] = useState('')

    const genCode = async () => {
      try {
        const docRef = await addDoc(collection(db, "codes"), {})
        console.log("Document written with ID: ", docRef.id)
        const url = `${HOSTNAME}/scan/${docRef.id}`
        console.log(url)
        setNextUrl(url)
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    useEffect(() => {
      if (!nextUrl) {
        genCode()
      }
    })
    
    const handleClick = async () => {
      await genCode()
    }

    return <Container>
        
        <br/>
        <a href={nextUrl} target="_blank" rel="noreferrer">
          <LensQR link={nextUrl}/>
          {nextUrl}
        </a>
        <br/>
        <Button onClick={handleClick}>Refresh code</Button>
    </Container>
}

export default Home