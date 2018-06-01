import React, { Component } from 'react';
import {View, Text, StyleSheet, Picker, AppState, Platform, Switch, Alert, AsyncStorage, Image,} from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

//1분단위로 cleaning reminder

export default class SettingScreen extends Component{
	
	constructor(props){
		super(props);
		
		//this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 15,
			toggle: true,
			completeSwitch: false,
		};
		
		
	}
	
	
	//added for AsyncStorage
	componentWillMount(){
		this.callStorage();
	}
	
	callStorage = async() => {
		try{
			let value = await AsyncStorage.getItem('@complete');
			if(value == 'true_jin'){
				//alert('참');
				this.setState({completeSwitch:true});
			}
			else{
				//alert('거짓');
				this.setState({completeSwitch:false});
			}
				
		}
		catch(error){
		}
	}
	
	componentDidMount(){
		//AppState.addEventListener('change',this.handleAppStateChange);
			
	}
	
	componentWillUnmount(){
		//AppState.removeEventListener('change',this.handleAppStateChange);
		
	}	
	
	/*handleAppStateChange(appState) {
		if(appState === 'background'){
			console.log('app is in background',this.state.seconds);
			var date = new Date(Date.now() + (this.state.seconds * 1000));
			
			if(Platform.OS === 'ios')
				date= date.toISOString();
				
			PushNotification.localNotificationSchedule({
			message: "세척이 완료되었습니다.", // (required)
			date,
			});
		}
	}*/
	
	ShowAlert = (value) =>{		
	
	this.setState({
    completeSwitch: value
	})
	this.saveData(value);
	
	if(value == true)
		Alert.alert("Completeion switch On.");
	else
		Alert.alert("Completeion switch Off.");
	}
	

	render() {
		return (
		<View style={{flex:1, backgroundColor:"#FFF"}}>
		
		 <View style={{flex:1,}}>
			<View style={styles.setting_header}>
				<Image style={{}} source={require('./res/main_setting_icon.png')} />
				<Text style={styles.textStyle}> Main Settings</Text>
			</View>
			<View>
				<Text style={[styles.textStyle, {paddingLeft: 30}]}> Delete Account </Text>
				<Text style={[styles.textStyle, {paddingLeft: 30}]}> Cleaning Record Reset </Text>
			</View>
		</View>
		 
		 
		 <View style={{flex:2, backgroundColor:"#FFF"}}>
			<View style={styles.setting_header}>
				<Image style={{}} source={require('./res/notification_setting_icon.png')} />
				<Text style={styles.textStyle}> Notification Settings</Text>
			</View>
			<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
				<Text style={styles.textStyle}>Completion Push</Text>
				<Switch onValueChange={(value) => this.ShowAlert(value)} value={this.state.completeSwitch}/>
				<Text style={styles.textStyle}>Cleaning reminder</Text>
				<Switch onValueChange={(value) => this.saveData()}/>
			</View>
		 </View>
		 
		 <View style={{flex:2}}>
			<View style={styles.setting_header}>
				<Image style={{}} source={require('./res/custom_setting_icon.png')} />
				<Text style={styles.textStyle}> Custom Settings</Text>
			</View>
			
			<View style={{alignItems:'center'}}>
			<Text style={styles.textStyle}>Choose your notification time in seconds </Text>
			<Picker
				style={[styles.picker,]}
				selectedValue={this.state.seconds}
				onValueChange={(seconds) => this.setState({seconds})}
			>
				<Picker.Item label="5" value={5} />
				<Picker.Item label="15" value={15} />
				<Picker.Item label="40" value={40} />
			</Picker>
			<PushController />
			</View>
		 </View>
		 
		</View>
		);
	}
	
	saveData(value) {
		let toggle;
		if(value == true)
			toggle = 'true_jin';
		else
			toggle = 'false_jin';
		AsyncStorage.setItem('@complete',toggle);
	}
	
	displayData = async () => {
		try{
			let user = await AsyncStorage.getItem('user');
			alert(user);
		}
		catch(error){
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	picker: {
		width: 100,
	},
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	
	setting_header: {
		flexDirection:'row',  
		paddingTop: 8, 
		paddingBottom: 10, 
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
	},
});