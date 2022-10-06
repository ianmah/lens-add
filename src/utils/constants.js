export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CHAIN = process.env.REACT_APP_CHAIN ? process.env.REACT_APP_CHAIN : process.env.NODE_ENV === 'production' ? 'polygon' : 'mumbai'
const whitelist = [
    '0x374002dD7f555D037F7566cC75ce563765a2F456', // asian.lens
    '0xA6ce00cFd952A52d0d0b12DFE0145688be6fd6d3',
    '0xA5FCa146092D00AcE0d6FAefC7D9c25e4de8116C',
    '0xB8D81739F17235497188ef98049BFc760624B41B',
    '0xbD2579Ab21Ed29e15b5E282e557055044e3B7E05',
    '0x7E0b0363404751346930AF92C80D1fef932Cc48a', // fabri.lens
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff', // stani.lens
    '0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4', // davidev.lens
    '0x4A1a2197f307222cD67A1762D9A352F64558d9Be', // wagmi.lens
    '0xB2Ebc9b3a788aFB1E942eD65B59E9E49A1eE500D', // nader.lens
    '0x860d716cFDa90e293Ac999e82Ba1f79B7BFDcD16', // pealco.lens
    '0x6C0A39F4d92bABBdc6CCAF3D0F6bBFdA753c48f9', // jenny.lens
    '0x8eC94086A724cbEC4D37097b8792cE99CaDCd520', // bradorbradley.lens
    '0xA7d53695aF1FD11E0b75d37695290C102D59D743', // christina.lens
    '0xA83444576F86C8B59A542eC2F286a19aB12c2666', // paris.lens
]
export const ADMIN_LIST = new Set(whitelist);
export const HOSTNAME = process.env.NODE_ENV === 'production' ? 'https://lens-wl.web.app' : 'http://localhost:4783'