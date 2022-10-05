import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Wallet from '../components/Wallet'
import Address from '../components/Address'
import { useAccount } from 'wagmi'
import { ADMIN_LIST } from '../utils/constants'
import { collection, getDocs } from 'firebase/firestore'
import { CSVLink } from 'react-csv'
import header from '../assets/header.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    min-height: 80vh;
`

function Home({ profile, setProfile, db, ...props }) {
    const { address, isConnected } = useAccount()
    const [csvData, setCsvData] = useState([])

    const generateCSV = async () => {
        const querySnapshot = await getDocs(collection(db, "forms"))
        const newData = []
        querySnapshot.forEach((doc) => {
            const { firstName, lastName, walletAddress, email, referrer } = doc.data()
            newData.push([firstName, lastName, walletAddress, email, referrer])
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
            <Button onClick={() => generateCSV()}>Submissions CSV</Button>
            { csvData[0] && <CSVLink data={csvData} >Download CSV</CSVLink>}
            <Link to={'distro'}>
                <Button onClick={() => {}}>Generate Code</Button>
            </Link>
            <p style={{ color: 'grey', marginTop: '1em' }} >Generate a QR code that allows users to scan and join the Lens Whitelist</p>
        </>
        }
        {!ADMIN_LIST.has(address) && <>
            <h1>You do not currently have access</h1>
            <p>Please sign in with an admin address.</p>
            <p style={{ color: 'grey' }} >If you need to swap wallets, click your wallet address to sign out.</p>
            </>
        }
        
    </Container>
    </>
}

export default Home