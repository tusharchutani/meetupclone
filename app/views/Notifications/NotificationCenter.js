import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
export default class NotificationCenter extends Component {
  renderNotifcation(type, info){

  }

  componentDidMount(){
  	console.log("Component did mount");
  }

  render() {
    return (
    <View style={styles.container}> 
        <FlatList
          enableEmptySections={true}
          keyExtractor={(item, index) => index}
          data={this.props.notificationList} 
          renderItem={({ item }) => {this.renderNotifcation(...item)}}
          ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onRefresh={()=>{this.getNotifications()}}
          refreshing={this.state.loading}
        />
	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

var mapStateToProps = (state) =>{
	return {
		notificationList: state.notifications.notificationList
	}
}

module.exports = connect(mapStateToProps)(NotificationCenter);