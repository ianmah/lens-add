import styled from 'styled-components'

const Button = styled.button`
    margin-top: 0.5em;
    border: none;
    border-radius: 6px;
    padding: 0.6em 3.5em;
    font-family: 'Fira Mono';
    font-size: 16px;
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
`;

export const SecondaryButton = styled(Button)`
    color: grey;
    background: #D0D0D0;
    :hover {
        background: #E8E8E8;
    }
    :focus {
        background: #E8E8E8;
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
