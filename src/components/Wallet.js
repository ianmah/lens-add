import React, { useEffect } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import styled from 'styled-components'
import { Contract, providers, utils } from 'ethers'
import { toHex } from '../utils/index'
import { CHAIN } from '../utils/constants'
import { useLazyQuery } from '@apollo/client'
import { GET_PROFILES } from '../utils/queries'
import LensHub from '../abi/LensHub.json'
import { useWallet } from '../utils/wallet'
import Login from './Login'
import Button from './Button'
import WalletIllustration from '../assets/illustration.png'
import bg from '../assets/bg.png'

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

function Wallet({ setProfile = () => {}, ...props }) {
const { wallet, setWallet, setLensHub, authToken, setProvider } = useWallet()
  const [getProfiles, profiles] = useLazyQuery(GET_PROFILES)

  const providerOptions = {
    // coinbasewallet: {
    //   package: CoinbaseWalletSDK, // Required
    //   options: {
    //     appName: "iris", // Required
    //     infuraId: "6a436461eae543349fa0de6bc4152fb9", // Required
    //     rpc: "", // Optional if `infuraId` is provided; otherwise it's required
    //     chainId: 137, // Optional. It defaults to 1 if not provided
    //     darkMode: false // Optional. Use dark theme, defaults to false
    //   }
    // },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "6a436461eae543349fa0de6bc4152fb9" // required
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, 
    providerOptions // required
  });

  const connectWallet = async () => {
    let instance;
    let provider;

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    try {
      instance = await web3Modal.connect();
      provider = new ethers.providers.Web3Provider(instance)
      await provider.send("eth_requestAccounts", []);
    } catch (e) {
      console.error(e)
      return;
    }
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    const contractAddr = CHAIN === 'polygon' ? '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d' : '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
    const contract = new ethers.Contract(contractAddr, LensHub, signer)
    setLensHub(contract)
  
    provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance)
      // console.log({balanceInEth})
      setWallet({...wallet, signer, address, balanceInEth})
    })

    const switchNetwork = async () => {
      const chainId = CHAIN === 'polygon' ? toHex(137) : toHex(80001)
      try {
        await provider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          const network = CHAIN === 'polygon' ? {
            chainId: chainId,
            chainName: "Polygon",
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          } :
          {
            chainId: chainId,
            chainName: "Polygon Mumbai",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          }
          try {
            await provider.provider.request({
              method: "wallet_addEthereumChain",
              params: [network],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    };

    switchNetwork()
  }

  
  useEffect(() => {
    if (!authToken) return;
    if (!wallet.address) return;
    // console.log("wallet", wallet)
    getProfiles({
      variables: {
        request: {
          // profileIds?: string[];
          ownedBy: [wallet.address]
          // handles?: string[];
          // whoMirroredPublicationId?: string;
        },
      },
     })

  }, [wallet.address, authToken])

  // hook to automatically connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
  }}, [])

  useEffect(() => {
    if (!authToken || !wallet.address) return;

    getProfiles({
      variables: {
        request: {
          // profileIds?: string[];
          ownedBy: wallet.address
          // handles?: string[];
          // whoMirroredPublicationId?: string;
        },
      },
     })

  }, [authToken, wallet.address])

  useEffect(() => {
    if (!profiles.data) return
    console.log(profiles.data.profiles.items[0])

    setProfile(profiles.data.profiles.items[0])

  }, [profiles.data])


  // useEffect(() => {
  //   connectWallet()
  // }, [])
  
  return <>
    <LoginContainer>
      { !wallet.signer && <>
        <Header>
          <H1><span>Share</span> and <span>collect</span> your unique code</H1>
        </Header>
        <img src={WalletIllustration} width='100%' style={{ position: 'absolute', top: 0, left: 0 }} alt='colorful pattern' />
        <StyledButton onClick={connectWallet} >Connect your wallet</StyledButton>
      </> }
    </LoginContainer>
  </>
}

export default Wallet