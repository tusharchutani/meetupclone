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
  if(this.props.userId == null){
    return;
  }
   axios.get(GET_ALL_HOSTS_EVENTS(this.props.userId),{timeout:10000}).then((response)=>{
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
          ListEmptyComponent={()=>{
            return (<View style={{alignItems:'center',justifyContent:'space-around'}}><Text style={styles.noEventsText}>There are no events to show</Text></View>)}}
          
        />
      </View>
    );
  }
}

  // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      
const styles = StyleSheet.create({
  noEventsText:{
    paddingTop:Constants.screenHeight*0.25, 
    fontWeight:'bold',
    fontSize:15,
    color:Constants.color3
  }
});


var mapStateToProps = (state) => {
  return {
    userId: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(MyEvents); 