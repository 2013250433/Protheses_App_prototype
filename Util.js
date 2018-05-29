import React, { Component } from 'react'

export default class Util() extends Component{
	
	componentWillMount(){
		this.callStorage();
	}
	
	callStorage = async() => {
		try{
			let value = await AsyncStorage.getItem('@complete');
			if(value == 'true_jin'){
				
			}
			else{
				alert('거짓');
				this.setState({completeSwitch:false});
			}
				
		}
		catch(error){
		}
	}
	
	constructor(){
		
	}
	
	render(){
		
	}
}