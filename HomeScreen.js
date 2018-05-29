import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

type Props = {};
export default class HomeScreen extends Component<Props> {

static navigationOptions = {
	header: null
};

  render() {
    return (
      <View style={{flex:1}}>
		<View style={{flex:8, backgroundColor:'#fff', justifyContent: 'center', alignItems: 'center',}}> 
			{/* why use justify:for vert and align:for horizontal*/}
			<Image style={{flex:1, width: 1000, height: 1300, resizeMode:'contain'}} source={require('./res/heavy_steel.png')} />
		</View>
		
		<View style={{flex:8, alignItems: 'center', backgroundColor:'#eee'}}>
			<TouchableOpacity onPress={()=>this.startWash()}>
				<Image style={{}} source={require('./res/bluetooth_icon.png')}/>
			</TouchableOpacity>
		</View>
		
		<View style={{flex:1.4, flexDirection:'row', backgroundColor:'#fff'}}>
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('DB')}>
				<Image source={require('./res/list_icon.png')} />
				</TouchableOpacity>
			</View>
			<View style={{flex:10}}/>
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
				<Image source={require('./res/setting_icon.png')} />
				</TouchableOpacity>
			</View>
		</View>
	  </View>
    );
  }
  
  startWash(){
	  alert('WASH!!!');
  }
}

//{marginLeft: 15, flex: 1, width: 30, height: 30, resizeMode:'contain'}}
//<Image style={{marginRight: 15, flex: 1, width: 35, height: 35, resizeMode:'contain'}} source={require('./res/setting_icon.png')} />
//<Image style={{flex: 1, width: null, height: null}} source={require('./res/bluetooth_disabled.png')} />
		