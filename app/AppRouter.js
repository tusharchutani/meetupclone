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
import MapEvents from './views/MapView/MapEvents';
import EventMap from './views/MapView/EventMap';
import FeedNavigationController from './views/EventFeed/FeedNavigationController';
import FeedList from './views/EventFeed/FeedList';
import EventInfo from './views/EventInfo/EventInfo';
import PeopeInfo from './views/EventInfo/PeopeInfo';
import MyProfile from './views/EventFeed/Profile/MyProfile';
import OtherUserProfile from './views/EventFeed/Profile/OtherUserProfile';
import MyEvents from './views/EventFeed/MyEvents';
import Connections from './views/Connections/Connection';
import Followers from './views/Connections/Followers';
import Settings from './views/Settings/Settings';
import CreateEvent from './views/CreateEvent/CreateEvent';
import LoginSignup from './views/Login/LoginSignup';
import LoginScreen from './views/Login/LoginScreen'
import ForgotPassword from './views/Login/ForgotPassword'
import SignUp from './views/Login/SignUp';
import EditProfile from './views/Profile/EditProfile';
import EventEdit from './views/EventInfo/EventEdit';
import NotificationCenter from './views/Notifications/NotificationCenter';


import { StackNavigator, 
	TabNavigator, 
	DrawerNavigator,
	addNavigationHelpers,
	DrawerItems} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants  from './MokUI/UIConstants';



const MainTabs = TabNavigator({
		EventFeed: {
			screen: FeedList,
			navigationOptions:{
				tabBarLabel:'Event Feed',
				tabBarIcon: ({tintColor}) => <Icon name="list" size={28} color={tintColor}/>,
			}
		},
		MapView:{ 
		//will be the tinder cards according
		screen: MapEvents,
		navigationOptions:{
			tabBarLabel:"Around me",
			tabBarIcon: ({tintColor}) => <Icon name="adjust" size={28} color={tintColor}/>,
			header:null
			},
		},
		MyEvents:{
			screen:MyEvents,
			navigationOptions:{
				title:"Your events",
				headerLeft:null,
				 tabBarIcon: ({tintColor}) => <Icon name="done" size={28} color={tintColor}/>,
			}
		},
		NotificationCenter:{
			screen: NotificationCenter,
			navigationOptions:{
				tabBarLabel:""
			}			
		},		
		UserInfoFeed: { 
			screen: MyProfile,
			navigationOptions:{
				tabBarLabel:"User profile",
				tabBarIcon: ({tintColor}) => <Icon name="person-pin" size={28} color={tintColor}/>,
				header:null
			}
		},
		Settings: { 
			screen: Settings,
			navigationOptions:{
				// tabBarLabel:"Settings",
				tabBarIcon: ({tintColor}) => <Icon name="settings" size={28} color={tintColor}/>,
				header:null
			}
		}		
},	{
		tabBarOptions:{
			activeTintColor:Constants.color2 ,
			showIcon:true,
			showLabel: false,
			inactiveTintColor: Constants.color3,
			style: {
			   backgroundColor: Constants.color1,
			}
		},
		tabBarPosition: 'bottom',
		swipeEnabled:false
});


const MokAppRouter = new StackNavigator({
	LoginSignup:{
		screen: LoginSignup,
		// navigationOptions:{header:null}
	}, LoginScreen:{
		screen:LoginScreen,
		navigationOptions:{title:'Log in'}
	},ForgotPassword:{
		screen:ForgotPassword,
		navigationOptions:{title:'Forgot password'}
	}, SignUp:{
		screen:SignUp,
		navigationOptions:{title:'Sign up'}
	},EventEdit:{
		screen:EventEdit,
		navigationOptions:{title:'Edit event'}
	},MainApp:{
		screen: MainTabs,
	    navigationOptions: {
	        gesturesEnabled: false,
	    }		
	},
  	EventInfo: {
  		screen: EventInfo,
		// navigationOptions:{header:{visible:true}}
  	},PeopeInfo:{
  		screen: PeopeInfo
  	}, CreateEvent:{
		screen: CreateEvent
	},Connections:{
		screen:Connections
	},EditProfile:{
		screen:EditProfile,
		navigationOptions:{header:null}
	},UserProfile:{
		screen:OtherUserProfile
	},
	EventMap:{
		screen:EventMap
	}
});


module.exports = MokAppRouter;




