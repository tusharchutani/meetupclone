import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Constants  from '../../MokUI/UIConstants';

import {FeedNavigation} from './FeedNavigationController'
export default class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FeedNavigation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Feed', () => Feed);