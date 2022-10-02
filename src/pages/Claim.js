import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Button from '../components/Button'
import Card from '../components/Card'
import { HOSTNAME } from '../utils/constants'
import { increment, doc, getDoc, updateDoc } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
`

function Claim({ db, ...props }) {
    let params = useParams();
    const { wallet, provider } = useWallet()
    const [status, setStatus] = useState('')
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
        {status === 404 ? <>
        OOPS! LINK HAS EXPIRED
        Please ask for a new code
        </> : <>
          <form onSubmit={handleSubmit(async data => {
              console.log(data)
              const docRef = doc(db, "codes", params.code)
              await updateDoc(docRef, 
                {count: increment(1)},
              )
            })}>

            First Name
            <br/>
            <input {...register('firstName', { required: true })} />
            <br/>
            <br/>

            Last Name
            <br/>
            <input {...register('lastName')} />
            <br/>
            {errors.firstName && <p>First name is required.</p>}
            <br/>

            Wallet Address
            <br/>
            <input {...register('address', { required: true, pattern: /(.*\.eth)|(0x[0-9a-fA-F]{40})/ })} />
            <br/>
            {errors.address && <p>Please enter a valid address.</p>}
            <br/>

            Email
            <br/>
            <input {...register('email', { required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ })} />
            <br/>
            {errors.email && <p>Please enter a valid email.</p>}
            <br/>

            <Button type="submit">Submit</Button>
          </form>
        </>
        }
        <br/>
    </Container>
}

export default Claim