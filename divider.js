import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainApplication from './mainapplication';
import Welcome from './src/components/welcome';
import { useSelector, useDispatch } from 'react-redux';
import {setBalanceBtc, setBalanceUsd, setResults, setPrivateKey, setPublicKey, setAddress, setWif, setConversion} from './actions';
import axios from 'axios';
import {Content, Container} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";


export default function divider() {
  const dispatch = useDispatch();
  const address = useSelector(state => state.address);
  const balanceBtc = useSelector(state => state.balanceBtc);
  const privateKey = useSelector(state => state.privateKey);
  const publicKey = useSelector(state => state.publicKey);
  const wif = useSelector(state => state.wif);


  useEffect(() => {
            //SET BALANCE IN BTC IN REDUX STORE
            axios.get("https://api.cryptoapis.io/v1/bc/btc/testnet/address/" + address,
                     {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                                      dispatch(setBalanceBtc(parseFloat(response.data.payload.balance).toFixed(8)));
                     }).catch((error)=>{console.log(error);
                         });
            //SET BALANCE IN $ IN REDUX STORE
            axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD").then(response => {
                                      dispatch(setBalanceUsd(parseFloat(response.data.data.amount*balanceBtc).toFixed(2)));
                                      dispatch(setConversion(response.data.data.amount));
                     }).catch((error)=>{console.log(error);
                         });
            //SET TRANSACTIONS IN BTC IN REDUX STORE
            axios.get("https://api.cryptoapis.io/v1/bc/btc/testnet/address/" + address + "/basic/transactions",
                     {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                                      dispatch(setResults(response.data.payload));
                     }).catch((error)=>{console.log(error);
                         });
  })

  return (
    <View style={{flex:1}}>
            {address === "" ? (<Welcome />) : (<MainApplication />)}
    </View>
  );
}
