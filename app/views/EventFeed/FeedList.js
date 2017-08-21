import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import EventFeedItem from './EventFeedItem'
import Constants  from '../../MokUI/UIConstants';

export default class Feed extends Component {


 constructor(props) {
	    super(props);
	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows([{
          eventName: "Party", 
          eventDate: "this.props.eventDate",
          eventTime: "this.props.eventTime",
          eventTags: "this.props.eventTags",
          eventLocation: "this.props.eventLocation",
          attendence: "this.props.attendence",
          bookmark: "this.props.bookmark"
        }, {
          eventName: "Party", 
          eventDate: "this.props.eventDate",
          eventTime: "this.props.eventTime",
          eventTags: "this.props.eventTags",
          eventLocation: "this.props.eventLocation",
          attendence: "this.props.attendence",
          bookmark: "this.props.bookmark"
        }, {
          eventName: "Party", 
          eventDate: "this.props.eventDate",
          eventTime: "this.props.eventTime",
          eventTags: "this.props.eventTags",
          eventLocation: "this.props.eventLocation",
          attendence: "this.props.attendence",
          bookmark: "this.props.bookmark"
        }]),
	    };    
	}	

  render() {
 	return (
    <View style={styles.container}>
      <SearchBar lightTheme onChangeText={searchList} placeholder='Type Here...' />
      <ListView
      dataSource={this.state.dataSource} 
      renderRow={(data) => <EventFeedItem{...data} />}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      /> 
    </View>

    );
  }



}
let searchList = () => {
  console.log('searching list');
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor,
  }

});

AppRegistry.registerComponent('Feed', () => Feed);