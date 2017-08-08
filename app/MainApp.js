/*
NOTES: 
create event: control-point

*/
import React from 'react';
import {ScrollView, 
	View, 
	Text, 
	Image,
	StyleSheet 	} from 'react-native';
import TestView from './views/TestView';
import Feed from './views/EventFeed/Feed';
import EventInfo from './views/EventInfo/EventInfo';
import { StackNavigator, TabNavigator, DrawerNavigator,DrawerItems} from 'react-navigation';
import { Icon } from 'react-native-elements'

//TODO: remove
import UserProfile from './views/Profile/Profile';

const MainTabs = TabNavigator({
		UserProfile: { 
			screen: UserProfile,
			navigationOptions:{
				tabBarLabel:"User profile",
				tabBarIcon: ({tintColor}) => <Icon name="person-pin" size={28} color={tintColor}/>,
			}
			/*will have 3 screens
			screen1: hosting, 
			screen2: bookmarked,
			screen3: going
			*/
		},	
		MyEvents: { 
			screen: EventInfo,
			navigationOptions:{
				tabBarLabel:null,
				tabBarIcon: ({tintColor}) => <Icon name="person-pin" size={28} color={tintColor}/>,
			}
			/*will have 3 screens
			screen1: hosting, 
			screen2: bookmarked,
			screen3: going
			*/
		},
		EventFeed: {
			screen: Feed,
			navigationOptions:{
				tabBarLabel:'Event Feed',
				tabBarIcon: ({tintColor}) => <Icon name="list" size={28} color={tintColor}/>,
			}
		}, SearchEvent:{ 
			//will be the tinder cards according 
			screen: TestView,
			navigationOptions:{
				tabBarLabel:"Around me",
				tabBarIcon: ({tintColor}) => <Icon name="adjust" size={28} color={tintColor}/>,
			},
		}, 
	},	{
		tabBarOptions:{
			activeTintColor: 'black',
			style:{
				
				// backgroundColor:'rgba(255,255,255,0.3)'
			}
		}
	});


export const MokApp = DrawerNavigator({
	MainTabs:{
		screen: MainTabs,
		title: 'Home',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="home" color={tintColor}/>),
			drawerLabel:'Home'
		}
	}, Connections:{ 
		//this will have follower and following
		screen: TestView,
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
		screen: TestView,
		title: 'Settings',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="settings" color={tintColor}/>),
		}
	},Logout:{
		screen: TestView,
		title: 'Log out',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="exit-to-app" color={tintColor}/>),
		}
	}
},{
	contentComponent:props => drawerMenu({props}),
     contentOptions: {
 		// activeBackgroundColor:'black',
   //   	activeTintColor: 'white',
   //   	inactiveTintColor:'black',
     
     style: {
       flex: 1,
       paddingTop: 15,
       // backgroundColor:'black',
      }
   	}

  });

let drawerMenu = ({props}) =>{
	return (<ScrollView style={{backgroundColor:'white'}}>
		<View style={styles.container}> 
			<View style={{justifyContent:'center',flex:1, alignItems:'center'}}>
				<Image style={{width: 100, height: 100, borderRadius:50, borderColor:'white', borderWidth:2,alignItems: 'center',justifyContent:'center'}}  
				source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
				<Text style={{justifyContent:'center',marginTop:10,fontSize:20}}> Faceook image </Text>
			</View>
		</View>
		<DrawerItems {...props} /></ScrollView>);

};


const styles = StyleSheet.create({

	container:{
		height: 150,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flex:1,
    	marginTop:30,

	}

});





