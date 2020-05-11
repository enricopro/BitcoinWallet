import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, StyleSheet, ImageBackground, FlatList, RefreshControl, ScrollView, Image, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Header } from 'react-native-elements';
import { Button } from 'native-base';

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";

/*PAYMENT PAGE*/
export default function payment() {
  const address = useSelector(state => state.address);             //REFER TO REDUX STORE
  const wif = useSelector(state => state.wif);                     //REFER TO REDUX STORE
  const [state, setState] = useState({                             //LOCAL STATE USEFUL TO STORE TEMPORARY DATAS
      addressTo: "",
      amountTo: "",
      hex: "",
      isLoading: false,
    });

//THIS SAVES IN REACT STATE THE ADDRESS FROM FIRST TEXTINPUT
  const handleInputAddress = e => {
    setState(prevState => {
      console.log(state.addressTo);
      return { ...prevState, addressTo: e };
    });
  };
//THIS SAVES IN REACT STATE THE BTC AMOUNT FROM SECOND TEXTINPUT
  const handleInputAmount = e => {
    console.log(state.amountTo);
    setState(prevState => {
      return { ...prevState, amountTo: e };
    });
  };

//THIS INITIALIZES AND COMPLETE THE PAYMENT
  const makePayment = () => {
  //THIS CREATES THE TRANSACTION RETURNING HEX
    axios.post("https://api.cryptoapis.io/v1/bc/btc/testnet/txs/create" ,
              { inputs: [{ address: address, value: state.amountTo }], outputs: [{ address: state.addressTo, value: state.amountTo }], fee: { address: address, value: "0.00023141" } },
              {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                    setState(prevState => {return { ...prevState, hex: response.data.payload.hex };});
                    }).catch(error => {
                        Alert.alert(
                           'Oops',
                           "Something went wrong, retry!",
                           [
                             {text: 'OK', onPress: () => console.log('Ok')},
                           ],
                           {cancelable: false},
                           )
                    });
    //THIS SIGNS THE TRANSACTION AND RETURNS A NEW HEX
    axios.post("https://api.cryptoapis.io/v1/bc/btc/testnet/txs/sign" ,
              { hex: state.hex, wifs : [wif]},
              {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                    setState(prevState => {return { ...prevState, hex: response.data.payload.hex };});
                    }).catch(error => {
                        Alert.alert(
                           'Oops',
                           "Something went wrong, retry!",
                           [
                             {text: 'OK', onPress: () => console.log('Ok')},
                           ],
                           {cancelable: false},
                           )
                        });
    //THIS PUSH TRANSACTION INSIDE THE BLOCKCHAIN
    axios.post("https://api.cryptoapis.io/v1/bc/btc/testnet/txs/send" ,
              { hex: state.hex},
              {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                    Alert.alert(
                       'Transaction sent!',
                       "Transaction Id: " + response.data.payload.txid,
                       [
                         {text: 'OK', onPress: () => console.log('Ok')},
                       ],
                       {cancelable: false},
                       )
                    }).catch(error => {
                    Alert.alert(
                       'Oops',
                       "Something went wrong, retry!",
                       [
                         {text: 'OK', onPress: () => console.log('Ok')},
                       ],
                       {cancelable: false},
                       )
                    });
  }
  return (
        <View style={{flex: 1 }}>
            {/*SET IMAGE AS WHOLE PAGE BACKGROUND*/}
            <ImageBackground source={require("../background2.jpg")} style={styles.image}>
            {/*TITLE*/}
            <View style={{flex: 1, justifyContent: "center", }}>
                <Header
                  centerComponent={{ text: 'PAYMENT', style: { color: '#fff' } }}
                  backgroundColor="rgba(105, 79, 173, 1)"
                />
            </View>
            {/*INPUT SECTION*/}
            <View style={{flex: 9, justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
                <Text style={styles.text1}>Send bitcoins to:</Text>
                <Input
                  placeholder='Address...'
                  onChangeText={handleInputAddress}
                />
                <Text style={styles.text1}>Amount in BTC:</Text>
                <Input
                  placeholder='Amount...'
                  onChangeText={handleInputAmount}
                />
                <View style={{alignItems:"center", paddingTop:5}}>
                    {/*BUTTON STARTS MakeFunction*/}
                    <Button rounded primary style={styles.button} onPress={makePayment}>
                      <Text style={styles.textButton}>SEND!</Text>
                    </Button>
                </View>
            </View>

            </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
    payment: {
        backgroundColor: "rgba(105, 79, 173, 0.75);",
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 15,
        width: 300,
        textAlign: "center",
        color: "#fff",
        fontSize: 35,
        fontFamily: "FontAwesome5_Regular",
    },
    text1: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'FontAwesome5_Regular',
        paddingLeft: 10,
        paddingTop: 15

    },
    textButton: {
        color: "#fff",
        fontSize: 15,
        fontFamily: 'FontAwesome5_Brands',
        alignContent: 'center',
        textAlign: "center",
        width:200
    },
    button: {
        textAlign: "center",
        width: 200,
        marginTop: 10
    },
    recentTransaction: {
        color: "#999da0",
        fontSize: 25,
        paddingLeft: 35,
        paddingBottom: 10,
        fontFamily: 'FontAwesome5_Brands',
    },
    from: {
        fontSize: 16,
        fontFamily: 'FontAwesome5_Solid',
    },
    image: {
        flex: 1,
    }
  }
);
