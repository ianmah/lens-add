import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Button from '../components/Button'
import Card from '../components/Card'
import { increment, doc, getDoc, updateDoc } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;
    margin-top: 1em;
    padding: 1em;
`

const Input = styled.input`
  border: #e2e4e8 1px solid;
  width: 100%;
  border-radius: 4px;
`
const H1 = styled.h1`
  font-size: 3em;
  margin: 0;
`

const Label = styled.p`
  margin-top: 0.6em;
`

const P = styled.p`
  margin: 0;
`

const Error = styled.span`
  color: #FF6161;
  font-size: 0.9em;
`

function Claim({ db, ...props }) {
    let params = useParams();
    const { wallet, provider } = useWallet()
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
        OOPS! LINK HAS EXPIRED
        Please ask for a new code
        </>}
        {status === 200 && <>
          <br/>
          <br/>
          <br/>
          <h1>Congratulations</h1>
          Stay tuned to recieve an email about your whitelist details
        </>}
        {status === 0 && <>
          <Card>
            <H1>LFG</H1>
            <P>Enter your info to join the Lens Whitelist</P>
          </Card>
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
            <Input {...register('address', { required: true, pattern: /(.*\.eth)|(0x[0-9a-fA-F]{40})/ })} />
            {errors.address && <Error>Please enter a valid address.</Error>}
            <br/>

            <Label>Email</Label>
            <Input {...register('email', { required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ })} />
            {errors.email && <Error>Please enter a valid email.</Error>}
            <br/>

            <Button type="submit">Submit</Button>
          </form>
        </>
        }
        <br/>
    </Container>
}

export default Claim