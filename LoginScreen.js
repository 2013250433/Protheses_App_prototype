import React, { Component } from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity, Image, Button, Text, TextInput } from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  StackNavigator,
} from 'react-navigation';

import firebase from 'firebase';

export default class LoginScreen extends Component<{}> {
	
	constructor(){
		super();
		this.state = {
			//statement: "For your precious protheses",
		};
	}
	
	componentDidMount(){
		var config = {
    apiKey: "AIzaSyDjaidcL15uiCVsbnO3lGcxT0VrLBZiLJw",
    authDomain: "prothesesapp-85a41.firebaseapp.com",
    databaseURL: "https://prothesesapp-85a41.firebaseio.com",
    projectId: "prothesesapp-85a41",
    storageBucket: "prothesesapp-85a41.appspot.com",
    messagingSenderId: "514936092191"
  };
  firebase.initializeApp(config);
/*		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    // play services are available. can now configure library
})
.catch((err) => {
  console.log("Play services error", err.code, err.message);
})
*/


GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  //iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
  webClientId: "514936092191-fr8sb1siqfrbo6t6v6unb7lb2jk81gce.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
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
  alert(user);
  this.setState({user: user});
})
.catch((err) => {
  console.log('WRONG SIGNIN', err);
  alert("fuck"+err);
  
})
.done();
}

//react-native-firebase code
googleLogin = async () => {
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.toJSON()));
  } catch (e) {
    console.error(e);
  }
}

//medium invertarse code
onLoginOrRegister = () => {
  GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
	  alert(user);
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
	  alert(error);
    });
}

	render(){
		return(
		<View style={{flex:1, flexDirection: 'row', backgroundColor:'white'}}>
			<Image style={{position:'absolute', height: 280, width: 280, right:0, top:50 }} source={require('./res/login_steel.png')}/>
			<GoogleSigninButton style={{position:'absolute', width: 48, height: 48, right:5, bottom:170 }} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this.onLoginOrRegister}/>
			<Text style={{position:'absolute', right:55, bottom:180}}>Sign in</Text>
			
			<View style={{flex: 7, backgroundColor:'#EEE' , paddingLeft: 30, opacity: 0.7}}>
				<View style={{flex:4, justifyContent: 'center'}}>
					<Text style={{fontSize: 40, fontWeight: 'bold'}}>For your{'\n'}precious{'\n'}protheses</Text>
				</View>
				<View style={{flex:2, justifyContent: 'center'}}>
					<Text>EMAIL ADDRESS</Text>
					<TextInput placeholder="admin"></TextInput>
					<Text>PASSWORD</Text>
					<TextInput placeholder="**********"></TextInput>
				</View>	
				<View style={{flex:4, justifyContent: 'center', paddingRight: 30}}>
					<Button color="#0099DD" onPress={() => this.props.navigation.navigate('Home')} title="login"></Button>
				</View>
				
			</View>
			
			<View style={{flex: 3}}>
			</View>
			
			
		</View>		
		);
	}
}
/*

<View style={{flex: 3}}>
					<Text>"For your precious protheses"</Text>
				</View>
				
				<View style={{flex: 2}}> <Text>"For your precious protheses"</Text></View>
				<View style={{flex: 1}}><Text>"For your precious protheses"</Text> </View>

<GoogleSigninButton style={{width: 48, height: 48}} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this.onLoginOrRegister}/>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
				
			</TouchableOpacity>

*/
// this.handle.bind(this)
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