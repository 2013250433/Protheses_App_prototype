import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from 'react-native'

const Realm = require('realm');

export default class DBScreen extends Component<{}> {
		constructor(){
			super();
			
			this.state = {
				Bate : '',
				Time : '',
				Comment : '',
			}
		}
		
		add_Record=()=>{
			
			realm.write(()=>{
				var ID = realm.objects('Cleaning_Timestamp').length + 1;
				var d = new Date();
				realm.create('Cleaning_Timestamp',{
					id: ID,
					date: (d.getMonth()+1).toString() + '/' +(d.getDate()).toString(),
					time: d.getHours() + ':' + d.getMinutes(),
				})
			});
			
			Alert.alert("time added successfully");
		}
		
		render() {
			var A = realm.objects('Cleaning_Timestamp');
			var myJSON = JSON.stringify(A);
			
			return (
				<View>
					<TextInput placeholder="Hi" 
					onChangeText = { (text) => {this.setState({Comment: text})} } />
					<TouchableOpacity onPress={this.add_Record} style={styles.button}>
						<Text style={styles.TextStyle}> Click here to update! </Text>
					</TouchableOpacity>
					<ScrollView>
					<Text>{myJSON}</Text>
					</ScrollView>
				</View>
			);
		}
	
}

const styles = StyleSheet.create({
    
  TextInputStyle:
    {
      borderWidth: 1,
      borderColor: '#009688',
      width: '100%',
      height: 40,
      borderRadius: 10,
      marginBottom: 10,
      textAlign: 'center',
    },

  button: {
    
      width: '100%',
      height: 40,
      padding: 10,
      backgroundColor: '#4CAF50',
      borderRadius:7,
      marginTop: 12
    },
     
  TextStyle:{
      color:'#fff',
      textAlign:'center',
    }
    
});