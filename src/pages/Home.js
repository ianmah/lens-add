import { useEffect, useState } from 'react'
import { useWallet } from '../utils/wallet'
import { useLazyQuery, useMutation } from '@apollo/client'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { PROXY_ACTION_MUTATION } from '../utils/queries'

const Container = styled.div`
    border-radius: 8px;`

function Home({ profile, ...props }) {
    const { wallet, provider } = useWallet()

    const onCompleted = () => {
        console.log('Followed successfully!')
      };

    const onError = (err) => {
        console.log(err)
    }

    const [createFollowProxyAction, { loading: proxyActionLoading }] = useMutation(PROXY_ACTION_MUTATION, {
        onCompleted,
        onError,
    });
    
    const handleClick = () => {
        createFollowProxyAction({
            variables: {
              request: {
                follow: {
                  freeFollow: {
                    profileId: '0x5b' // TODO: Make not hardcodedd
                  }
                }
              }
            }
          });
    }

    return <Container>
        <Button onClick={handleClick}>Follow some dude</Button>
        hi
    </Container>
}

export default Home