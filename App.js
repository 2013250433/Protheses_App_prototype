/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


import {
  Platform,
  Text,
  View,
} from 'react-native';

import {
	createStackNavigator, createBottomTabNavigator, createSwitchNavigator,
} from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import DBScreen from "./DBScreen";
import LoginScreen from "./LoginScreen";


const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Setting: SettingScreen,
		DB: DBScreen,
		Login: LoginScreen,
	},
	{
		initialRouteName: 'Login',
	}
);



export default class App extends Component<{}> {
	render() {
		return <RootStack />
	}
}	