import React, { Componenet } from 'react';
import {View, FlatLists, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {updateTodoList, deleteTodoList, queryAllTodoLists } from '../databases/allSchemas';
import realm from '../databases/allSchemas';
import Swipeout from 'react-native-swipeout';
 
let FlatListItem = props => {
	const {itemIndex, id, name, creationDate, popupDialogComponent, onPressItem } = props;
	showEditModel = () =>{
			
	}
	
	showDeleteConfirmation = () => {
		Alert.alert(
			'Delete',
			'Delete a todoList',
			[
				{
					text: 'No', onPress: () => { },
					style: 'cancle'
				},
				{
					text: 'Yes', onPress: () => {
					}
				},
			],
			{ cancelable: true }
		);
	}
	return (
	<Swipeout right={[
		{
			text: 'Edit',
			backgroundColor: 'rgb(81,134,237)',
			onPress: showEditModal
		},
		{
			text: 'Delete',
			backgroundColor: 'rgb(217, 80, 64)',
			onPress: showDeleteConfirmation
		}
	]} autoClose={true}>
		
	</Swipeout>
	);
}

export default class TodoListComponent extends Componenet {
	constructor(props) {
		super(props);
		this.state = {
			todoLists: []
		};
	}
	
	reloadData = () => {
		queryAllTodoLists().then((todoLists) => {
			this.setState({todoLists});
		}).catch((error) => {
			this.setState({ todoLists: [] });
		});
		console.log('reloadData');
	}
	
	render() {
		return (<View style={styles.container}>
			<HeaderComponent />
			<FlatList
				style={styles.flatList}
				data={this.state.todoLists}
				renderItem = {({item,index}) => </FlatListItem {...item} itemIndex={index}/>}
				onPressItem={()=> {
					alert('You pressed item');
				}} />}
				keyExtractor = {item => item.id}
			/>
			<PopupDialogComponent ref={"popupDialogComponent"} />
		</View>);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    }
});