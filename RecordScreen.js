import React, { Component } from 'react';
import {View, Text, StyleSheet, Picker, AppState, Platform, Switch, Alert, AsyncStorage,} from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';


export default class RecordScreen extends Component{
	
	constructor(props){
		super(props);
		
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 10,
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
			let value = await AsyncStorage.getItem('complete');
			if(value == 'true_jin'){
				alert('참');
				this.setState({completeSwitch:true});
			}
			else{
				alert('거짓');
				this.setState({completeSwitch:false});
			}
				
		}
		catch(error){
		}
	}
	
	componentDidMount(){
		AppState.addEventListener('change',this.handleAppStateChange);
			
	}
	
	componentWillUnmount(){
		AppState.removeEventListener('change',this.handleAppStateChange);
		
	}	
	
	handleAppStateChange(appState) {
		if(appState === 'background'){
			console.log('app is in background',this.state.seconds);
			var date = new Date(Date.now() + (this.state.seconds * 1000));
			
			if(Platform.OS === 'ios')
				date= date.toISOString();
				
			PushNotification.localNotificationSchedule({
			message: "My Notification Message", // (required)
			date,
			});
		}
	}
	
	ShowAlert = (value) =>{		
	
	this.setState({
    completeSwitch: value
	})
	this.saveData(value);
	
	if(value == true)
		Alert.alert("Switch is On.");
	else
		Alert.alert("Switch is Off.");
	}
	

	render() {
		return (
		<View style={{flex:1}}>
		
		 <View style={{flex:2}}>
		 </View>
		 
		 <View style={{flex:3, alignItems:'center', backgroundColor:"skyblue"}}>
			<Text>Completion Push</Text>
		 <Switch onValueChange={(value) => this.ShowAlert(value)} value={this.state.completeSwitch}/>
			<Text>Cleaning reminder</Text>
			<Switch onValueChange={(value) => this.saveData()}/>
			<Switch onValueChange={(value) => this.displayData()}/>
		 </View>
		 
		 <View style={{flex:3}}>
			<Text>Choose your notification time in seconds </Text>
			<Picker
				style={styles.picker}
				selectedValue={this.state.seconds}
				onValueChange={(seconds) => this.setState({seconds})}
			>
				<Picker.Item label="5" value={5} />
				<Picker.Item label="10" value={10} />
				<Picker.Item label="15" value={15} />
			</Picker>
			<PushController />
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
		AsyncStorage.setItem('complete',toggle);
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
});