import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'

const Span = styled.div`
    background: #74434A;
    color: #FFBFBC;
    padding: 0.4em 0.7em;
    border-radius: 10px;
    margin: 1em;
    box-sizing: border-box;
    max-width: 9em;
    position: absolute;
    right: 0;
`;

const Address = ({ }) => {
    const { disconnect } = useDisconnect()
    const { address, isConnected } = useAccount()
    
    return <>
        { isConnected && 
            <Span onClick={() => disconnect()}>
            {address.substring(0, 6)}...{address.substring(37, 41)}
            </Span>
        }       
    </>
}

export default Address;
