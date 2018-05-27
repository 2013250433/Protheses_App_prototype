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
	createStackNavigator,
} from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import HomeScreen from "./HomeScreen";
//import SettingScreen from "./SettingScreen";
import RecordScreen from "./RecordScreen";
import DBScreen from "./DBScreen";


const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		//Setting: SettingScreen,
		Record: RecordScreen,
		DB: DBScreen,
	},
	{
		initialRouteName: 'Home',
	}
);



export default class App extends Component<{}> {
	render() {
		return <RootStack />
	}
}	