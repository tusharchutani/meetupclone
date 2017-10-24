import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {AppRegistry} from 'react-native';
import FeedList from './FeedList';
import { Icon } from 'react-native-elements';
import EventInfo from '../EventInfo/EventInfo'
import Constants  from '../../MokUI/UIConstants';
import {openCreateEvent} from '../../actions';

const openCreateEventPage = (navigation) => {
	navigation.navigate('CreateEvent');
}

const FeedNavigation = StackNavigator({
  FeedList: {
  		screen: FeedList
      }
  },{  		
  	navigationOptions: ({ screenProps }) => ({
			title:'Event Feed',
	  		headerRight: <Icon name="add" style={{paddingRight:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={() => {
          this.props.dispatch(openCreateEvent());
        }}/>,
        // headerLeft: <Icon name="map" style={{paddingLeft:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={() => {
        //   this.props.dispatch(openCreateEvent());
        // }}/>        

		  	
	})
});

module.exports = FeedNavigation;

