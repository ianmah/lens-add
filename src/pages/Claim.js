import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import Card from '../components/Card'
import { HOSTNAME } from '../utils/constants'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const Container = styled.div`
    border-radius: 8px;
    text-align: center;
`

function Claim({ db, ...props }) {
    let params = useParams();
    const { wallet, provider } = useWallet()
    const [status, setStatus] = useState('')

    const genCode = async () => {
    }

    useEffect(() => {
      const validate = async () => {
        try {
          const docRef = doc(db, "codes", params.code)
          await updateDoc(docRef, {
            status: 'scanned'
          })
        } catch (e) {
          console.log(e.code)
          if (e.code === 'not-found') {
            setStatus(404)
          }
        }
      }

      validate()
    }, [])
    
    const handleClick = async () => {
      await genCode()
    }

    return <Container>
        Claim {params.code}
        <br/>
        {status === 404 && 'OOPS! LINK HAS EXPIRED'}
        <br/>
        {

        }
        <Button onClick={handleClick}>Submit</Button>
    </Container>
}

export default Claim