export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CHAIN = process.env.REACT_APP_CHAIN ? process.env.REACT_APP_CHAIN : process.env.NODE_ENV === 'production' ? 'polygon' : 'mumbai'
export const ADMIN_LIST = [
    '0x374002dD7f555D037F7566cC75ce563765a2F456',

]
export const HOSTNAME = process.env.NODE_ENV === 'production' ? 'https://lens-wl.web.app' : 'http://localhost:4783'