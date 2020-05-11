import setAddressReducer from './setAddress';
import setPrivateKeyReducer from './setPublicKey';
import setPublicKeyReducer from './setPrivateKey';
import setBalanceBtcReducer from './setBalanceBtc';
import setBalanceUsdReducer from './setBalanceUsd';
import setResultsReducer from './setResults';
import setConversionReducer from './setConversion';
import setWifReducer from './setWif';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    address: setAddressReducer,
    publicKey: setPublicKeyReducer,
    privateKey: setPrivateKeyReducer,
    balanceBtc: setBalanceBtcReducer,
    balanceUsd: setBalanceUsdReducer,
    results: setResultsReducer,
    conversion: setConversionReducer,
    wif: setWifReducer,
});

export default allReducers;