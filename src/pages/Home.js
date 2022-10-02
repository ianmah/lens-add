import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

const Container = styled.div`
    border-radius: 8px;`

function Home({ profile, ...props }) {
    const { wallet, provider } = useWallet()
  

    return <Container>
        {wallet.signer && <Link to={'distro'}>
          <Button onClick={() => {}}>Generate Code</Button>
        </Link>
        }
    </Container>
}

export default Home