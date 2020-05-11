import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, StyleSheet, ImageBackground, FlatList, ScrollView, Image, TouchableOpacity, Alert, Clipboard, RefreshControl } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {setResults} from '../../actions';
import { Input, Header } from 'react-native-elements';
import { Button } from 'native-base';

const apikey = "b505b21a784ae5ebe0602297e5eb602e63e930c6";

/*HISTORY PAGE*/
export default function history() {
  const dispatch = useDispatch();                                  //REFER TO REDUX STORE
  const address = useSelector(state => state.address);             //REFER TO REDUX STORE
  const results = useSelector(state => state.results);             //REFER TO REDUX STORE

  const [refreshing, setRefreshing] = React.useState(false);       //NEEDED TO USE PULL TO REFRESH

  const onRefresh = React.useCallback(() => {                      //NEEDED TO USE PULL TO REFRESH
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500)
  }, [refreshing]);

  return (
        <View style={{flex: 1}}>
            {/*SET IMAGE AS WHOLE PAGE BACKGROUND*/}
            <ImageBackground source={require("../background2.jpg")} style={styles.image}>
            {/*TITLE*/}
            <View style={{flex: 1, justifyContent: "center", paddingBottom:20}}>
                <Header
                  centerComponent={{ text: 'TRANSACTIONS HISTORY:', style: { color: '#fff' } }}
                  backgroundColor="rgba(105, 79, 173, 1)"
                />
            </View>
            {/*FLATLIST SHOWING RESULTS*/}
            <View style={{flex: 9}}>
                {/*IF TRANSACTIONS ARRAY IS EMPTY IT SHOWS A TEXT*/}
                {results.length == "0" ? (<Text style={styles.norecent}>No transactions here!</Text>) :
                (<FlatList
                  data={results}
                  refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={({ item }) =>
                            <View style={{flex:1}}>
                            {/*IT DISTINGUISH IN AND OUT TRANSACTIONS*/}
                            {item.sent[address] === undefined ?
                            (<React.Fragment>
                            <View style={{flexDirection:"row"}}>
                                <View style={{justifyContent: "center", paddingLeft: 20}}>
                                    <FontAwesome5 name="sort-up" color="green" size={23} />
                                </View>
                                <View style={{flexDirection: "column", flex:1, paddingRight: 15}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 15}}>
                                        <View>
                                            <Text style={styles.from}>Id: </Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: 15, paddingRight:15}}>{item.txid}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 15}}>
                                        <View>
                                            <Text style={styles.from}>Amount:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: 15}}>+ {item.received[address]} BTC</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{alignItems: "center", marginTop: 6, marginBottom: 6}}><Divider style={{width: 360, paddingTop: 2}}/></View>
                            </React.Fragment>)
                            :
                            (<React.Fragment>
                            <View style={{flexDirection:"row"}}>
                                <View style={{justifyContent: "center", paddingLeft: 20}}>
                                    <FontAwesome5 name="sort-down" color="red" size={23} />
                                </View>
                                <View style={{flexDirection: "column", flex:1, paddingRight: 15}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 15}}>
                                        <View>
                                            <Text style={styles.from}>Id: </Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: 15, paddingRight:15}}>{item.txid}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 15}}>
                                        <View>
                                            <Text style={styles.from}>Amount:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: 15}}>-{item.sent[address]} BTC</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{alignItems: "center", marginTop: 6, marginBottom: 6}}><Divider style={{width: 360, paddingTop: 2}}/></View>
                            </React.Fragment>
                            )}
                            </View>}
                        keyExtractor={(item, index) => index.toString()}
                      />)}
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
    norecent: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "FontAwesome5_Regular",
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
