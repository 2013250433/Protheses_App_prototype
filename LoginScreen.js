import React, { Component } from 'react';
import {Text, View, TouchableOpacity,} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  StackNavigator,
} from 'react-navigation';

import firebase from 'firebase';

export default class LoginScreen extends Component<{}> {
	
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
		<View>
			<GoogleSigninButton style={{width: 48, height: 48}} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this.onLoginOrRegister}/>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
				<Text> To HomeScreen</Text>
			</TouchableOpacity>
		</View>		
		);
	}
}
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