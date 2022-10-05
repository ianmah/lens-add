import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import WalletIllustration from '../assets/illustration.png'
import bg from '../assets/bg.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url(${bg});
  background-repeat: repeat;
  min-height: 100vh;
`

const Header = styled.div`
  width: 80vw;
  margin-top: 18vh;
`

const H1 = styled.h1`
  color: #F5C3CC;
  span {
    color: white;
  }
  text-align: left;
`

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 10vh;
`

function Wallet({ ...props }) {
  const { address, isConnected } = useAccount()
  
  return <>
    <LoginContainer>
      { !isConnected && <>
        <Header>
          <H1><span>Share</span> and <span>collect</span> your unique code</H1>
        </Header>
        <img src={WalletIllustration} width='100%' style={{ position: 'absolute', top: 0, left: 0 }} alt='colorful pattern' />
        <ConnectButton />
      </> }
    </LoginContainer>
  </>
}

export default Wallet