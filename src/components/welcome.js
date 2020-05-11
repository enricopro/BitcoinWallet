import React, { useState } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import Video from "react-native-video";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import {setAddress} from '../../actions';
import {setPublicKey} from '../../actions';
import {setPrivateKey} from '../../actions';
import {setWif} from '../../actions';
import { Provider } from 'react-redux';

const { height } = Dimensions.get("window") //USED TO SET VIDEO AS BACKGROUND

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";

export default function welcome() {
const dispatch = useDispatch(); //USED TO SAVE DATE IN REDUX STORE
const [state, setState] = useState({
    isloading: false
  });
  //FUNCTION THAT MAKES POST REQUEST AND OPEN POPUP WHEN "CREATE YOUR BITCOIN WALLET" BUTTON IS PRESSED
  const createWallet = () => {
          setState(prevState => {
                      return { ...prevState, isLoading: true };
                    });
          axios.post("https://api.cryptoapis.io/v1/bc/btc/testnet/address" ,
          {}, {headers: {"Content-Type": "application/json" , "X-API-Key": apikey}}).then(response => {
                dispatch(setAddress(response.data.payload.address));
                dispatch(setPrivateKey(response.data.payload.privateKey));
                dispatch(setPublicKey(response.data.payload.publicKey));
                dispatch(setWif(response.data.payload.wif));

                setState(prevState => {return { ...prevState, isLoading: false };});
                }).catch(error => {
                console.log(error);
                });


  }

  return (
  <React.Fragment>
      <StatusBar hidden />
      <Video
      source={require("../intro.mp4")}
      style={styles.backgroundVideo}
      muted={true}
      repeat={true}
      resizeMode={"cover"}
      rate={1.0}
      ignoreSilentSwitch={"obey"}
      />
      <View style={styles.buttonContainer}>
                  <Button bordered rounded light style={styles.startButton} onPress={createWallet}>
                    <Text style={styles.textButton}>CREATE YOUR BITCOIN WALLET</Text>
                  </Button>
                  <View style={{height: 50}}>{(state.isLoading === true) ? (<ActivityIndicator size="large" color="#ffffff" />) : null}</View>
      </View>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  startButton: {
    width: 300,
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  textButton: {
    fontFamily: "Roboto",
    width: 300,
    textAlign: "center",
    fontSize: 15,
    color: '#fff',
    alignContent: 'center',
  },
  }
);