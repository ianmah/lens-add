import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button, { SecondaryButton } from '../components/Button'
import Card from '../components/Card'
import LensQR from '../components/LensQR'
import Toast from '../components/Toast'
import { HOSTNAME } from '../utils/constants'
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'
import footer from '../assets/footer.svg'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
`

const H1 = styled.h1`
  font-size: 3em;
  margin: 0;
`

const P = styled.p`
  margin: 0;
`

function Distro({ profile, db, ...props }) {
    const { wallet, provider } = useWallet()
    const [nextUrl, setNextUrl] = useState('')
    const [unsubs, setUnsubs] = useState({})
    const [toastMsg, setToastMsg] = useState('')

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

    const handleShare = async () => {
      navigator.clipboard.writeText(nextUrl).then(function() {
        console.log('Copying to clipboard was successful!');
        setToastMsg('Copied to clipboard!')
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
      await genCode()
    }

    return <Container>
        <Card>
          <H1>SCAN NOW</H1>
          <P>to be added to the Lens Whitelist</P>
        </Card>
        <br/>
        <a href={nextUrl} target="_blank" rel="noreferrer">
          <LensQR link={nextUrl}/>
        </a>
        <br/>
        <Button onClick={handleClick}>Refresh code</Button>
        <SecondaryButton onClick={handleShare}>Share code</SecondaryButton>
        <img src={footer} style={{ width: '95%', position: 'absolute', bottom: 0, left: 0 }} alt='plants growing from footer' />
        <Toast code={nextUrl} >
          {toastMsg}
        </Toast>
    </Container>
}

export default Distro