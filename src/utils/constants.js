export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CHAIN = process.env.REACT_APP_CHAIN ? process.env.REACT_APP_CHAIN : process.env.NODE_ENV === 'production' ? 'polygon' : 'mumbai'
const whitelist = [
    '0x374002dD7f555D037F7566cC75ce563765a2F456',
    '0xa6ce00cfd952a52d0d0b12dfe0145688be6fd6d3',
    '0xA5FCa146092D00AcE0d6FAefC7D9c25e4de8116C',
    '0xB8D81739F17235497188ef98049BFc760624B41B',
    '0xbD2579Ab21Ed29e15b5E282e557055044e3B7E05',
]
export const ADMIN_LIST = new Set(whitelist);
export const HOSTNAME = process.env.NODE_ENV === 'production' ? 'https://lens-wl.web.app' : 'http://localhost:4783'