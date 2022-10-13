import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Wallet from '../components/Wallet'
import Address from '../components/Address'
import { useAccount } from 'wagmi'
import { ADMIN_LIST } from '../utils/constants'
import { collection, getDocs } from 'firebase/firestore'
import { CSVLink } from 'react-csv'
import header from '../assets/header.svg'
import { providers } from 'ethers'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    min-height: 80vh;
`

const Wrapper = styled.div`
    padding: 1em;
`

function Csv({ profile, setProfile, db, ...props }) {
    const { address, isConnected } = useAccount()
    const [csvData, setCsvData] = useState([])

    const provider = new providers.AlchemyProvider(null, process.env.ALCHEMY_ID)

    const generateCSV = async () => {
        const querySnapshot = await getDocs(collection(db, "forms"))
        const newData = [
            ['First Name', 'Last Name', 'Wallet', 'Email', 'Referrer', 'Invite Code' ]
        ]
        querySnapshot.forEach(async (doc) => {
            const { firstName, lastName, walletAddress, email, referrer, code } = doc.data()
            let address;
            if (walletAddress.includes('.eth')) {
                address = await provider.resolveName(walletAddress);
                console.log(address)
            }
            newData.push([firstName, lastName, address || walletAddress, email, referrer, code ])
        })
        setCsvData(newData)
    }
    return <>
    <img src={header} style={{ width: '30vw', position: 'absolute', top: 0, left: '9vw' }} alt='decoration' />
    <Address/>
    <Container>
        {!isConnected && <Wallet setProfile={setProfile} profile={profile}/>}
        {isConnected && ADMIN_LIST.has(address) && 
        <>
            <h1>Dashboard</h1>
            <Button onClick={() => generateCSV()}>Generate CSV</Button>
            <br/>
            <br/>
            { csvData[0] && <CSVLink data={csvData} >Download CSV</CSVLink>}
        </>
        }
        {isConnected && !ADMIN_LIST.has(address) && <Wrapper>
            <h1>You do not currently have access</h1>
            <p>Please sign in with an admin address.</p>
            <p style={{ color: 'grey' }} >If you need to swap wallets, click your wallet address to sign out.</p>
            </Wrapper>
        }
        
    </Container>
    </>
}

export default Csv