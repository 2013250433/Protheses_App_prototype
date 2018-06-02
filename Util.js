import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';

/*export default class Util extends Component<props>{
	
	constructor(){
		super();
		this.state = {
			time: 0,
		}
	}

}
*/	
	export function storeAcross(value) {
		AsyncStorage.setItem('@cleaning_time',value.toString());
	}

	export function getStorage(){ 
		getData();
	}

	getData = async() => {
	let value = await AsyncStorage.getItem('@cleaning_time');
		//alert(value);
	}

