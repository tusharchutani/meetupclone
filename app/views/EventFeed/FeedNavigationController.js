import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {AppRegistry} from 'react-native';
import FeedList from './FeedList'
import { Icon } from 'react-native-elements'
import Constants  from '../../MokUI/UIConstants';


const openCreateEventPage = (navigation) => {
	navigation.navigate('CreateEvent');
}


export const FeedNavigation = StackNavigator({
  FeedList: {
  		screen: FeedList, 
  	}
  },{  		
  	navigationOptions: ({ screenProps }) => ({
			title:'Event Feed',
	  		headerLeft: <Icon name="menu" style={{paddingLeft:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={()=> {screenProps.rootNavigation.navigate('DrawerOpen');}}/>,
	  		headerRight: <Icon name="add" style={{paddingRight:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={() => {screenProps.rootNavigation.navigate('CreateEvent');}}/>
		  	
	})
});


