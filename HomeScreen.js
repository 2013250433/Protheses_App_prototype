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
  AsyncStorage,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

//import {getStorage} from './Util';

const Realm = require('realm');

type Props = {};
export default class HomeScreen extends Component<Props> {
	
	constructor(){
		super(); // why neeed super in realm?
		
		//this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.callStorage();
		this.callStorage_2();
		
		this.state = {
			washUntil: 15,
			lastWash: new Date().getTime(),
			washToggle: false,
			lastCleanToggle: false,
			ble_on: false,
			curTime: 0,
			remTime: 0,
			shouldPush: true,
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
	
	alerter = () =>{
		alert('hi');
	}
	
	static navigationOptions = {
		header: null
	};
	
	componentWillMount(){ // recommended to put functions at constructor()
	//	this.callStorage();
	//	this.alerter();
	}
	
	callStorage = async() => {
		
		try{
			let value = await AsyncStorage.getItem('@cleaning_time');
			v = parseInt(value);
			
			this.setState({washUntil: v});
			
			
			//alert(c_value);
			/*let last_value = await AsyncStorage.getItem('@lastwash_time');
			lv = parseInt(last_value);
			this.setState({lastWash: lv});
			alert(lv);	*/
		}
		catch(error){
			alert(error);
		}
	}
	
	callStorage_2 = async() => {
		
		try{		
			let c_value = await AsyncStorage.getItem('@complete');
			if(c_value == 'true_jin')
				this.setState({shouldPush: true});
			else
				this.setState({shouldPush: false});
			//alert(c_value);
			/*let last_value = await AsyncStorage.getItem('@lastwash_time');
			lv = parseInt(last_value);
			this.setState({lastWash: lv});
			alert(lv);	*/
		}
		catch(error){
			alert(error);
		}
	}
	
	callStorage_3 = async() => {
		
		try{
			let value = await AsyncStorage.getItem('@cleaning_time');
			v = parseInt(value);
			
			this.setState({washUntil: v});
		}
		catch(error){
			alert(error);
		}
		
		alert('세척을 시작합니다. 시간:'+this.state.washUntil);
	 
	
		var date = new Date(Date.now() + (this.state.washUntil * 1000));
			// gets Date in int
			if(Platform.OS === 'ios')
				date= date.toISOString();
			
			if(this.state.shouldPush){
			PushNotification.localNotificationSchedule({
			message: "세척이 완료되었습니다.", // (required)
			date,
			});
			}
			
			this.setState({lastWash: date.getTime()});
			//why it is correctly saved in states?
			//alert(this.state.lastWash);
			AsyncStorage.setItem('@lastwash_time',this.state.lastWash.toString());
	}
	
	componentDidMount(){
		//AppState.addEventListener('change',this.handleAppStateChange);
		
		//var delta = now - this.state.lastWash;
		setInterval( () => {
			var now = new Date().getTime();
			var delta = now - this.state.lastWash;
			//alert(this.state.lastWash);
			if(delta < 0)
				delta = 0;
			
			this.setState({curTime : Math.floor(delta/1000)})
			
			if(this.state.curTime == 60 - 5){
				var date = new Date(Date.now());
				PushNotification.localNotificationSchedule({
				message: "세척 진행 후 1분 이상이 경과되었습니다.", // (required)
				date,
				});
			}
			
			if(this.state.curTime == 60*2 - 5){
				var date = new Date(Date.now());
				PushNotification.localNotificationSchedule({
				message: "세척 진행 후 2분 이상이 경과되었습니다.", // (required)
				date,
				});
			}
			
			if(this.state.curTime == 60*5 - 5){
				var date = new Date(Date.now());
				PushNotification.localNotificationSchedule({
				message: "세척 진행 후 5분 이상이 경과되었습니다.", // (required)
				date,
				});
			}
		},1000)
	}
	
	componentWillUnmount(){
		//AppState.removeEventListener('change',this.handleAppStateChange);
		
	}	
	
	/*handleAppStateChange(appState) {
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
	}*/
	
	
	
	/*
	_bluetooth_off_screen= ()=>{
		return(
			
		);
	}
	
	_bluetooth_on_screen= ()=>{
		return(
			
		);
	}
	
	
	
	*/
	
  render() {
    return (
      <View style={{flex:1}}>
		<View style={{flex:8, backgroundColor:'#fff', justifyContent: 'center', alignItems: 'center',}}> 
			{/* why use justify:for vert and align:for horizontal */}
			{
				this.state.ble_on ? 
			<TouchableOpacity onPress={()=>this._washStart()}>
			<Image style={{flex:1, width: 1000, height: 1300, resizeMode:'contain'}} source={require('./res/on_steel.png')} />
			</TouchableOpacity>
			:
			<Image style={{flex:1, width: 1000, height: 1300, resizeMode:'contain'}} source={require('./res/heavy_steel.png')} /> 
			}
			
		</View>
		
		<View style={{flex:8, alignItems: 'center', justifyContent: 'center', backgroundColor:'#eee'}}>
			{
				this.state.ble_on ?
				
				<View>
					<Text style={{fontSize: 20,	fontWeight: 'bold'}}> {this.state.curTime} seconds {'\n'} after last clean </Text>
				</View>
			:
			<TouchableOpacity onPress={()=>this.ble_toggle()}>
				<Image style={{}} source={require('./res/bluetooth_icon.png')}/>
			</TouchableOpacity>
			}
		</View>
		{/*<Text>{this.state.washUntil}</Text>*/}
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
  
  ble_toggle(){
	  this.setState({ble_on:true});
	  alert('기기가 블루투스로 연결되었습니다.');
  }
  
  washStart(){	
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
  
  _washStart(){
	
	  realm.write(()=>{
				var ID = realm.objects('Cleaning_Timestamp').length + 1;
				var d = new Date();
				
				var m = d.getMinutes();
				if(m<10)
					m = '0'+m;
				
				realm.create('Cleaning_Timestamp',{
					id: ID,
					date: (d.getFullYear()).toString()+ '. '+(d.getMonth()+1).toString() + '. ' +(d.getDate()).toString(),
					time: d.getHours() + ':' + m,
				})
			});
	 
	this.callStorage_3();
  }
}

//{marginLeft: 15, flex: 1, width: 30, height: 30, resizeMode:'contain'}}
//<Image style={{marginRight: 15, flex: 1, width: 35, height: 35, resizeMode:'contain'}} source={require('./res/setting_icon.png')} />
//<Image style={{flex: 1, width: null, height: null}} source={require('./res/bluetooth_disabled.png')} />
		