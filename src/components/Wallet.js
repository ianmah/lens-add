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
  width: 100%;
`

const Header = styled.div`
  width: 80vw;
  margin-top: 18vh;
`

const H1 = styled.h1`
  text-align: left;
`

const ButtonArea = styled.div`
  position: absolute;
  bottom: 10vh;
`

function Wallet({ ...props }) {
  const { isConnected } = useAccount()
  
  return <>
    <LoginContainer>
      { !isConnected && <>
        <Header>
          <H1>GROW THE LENSVERSE BY SHARING UNIQUE QR CODES</H1>
        </Header>
        <img src={WalletIllustration} width='100%' style={{ position: 'absolute', top: 0, left: 0 }} alt='colorful pattern' />
        <ButtonArea>
          <ConnectButton label="Connect your wallet" />
        </ButtonArea>
      </> }
    </LoginContainer>
  </>
}

export default Wallet