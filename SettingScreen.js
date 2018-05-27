import React, { Component } from 'react';
import {Text, View, TouchableOpacity,-} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'firebase'

export default class SettingScreen extends Component<{}> {
	componentDidMount(){
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    // play services are available. can now configure library
})
.catch((err) => {
  console.log("Play services error", err.code, err.message);
})


GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  //iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
  webClientId: "271497519171-hj1mk87fih330cn4kj9gfc2fjk9mcl9d.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  //offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //hostedDomain: '' // specifies a hosted domain restriction
  //forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login
  //accountName: '' // [Android] specifies an account name on the device that should be used
})
.then(() => {
  // you can now call currentUserAsync()
});
	}
	
handle(){
	GoogleSignin.signIn()
.then((user) => {
  console.log(user);
  this.setState({user: user});
})
.catch((err) => {
  console.log('WRONG SIGNIN', err);
})
.done();
}
	render(){
		return(
		<View><GoogleSigninButton
    style={{width: 48, height: 48}}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.handle.bind(this)}/>
</View>		
		);
	}
}

//<TouchableOpacity onPress = {this._callGoogle.bind(this)}> <View style = {styles.button}> <Text style={styles.buttonText}>Google Sign In</Text> </View> </TouchableOpacity>
		
const styles ={
button: {
justifyContent: 'center',
alignItem: 'center',
padding: 10,
borderRadius: 10,
backgroundColor: 'rgb(202, 0, 0)'
},
buttonText: {
fontSize: 16,
fontWeight: 'bold',
color: '#FFFFFF'
}

}