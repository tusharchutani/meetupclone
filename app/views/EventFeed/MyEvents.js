import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import EventFeedItem from './EventFeedItem';
import {List, ButtonGroup,Icon} from 'react-native-elements';
import axios from 'axios';
import Constants from '../../MokUI/UIConstants';
import {SecureStore} from 'expo';
import {GET_ALL_HOSTS_EVENTS} from '../../api';
import {connect} from 'react-redux';

export default class MyEvents extends Component{
  
  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      loading: false,
      eventList: [],
      selectedIndex: 0,
      userId:'',
      goingEvents:[], 
      intrestedEvents:[]
    };
  }
  updateIndex(selectedIndex){

    if(selectedIndex == 0){
      this.setState({eventList:this.state.goingEvents});
    }else{
      this.setState({eventList:this.state.intrestedEvents});
    }
    this.setState({selectedIndex});
  }
  componentDidMount(){
    this.setState({loading:true});
    SecureStore.getItemAsync('user_id').then((userId)=>{
      this.setState({userId});
          this.makeRemoteRequest();
    }).catch((error)=>{
      console.log("My events error "+error)
    })

    this.props.navigation.setParams({
      refresh: this.makeRemoteRequest.bind(this) 
    })
  }

  makeRemoteRequest = () => {
    this.setState({loading:true});
   axios.get(GET_ALL_HOSTS_EVENTS(this.props.userId)).then((response)=>{
    var goingEvents = response.data.filter((event)=>(event.currentUserGoing == true));
    var intrestedEvents = response.data.filter((event)=>(event.currentUserInterested == true));

    this.setState({loading:false, goingEvents, intrestedEvents});
    if(this.state.selectedIndex == 0){
      this.setState({eventList:goingEvents});
    }else{
      this.setState({eventList:intrestedEvents});
    }

   }).catch((error)=>{
    this.setState({loading:false});
   })
  };

renderHeader(self){
    const buttons = ['Going', 'Interested']
    const { selectedIndex } = self.state
 return (<ButtonGroup
       containerBorderRadius={10}
       onPress={self.updateIndex}
       selectedIndex={selectedIndex}
       buttons={buttons}
       containerStyle={{height: 35,backgroundColor:'transparent'}} />)
} 
  

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
          data={this.state.eventList}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (<EventFeedItem {...item}/>)}
          ListHeaderComponent={this.renderHeader(this)}
          onRefresh={this.makeRemoteRequest}
          refreshing={this.state.loading}
        />
        {this.state.eventList.length == 0 &&<Text style={[styles.loadingContainer, {alignItems:'center'}]}>No events to show</Text>}
      </View>
    );
  }
}

  // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      
const styles = StyleSheet.create({

  loadingContainer:{
      backgroundColor:'transparent',
      flex:1,
      width:Constants.screenWidth,
      position:'absolute',
      justifyContent: 'center',
      alignItems:'center',
      marginTop:Constants.screenHeight*0.4
  }
});


var mapStateToProps = (state) => {
  return {
    userId: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(MyEvents); 