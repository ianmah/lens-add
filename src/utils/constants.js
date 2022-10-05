export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CHAIN = process.env.REACT_APP_CHAIN ? process.env.REACT_APP_CHAIN : process.env.NODE_ENV === 'production' ? 'polygon' : 'mumbai'
const whitelist = [
    '0x374002dD7f555D037F7566cC75ce563765a2F456', // asian.lens
    '0xa6ce00cfd952a52d0d0b12dfe0145688be6fd6d3',
    '0xA5FCa146092D00AcE0d6FAefC7D9c25e4de8116C',
    '0xB8D81739F17235497188ef98049BFc760624B41B',
    '0xbD2579Ab21Ed29e15b5E282e557055044e3B7E05',
    '0x7E0b0363404751346930AF92C80D1fef932Cc48a', // fabri.lens
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff', // stani.lens
    '0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4', // davidev.lens
    '0x4A1a2197f307222cD67A1762D9A352F64558d9Be', // wagmi.lens
]
export const ADMIN_LIST = new Set(whitelist);
export const HOSTNAME = process.env.NODE_ENV === 'production' ? 'https://lens-wl.web.app' : 'http://localhost:4783'