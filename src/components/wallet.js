import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, StyleSheet, ImageBackground, FlatList, RefreshControl, ScrollView, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Header } from 'react-native-elements';

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";

/*WALLET PAGE*/
export default function wallet() {
const dispatch = useDispatch();

  const address = useSelector(state => state.address);                   //REFER TO REDUX STORE
  const balanceBtc = useSelector(state => state.balanceBtc);             //REFER TO REDUX STORE
  const balanceUsd = useSelector(state => state.balanceUsd);             //REFER TO REDUX STORE
  const results = useSelector(state => state.results);                   //REFER TO REDUX STORE
  const conversion = useSelector(state => state.conversion);             //REFER TO REDUX STORE

  return (
        <View style={{flex: 1 }}>
            {/*SET IMAGE AS WHOLE PAGE BACKGROUND*/}
            <ImageBackground source={require("../background1.jpg")} style={styles.image}>
            {/*TITLE*/}
            <View style={{flex: 1, justifyContent: "center", }}>
                <Header
                  centerComponent={{ text: 'WALLET:', style: { color: '#fff' } }}
                  backgroundColor="rgba(105, 79, 173, 1)"
                />
            </View>
            {/*BALANCE SECTION*/}
            <View style={{flex: 4, paddingTop: 18}}>
                <Text style={styles.actualBalance}>Actual balance:</Text>
                <Text style={styles.btcBalance}>{balanceBtc} BTC</Text>
                <Text style={styles.usdBalance}>{balanceUsd}$</Text>
            </View>
            {/*YOUR QRCODE TITLE*/}
            <View style={{flex: 1, flexDirection: "column-reverse", borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "rgba(232, 225, 225, 0.9)"}}>
                <Text style={styles.recentTransaction}>Your QR code:</Text>
            </View>
            {/*QRCODE*/}
            <View style={{flex: 4, backgroundColor: "rgba(232, 225, 225, 0.9)", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Image style={{width: 200, height: 200, borderRadius: 11}} source={{uri: 'https://api.qrserver.com/v1/create-qr-code/?data=bitcointestnet:' + address }} />
            </View>

            </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
    yourWallet: {
        backgroundColor: "rgba(105, 79, 173, 0.75);",
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 15,
        width: 200,
        textAlign: "center",
        color: "#fff",
        fontSize: 35,
        fontFamily: "FontAwesome5_Regular",
    },
    actualBalance: {
        color: "#dcdcdc",
        fontSize: 25,
        paddingBottom: 5,
        paddingTop: 5,
        fontFamily: 'FontAwesome5_Regular',
        paddingLeft: 35,

    },
    btcBalance: {
        color: "#fff",
        fontSize: 30,
        fontFamily: 'FontAwesome5_Brands',
        paddingBottom: 5,
        paddingLeft: 35,
    },
    usdBalance: {
        textAlign: "center",
        width: 100,
        borderRadius: 5,
        backgroundColor: "rgba(220,220,220,0.8)",
        fontSize: 22,
        fontFamily: 'FontAwesome5_Brands',
        marginLeft: 35,
    },
    recentTransaction: {
        color: "#999da0",
        fontSize: 25,
        paddingLeft: 35,
        paddingBottom: 10,
        fontFamily: 'FontAwesome5_Brands',
    },
    image: {
        flex: 1,
    }
  }
);
