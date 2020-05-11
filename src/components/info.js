import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, StyleSheet, ImageBackground, FlatList, ScrollView, Image, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Header } from 'react-native-elements';
import { Button } from 'native-base';

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";

/*WALLET PAGE*/
export default function info() {
  const address = useSelector(state => state.address);              //REFER TO REDUX STORE
  const publicKey = useSelector(state => state.publicKey);          //REFER TO REDUX STORE
  const privateKey = useSelector(state => state.privateKey);        //REFER TO REDUX STORE
  const wif = useSelector(state => state.wif);                      //REFER TO REDUX STORE

//THIS COPIES TO CLIPBOARD THE ADDRESS
  const copyAddress = () => {
    Clipboard.setString(address);
    Alert.alert(
      'Address copied!',
      address,
      [
        {text: 'OK', onPress: () => console.log('Ok')},
      ],
      {cancelable: false},
      )
  }
  //THIS COPIES TO CLIPBOARD THE PUBLICKEY
  const copyPublicKey = () => {
    Clipboard.setString(publicKey);
    Alert.alert(
      'Public key copied!',
      publicKey,
      [
        {text: 'OK', onPress: () => console.log('Ok')},
      ],
      {cancelable: false},
      )
  }
  //THIS COPIES TO CLIPBOARD THE PRIVATEKEY
  const copyPrivateKey = () => {
    Clipboard.setString(privateKey);
    Alert.alert(
      'Private key copied!',
      privateKey,
      [
        {text: 'OK', onPress: () => console.log('Ok')},
      ],
      {cancelable: false},
      )
  }
  //THIS COPIES TO CLIPBOARD THE WIF
  const copyWif = () => {
    Clipboard.setString(wif);
    Alert.alert(
      'Wif copied!',
      wif,
      [
        {text: 'OK', onPress: () => console.log('Ok')},
      ],
      {cancelable: false},
      )
  }

  return (
        <View style={{flex: 1 }}>
            {/*SET IMAGE AS WHOLE PAGE BACKGROUND*/}
            <ImageBackground source={require("../background2.jpg")} style={styles.image}>
            {/*TITLE*/}
            <View style={{flex: 1, justifyContent: "center", }}>
                <Header
                  centerComponent={{ text: 'INFO:', style: { color: '#fff' } }}
                  backgroundColor="rgba(105, 79, 173, 1)"
                />
            </View>
            {/*INFO SECTION*/}
            <View style={{flex: 9, backgroundColor: "rgba(232, 225, 225, 0.9)", paddingLeft: 10, paddingRight: 10, paddingTop: 5}}>
                <TouchableOpacity onPress={copyAddress} style={{marginTop: 7}}>
                    <Text style={styles.title}>Address:</Text>
                    <Text style={styles.data}>{address}</Text>
                </TouchableOpacity>
                <View style={{alignItems: "center", marginTop: 6, marginBottom: 6}}><Divider style={{width: 400, paddingTop: 2}}/></View>
                <TouchableOpacity onPress={copyPublicKey}>
                    <Text style={styles.title}>Public key:</Text>
                    <Text style={styles.data}>{publicKey}</Text>
                </TouchableOpacity>
                <View style={{alignItems: "center", marginTop: 6, marginBottom: 6}}><Divider style={{width: 400, paddingTop: 2}}/></View>
                <TouchableOpacity onPress={copyPrivateKey}>
                    <Text style={styles.title}>Private key:</Text>
                    <Text style={styles.data}>{privateKey}</Text>
                </TouchableOpacity>
                <View style={{alignItems: "center", marginTop: 6, marginBottom: 6}}><Divider style={{width: 400, paddingTop: 2}}/></View>
                <TouchableOpacity onPress={copyWif}>
                    <Text style={styles.title}>Wif:</Text>
                    <Text style={styles.data}>{wif}</Text>
                </TouchableOpacity>
            </View>

            </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
    setting: {
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
    info: {

    },
    title: {
        fontSize: 20,
        fontFamily: 'FontAwesome5_Solid',
    },
    data: {
        paddingTop: 3,
        fontSize: 18,
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
