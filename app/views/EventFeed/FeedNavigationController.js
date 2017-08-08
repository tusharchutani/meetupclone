import React from 'react';
import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';

import FeedList from './FeedList'

export const FeedNavigation = StackNavigator({
  FeedList: {
  		screen: FeedList, 
  		navigationOptions:{
  			title:'Event Feed'
  		} 

  	},
});