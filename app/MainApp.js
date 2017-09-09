/*
NOTES: 
create event: control-point

*/
import React, {Component} from 'react';
import {ScrollView, 
	View, 
	Text, 
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert 	} from 'react-native';
import TestView from './views/TestView';
import Feed from './views/EventFeed/Feed';
import EventInfo from './views/EventInfo/EventInfo';
import Connections from './views/Connections/Connection';
import Settings from './views/Settings/Settings';
import CreateEvent from './views/CreateEvent/CreateEvent'
import LoginSignupNavigation from './views/Login/LoginSignupNavigation'
import {connect} from 'react-redux';
import {authUser} from './actions';
//TODO: remove
import UserProfile from './views/Profile/Profile';


import { StackNavigator, 
	TabNavigator, 
	DrawerNavigator,
	addNavigationHelpers,
	DrawerItems} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants  from './MokUI/UIConstants';



const MainTabs = TabNavigator({
		EventFeed: {
			screen: Feed,
			navigationOptions:{
				tabBarLabel:'Event Feed',
				tabBarIcon: ({tintColor}) => <Icon name="list" size={28} color={tintColor}/>,
			}
		},
		SearchEvent:{ 
		//will be the tinder cards according 
		screen: TestView,
		navigationOptions:{
			tabBarLabel:"Around me",
			tabBarIcon: ({tintColor}) => <Icon name="adjust" size={28} color={tintColor}/>,
			},
		},
		UserProfile: { 
			screen: UserProfile,
			navigationOptions:{
				tabBarLabel:"User profile",
				tabBarIcon: ({tintColor}) => <Icon name="person-pin" size={28} color={tintColor}/>,
			}
		},
 
	},	{
		tabBarOptions:{
			activeTintColor: Constants.color2,
			showIcon:true
		}
	});


const InfoScreens = DrawerNavigator({
	MainTabs:{
		screen: MainTabs,
		title: 'Home',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="home" color={tintColor}/>),
			drawerLabel:'Home',
		}
	}, Connections:{ 
		//this will have follower and following
		screen: Connections,
		title: 'Connections',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="group" color={tintColor}/>),
		}

	}, Profile: {
		//will be able to edit the profile
		screen: TestView,
		title: 'Profile',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="account-circle" color={tintColor}/>)
		}		
	}, Settings:{
		screen: Settings,
		title: 'Settings',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="settings" color={tintColor}/>),
		}
	}
},{
	contentComponent:props => drawerMenu({props}),
     contentOptions: {
     style: {
       flex: 1,
       paddingTop: 15,
      }
   	}

  });

let drawerMenu = ({props}) =>{

	let logout = () => {
		Alert.alert(
			  'Log out?',
			  'Are you sure you want to Log out?',
			  [
  			    {text: 'Yes', onPress: () => {console.log('OK Pressed')},  style: 'cancel'},
			    {text: 'No', onPress: () => console.log('Cancel Pressed')},

			  ],
			  { cancelable: false }
			)
	}

	let logoutButton = (
		<TouchableOpacity style={{paddingTop:7, flexDirection:'row'}} onPress={logout}>
			<Icon style={{paddingLeft: 17, paddingRight:33}} name="exit-to-app" color={Constants.color3}/>
			<View style={{justifyContent:'center'}}><Text style={{fontWeight:'bold'}}>Sign out</Text></View>
		</TouchableOpacity>);


	return (<ScrollView style={{backgroundColor:Constants.color1}}>
		<View> 
			<View style={{justifyContent:'center',flex:1, alignItems:'center'}}>
				<Image style={{width: 100, height: 100, borderRadius:50, borderColor:Constants.color1, borderWidth:2,alignItems: 'center',justifyContent:'center'}}  
				source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
				<Text style={{justifyContent:'center',marginTop:10,fontSize:20}}> Faceook image </Text>
			</View>
		</View>
		<DrawerItems {...props} />
		{logoutButton}
		</ScrollView>);

};

const MokAppScreens = new StackNavigator({
	InfoScreens:{
		screen: InfoScreens,
	}, CreateEvent:{
		screen: CreateEvent
	}}, {
  	mode: 'modal',
  	headerMode: 'none',
	});


const MokApp = new StackNavigator({
	LoginSignup:{
		screen: LoginSignupNavigation,
	}, MainApp:{
		screen: MokAppScreens
	}}, {
  	headerMode: 'none',
	}
);


module.exports = MokApp;




