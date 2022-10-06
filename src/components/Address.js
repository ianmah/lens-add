import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'
import signout from '../assets/signout.svg'

const Span = styled.div`
    background: #2F4531;
    color: #E5FFBE;
    padding: 0.4em 0.7em;
    border-radius: 10px;
    margin: 1em;
    box-sizing: border-box;
    max-width: 13em;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const Address = ({ }) => {
    const { disconnect } = useDisconnect()
    const { address, isConnected } = useAccount()
    
    return <>
        { isConnected && 
            <Span onClick={() => disconnect()}>
                {address.substring(0, 6)}...{address.substring(37, 41)}
                <img src={signout} alt='signout' width='16px' style={{ display: 'inline' }} />
            </Span>
        }       
    </>
}

export default Address;
