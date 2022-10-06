import styled from 'styled-components'

const Button = styled.button`
    margin-top: 0.5em;
    border: none;
    display: inline-block;
    border-radius: 6px;
    padding: 0.8em;
    font-family: 'Poppins';
    font-size: 13px;
    color: ${(p) => p.theme.textLight};
    background: ${p => p.theme.primary};
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
    max-width: 700px;
`;

export const SecondaryButton = styled(Button)`
    color: white;
    text-decoration: underline;
    text-underline-offset: 3px;
    background: none;
    :hover {
        background: none;
        outline: none;
        box-shadow: none;
    }
    :focus {
        outline: none;
        color: grey;
        box-shadow: none;
        background: none;
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
