import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Button from '../components/Button'
import Card from '../components/Card'
import { increment, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import Lensie from '../assets/lensie.svg'
import sad from '../assets/sad.svg'
import WalletIllustration from '../assets/illustration.png'

const Container = styled.div`
    margin-top: 4em;
    border-radius: 8px;
    margin-top: 1em;
    padding: 1em;
    max-width: 700px;
    margin: auto;
    position: relative;
`

const Input = styled.input`
  border: #D9D9D9 1px solid;
  color: white;
  width: 95%;
  border-radius: 4px;
  padding: 0.3em 0.5em;
  font-size: 16px;
  font-family: ${p => p.theme.font};
  background: ${p => p.theme.background};
`
const H1 = styled.h1`
  font-size: 2em;
  margin: 0;
`

const Label = styled.p`
  margin-top: 0.6em;
`

const P = styled.p`
  margin: 0;
`

const Info = styled.p`
  color: grey;
  font-size: 0.8em;
`

const Error = styled.span`
  color: #FF6161;
  font-size: 0.9em;
`

const StyledButton = styled(Button)`
`

function Claim({ db, ...props }) {
    let params = useParams();
    const [status, setStatus] = useState(0)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      const validate = async () => {
        try {
          const docRef = doc(db, "codes", params.code)
          await updateDoc(docRef, {
            status: 'scanned'
          })
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.count >= 1) {
              setStatus(404)
            }
          } else {
            // doc.data() will be undefined in this case
            setStatus(404)
          }
        } catch (e) {
          console.log(e.code)
          if (e.code === 'not-found') {
            setStatus(404)
          }
        }
      }

      validate()
    }, [])
    
    return <Container>
        {(status === 404 || status === 403) && <>
          <br/>
          <br/>
          <br/>
          <div style={{ textAlign: 'center' }}>
            <H1>OOPS! LINK HAS EXPIRED</H1>
            Please ask for a new code
            <br/>
            <br/>
            <br/>
            <img src={sad} alt='sad lens' />
          </div>
        </>}
        {status === 200 && <>
          <br/>
          <br/>
          <br/>
          <img src={WalletIllustration} width='100%' style={{ position: 'absolute', top: 0, left: 0 }} alt='colorful pattern' />
          <h1>Congratulations</h1>
          Your details have been submitted! <br/>
          You will receive an email within 48 hours with your whitelist details.
        </>}
        {status === 0 && <>
          <br/>
          <H1>WHITELIST SIGN UP</H1>
          <P>Enter your info to join the Lens Whitelist</P>
          <br/>
          <br/>
          <form onSubmit={handleSubmit(async data => {
              console.log(data)
              const docRef = doc(db, "codes", params.code)
              const docSnap = await getDoc(docRef)
              const docData = docSnap.data()
              if (docData && docData.count >= 3) {
                setStatus(403)
                return;
              }

              await updateDoc(docRef, 
                {count: increment(1)},
              )

              const { firstName, lastName, walletAddress, email } = data
              await setDoc(doc(db, "forms", data.walletAddress), {
                firstName,
                lastName,
                walletAddress,
                email,
                code: params.code,
                referrer: docData.referrer,
              });

              setStatus(200)
            })}>

            <Label>First Name</Label>
            <Input {...register('firstName', { required: true })} />
            <br/>

            <Label>Last Name</Label>
            <Input {...register('lastName')} />
            {errors.firstName && <Error>First name is required.</Error>}
            <br/>

            <Label>Wallet Address</Label>
            <Input {...register('walletAddress', { required: true, pattern: /(.*\.eth)|(0x[0-9a-fA-F]{40})/ })} />
            {errors.walletAddress && <Error>Please enter a valid address.</Error>}
            <br/>

            <Label>Email</Label>
            <Input {...register('email', { required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ })} />
            {errors.email && <Error>Please enter a valid email.</Error>}
            <Info>Don???t worry, we will only use this to send you notifications about your Lens whitelist. Never spam. </Info>
            <br/>
            <br/>
            
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img src={Lensie} style={{ height: '7em', marginLeft: '1.6em' }} alt={'lens mascot'} />
            </div>

            <StyledButton type="submit">Submit</StyledButton>
          </form>
        </>
        }
        <br/>
    </Container>
}

export default Claim