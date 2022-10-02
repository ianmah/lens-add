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
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
`

function Distro({ profile, db, ...props }) {
    const { wallet, provider } = useWallet()
    const [nextUrl, setNextUrl] = useState('')
    const [unsubs, setUnsubs] = useState({})

    const genCode = async () => {
      try {
        const docRef = await addDoc(collection(db, "codes"), {
          status: 'unused'
        })
        // console.log("Document written with ID: ", docRef.id)
        const url = `${HOSTNAME}/claim/${docRef.id}`
        console.log(url)
        setNextUrl(url)

        let unsubscribe;
        unsubscribe = onSnapshot(doc(db, "codes", docRef.id), (doc) => {
          const data = doc.data()
          console.log("Current data: ", data);
          if (data && data.status !== 'unused') {
            // unsub?
            unsubscribe()
            genCode()
          }          
        })

      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    useEffect(() => {
      if (!nextUrl) {
        genCode()
      }
    }, [])
    
    const handleClick = async () => {
      // unsub?
      await genCode()
    }

    return <Container>
        <br/>
        <a href={nextUrl} target="_blank" rel="noreferrer">
          <LensQR link={nextUrl}/>
        </a>
        <br/>
        <Button onClick={handleClick}>Refresh code</Button>
    </Container>
}

export default Distro