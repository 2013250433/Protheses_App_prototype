import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Alert, Text, ScrollView, Image, FlatList,  } from 'react-native'

const Realm = require('realm');

export default class DBScreen extends Component<{}> {
	
		
		static navigationOptions = {
		header: null
		};

		constructor(){
			super();
			
			this.state = {
				Bate : '',
				Time : '',
				Comment : '',
			}
		}
		
		/*add_Record=()=>{
			
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
		}*/
		
		render() {
			var A = realm.objects('Cleaning_Timestamp');
			var myJSON = JSON.stringify(A);
			
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<View style={styles.DB_header}>
						<Image source={require('./res/cleaning_record_icon.png')} />
						<Text style={styles.textStyle}> Cleaning Record </Text>
					</View>
					<View style={{flex:0.7, flexDirection: 'row',  }}>
						<View style={{flex:1, alignItems:'center', borderRightColor:'gray', borderRightWidth: 1 }}>
							<Text style={styles.textStyle}> Date </Text>
						</View>
						<View style={{flex:1, alignItems:'center', }}>
							<Text style={styles.textStyle}> Time </Text>
						</View>
					</View>
					<View style={{flex:8, flexDirection: 'row', }}>
						<FlatList
							data={ A }
							renderItem={({item}) => 
							<View style={{flex:1, flexDirection: 'row',}}>
								<View style={{flex:1, alignItems:'center',  borderRightColor:'gray', borderRightWidth: 1}}>
									<Text>{item.date}</Text>
								</View>
								<View style={{flex:1, alignItems:'center',}}>
									<Text>{item.time}</Text>
								</View>
							</View>}
							keyExtractor={(item, index) => index.toString()}
							/>
					</View>				
					<View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
						<Image source={require('./res/home.png')} />
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	
}
/*
<View style={{flex:4, alignItems:'center', borderRightColor: 'gray', borderRightWidth: 1}}>
							<Text style={[styles.textStyle, {marginTop: 10, marginBottom: 10}]}> Date </Text>
							
							<FlatList
							data={ A }
							renderItem={({item}) => 
							<View style={{flex:1, flexDirection: 'row'}}>
								<Text>{item.date}</Text>
							</View>}
							keyExtractor={(item, index) => index.toString()}
							/>
							
						</View>
						<View style={{flex:3, alignItems:'center'}}>
							<Text style={[styles.textStyle, {marginTop: 10, marginBottom: 10}]}> Time </Text>
							<Text> {myJSON}</Text>
						</View>
*/

const styles = StyleSheet.create({
	
	textStyle: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	
	DB_header: {
		flex:1, 
		flexDirection: 'row', 
		alignItems:'center', 
		borderBottomColor: 'gray', 
		borderBottomWidth: 1, 
		backgroundColor: '#fff' },
});

/*
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
*/