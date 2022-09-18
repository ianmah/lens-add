import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { useLazyQuery, useMutation } from '@apollo/client'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RoundedButton } from '../components/Button'
import Card from '../components/Card'
import { CREATE_COLLECT_TYPED_DATA, SEARCH, GET_TIMELINE, GET_PUBLICATIONS } from '../utils/queries'

const Container = styled.div`
    border-radius: 8px;`

function Home({ profile, ...props }) {
    const { wallet, provider } = useWallet()
    
    return <Container>
        hi
    </Container>
}

export default Home