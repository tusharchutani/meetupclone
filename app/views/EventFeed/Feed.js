import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import Constants  from '../../MokUI/UIConstants';

import FeedNavigation from './FeedNavigationController'
export default class Feed extends Component {

  static navigationOptions = {
    title:'stuff'
  }

  render() {
    return (
      <View style={styles.container}>
        <FeedNavigation screenProps={{dispatch:this.props.dispatch}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = connect()(Feed);