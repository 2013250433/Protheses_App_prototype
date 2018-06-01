import React, { Component } from 'react'
import {
  Platform,
  StyleSheet, 
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  AppState,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

const Realm = require('realm');

type Props = {};
export default class HomeScreen extends Component<Props> {

	constructor(){
		super(); // why neeed super in realm?
		
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		
		this.state = {
			seconds: 5,
			washToggle: false,
		};
		
		realm = new Realm({
				schema: [{name: 'Cleaning_Timestamp',
				properties: 
				{
					id: {type:'int', default:0},				
					date: 'string',
					time: 'string',
				}
				}]
			});
	}
	
	
	static navigationOptions = {
		header: null
	};
	
	componentDidMount(){
		AppState.addEventListener('change',this.handleAppStateChange);		
	}
	
	componentWillUnmount(){
		AppState.removeEventListener('change',this.handleAppStateChange);
		
	}	
	
	handleAppStateChange(appState) {
		if(appState === 'background' && this.state.washToggletoggle == true){
			console.log('app is in background',this.state.seconds);
			var date = new Date(Date.now() + (this.state.seconds * 1000));
			
			if(Platform.OS === 'ios')
				date= date.toISOString();
				
			PushNotification.localNotificationSchedule({
			message: "세척이 완료되었습니다.", // (required)
			date,
			});
			this.state.washToggletoggle = false;
		}
	}
	
	
  render() {
    return (
      <View style={{flex:1}}>
		<View style={{flex:8, backgroundColor:'#fff', justifyContent: 'center', alignItems: 'center',}}> 
			{/* why use justify:for vert and align:for horizontal */}
			<Image style={{flex:1, width: 1000, height: 1300, resizeMode:'contain'}} source={require('./res/heavy_steel.png')} />
		</View>
		
		<View style={{flex:8, alignItems: 'center', justifyContent: 'center', backgroundColor:'#eee'}}>
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
	  this.state.washToggletoggle = true;
	  realm.write(()=>{
				var ID = realm.objects('Cleaning_Timestamp').length + 1;
				var d = new Date();
				realm.create('Cleaning_Timestamp',{
					id: ID,
					date: (d.getFullYear()).toString()+ '. '+(d.getMonth()+1).toString() + '. ' +(d.getDate()).toString(),
					time: d.getHours() + ':' + d.getMinutes(),
				})
			});
			
	  alert('세척을 시작합니다.');
  }
}

//{marginLeft: 15, flex: 1, width: 30, height: 30, resizeMode:'contain'}}
//<Image style={{marginRight: 15, flex: 1, width: 35, height: 35, resizeMode:'contain'}} source={require('./res/setting_icon.png')} />
//<Image style={{flex: 1, width: null, height: null}} source={require('./res/bluetooth_disabled.png')} />
		