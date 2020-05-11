export const setAddress = (e) => {
    return{
        type: 'SETADDRESS',
        payload: e
    }
}
export const setPrivateKey = (e) => {
    return{
        type: 'SETPRIVATEKEY',
        payload: e
    }
}
export const setPublicKey = (e) => {
    return{
        type: 'SETPUBLICKEY',
        payload: e
    }
}
export const setBalanceBtc = (e) => {
    return{
        type: 'SETBALANCEBTC',
        payload: e
    }
}
export const setBalanceUsd = (e) => {
    return{
        type: 'SETBALANCEUSD',
        payload: e
    }
}
export const setResults = (e) => {
    return{
        type: 'SETRESULTS',
        payload: e
    }
}
export const setConversion = (e) => {
    return{
        type: 'SETCONVERSION',
        payload: e
    }
}
export const setWif = (e) => {
    return{
        type: 'SETWIF',
        payload: e
    }
}