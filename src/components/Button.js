import styled from 'styled-components'

const Button = styled.button`
    margin-top: 0.5em;
    border: none;
    display: inline-block;
    border-radius: 6px;
    padding: 0.8em 3.5em;
    font-family: 'Poppins';
    font-size: 13px;
    color: ${(p) => p.theme.textLight};
    background: linear-gradient(89.19deg, #BCE2E5 -0.27%, #FFE9EE 49.84%, #FEF5E6 104.31%);
    letter-spacing: 0.02em;
    transition: all 150ms;
    :hover {
        background: ${(p) => p.theme.primaryHover};
        cursor: pointer;
    }
    :focus {
        box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #333;
        outline: none;
    }
    :disabled {
        opacity: 35%;
        cursor: inherit;
    }
    :disabled:hover {
        background: ${(p) => p.theme.primary};
    }
    width: 90vw;
`;

export const SecondaryButton = styled(Button)`
    color: ${(p) => p.theme.textLight};
    background: #D0D0D066;
    :hover {
        background: #D0D0D088;
    }
    :focus {
        background: #D0D0D088;
    }
`


export const RoundedButton = styled(Button)`
    border-radius: 5em;
    padding: 0.6em 2em;
    color: black;
    background: ${(p) => p.theme.textLight};
    letter-spacing: 0.02em;
    transition: all 100ms;
    :hover {
        background: #ffe8e8;
    }
    :focus {
        box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.72), 0px 0px 0px 2px #eee;
        outline: none;
    }
`;

export default Button;
