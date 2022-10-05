import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button, { SecondaryButton } from '../components/Button'
import LensQR from '../components/LensQR'
import Toast from '../components/Toast'
import { HOSTNAME } from '../utils/constants'
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'
import footer from '../assets/footer.svg'
import Spinner from '../assets/Spinner'
import Address from '../components/Address'
import { useAccount } from 'wagmi'
import { ADMIN_LIST } from '../utils/constants'
import header from '../assets/header.svg'

const Container = styled.div`
  text-align: center;
`

const H1 = styled.h1`
  font-size: 3em;
  margin: 0;
  padding-top: 10vh;
`

const P = styled.p`
  margin: 0;
  margin-bottom: 3em;
`

const ButtonContainer = styled.div`
  margin-top: 3em;
`

function Distro({ profile, db, ...props }) {
  const { address, isConnected } = useAccount()
    const [nextUrl, setNextUrl] = useState('')
    const [toastMsg, setToastMsg] = useState('')
    const [loading, setLoading] = useState(true)

    const genCode = async () => {
      try {
        const docRef = await addDoc(collection(db, "codes"), {
          status: 'unused',
          referrer: address,
        })
        // console.log("Document written with ID: ", docRef.id)
        const url = `${HOSTNAME}/claim/${docRef.id}`
        console.log(url)
        setNextUrl(url)
        setLoading(false)

        let unsubscribe;
        unsubscribe = onSnapshot(doc(db, "codes", docRef.id), (doc) => {
          const data = doc.data()
          console.log("Current data: ", data);
          if (data && data.status !== 'unused') {
            // unsub?
            unsubscribe()
            setLoading(true)
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
        setToastMsg('Copied to clipboard!')
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
      await genCode()
    }

    return <Container>
      {ADMIN_LIST.has(address) && <>
        <img src={header} style={{ width: '30vw', position: 'absolute', top: 0, left: '9vw' }} alt='decoration' />
        <Address/>
        <H1>SCAN NOW</H1>
        <P>to be added to the Lens Whitelist</P>
        <br/>
        <a href={nextUrl} target="_blank" rel="noreferrer">
          {loading ? <Spinner/> : <LensQR link={nextUrl}/>}
        </a>
        <ButtonContainer>
          <Button onClick={handleClick}>Refresh code</Button>
          <SecondaryButton onClick={handleShare}>Share code</SecondaryButton>
        </ButtonContainer>
        <Toast code={nextUrl} >
          {toastMsg}
        </Toast>
        <img src={footer} style={{ width: '95%', position: 'absolute', bottom: 0, left: 0 }} alt='plants growing from footer' />
      </>}
      {!ADMIN_LIST.has(address) && <>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>You do not currently have access</h1>
          <p>Please sign in with an admin address.</p>
          <Link to={'/'}>
            <Button>Go back</Button>
          </Link>
          </>
      }
    </Container>
}

export default Distro