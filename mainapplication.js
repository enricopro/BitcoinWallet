import React from 'react';
import axios from 'axios';
import { Text, View, StatusBar } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Wallet from './src/components/wallet';
import Payment from './src/components/payment';
import Info from './src/components/info';
import History from './src/components/history';


const Tab = createMaterialBottomTabNavigator();

function WalletScreen() {
  return (
      <Wallet />
  );
}

function TransactionScreen() {
  return (
    <History />
  );
}

function PaymentScreen() {
  return (
    <Payment />
  );
}

function InfoScreen() {
  return (
    <Info />
  );
}


export default function mainapplication() {


  return (

  <NavigationContainer>
  <StatusBar hidden />
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      backBehavior="history"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="wallet" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={TransactionScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="history" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentScreen}
        options={{
          tabBarLabel: 'Payment',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="exchange-alt" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="info-circle" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}
