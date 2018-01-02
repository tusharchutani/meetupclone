import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator
} from 'react-native';
import EventFeedItem from './EventFeedItem';
import {List, ButtonGroup,Icon} from 'react-native-elements';
import axios from 'axios';
import Constants from '../../MokUI/UIConstants';
import {SecureStore} from 'expo';
import {GET_ALL_INTERESTED_EVENTS,GET_ALL_GOING_EVENTS} from '../../api';
import {connect} from 'react-redux';

export default class MyEvents extends Component{
  onEndReachedCalledDuringMomentum = true;
  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      loading: false,
      eventList: [],
      selectedIndex: 0,
      userId:'',
      goingEvents:[], 
      intrestedEvents:[],
      currentPage:1,
      footerLoading:false
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

  makeRemoteRequest(){
    this.setState({loading:true});
    if(this.state.userId == null){
      return;
    }


    axios.get(GET_ALL_GOING_EVENTS(this.state.userId)).then((response)=>{
      
        this.setState({goingEvents:response.data.filter(event=>event != null)});

      axios.get(GET_ALL_INTERESTED_EVENTS(this.state.userId),{timeout:10000}).then((response)=>{
        this.setState({loading:false});

        this.setState({intrestedEvents:response.data.filter(event=>event != null)});
        
        if(this.state.selectedIndex == 0){
          this.setState({eventList:this.state.goingEvents.slice(0,8)});
        }else{
          this.setState({eventList:this.state.intrestedEvents.slice(0,8)});
        }
        this.setState({footerLoading:false});
      })
    }).catch((error)=>{
      this.setState({loading:false});
      this.setState({footerLoading:false});
    });


  };
  componentWillReceiveProps(nextProps){
    this.setState({loading:true});
    if(nextProps.userId){
          this.setState({userId:nextProps.userId});
          this.makeRemoteRequest();
      }
  }



  componentDidMount(){
    this.props.navigation.setParams({
      refresh: this.makeRemoteRequest.bind(this) 
    });
  }


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
  
  refresh(){
    this.setState({currentPage:1},()=>{
      this.makeRemoteRequest();
    })
    
  }
  handelLoadMore(){
    if((this.state.eventList.length >= 8) && !this.state.footerLoading)
    {    
      this.setState({footerLoading:true});
      this.setState({
        currentPage:this.state.currentPage+1,
      },()=>{
          var perPage = 8;
          var goingEventsLenght = this.state.goingEvents.length;
          var intrestedEventsLenght = this.state.intrestedEvents.length;
          var goingEventsendingIndex = (perPage * this.state.currentPage) > goingEventsLenght?goingEventsLenght:(perPage * this.state.currentPage);
          var intrestedEventsEndingIndex = (perPage * this.state.currentPage) > intrestedEventsLenght?intrestedEventsLenght:(perPage * this.state.currentPage);
          if(this.state.selectedIndex == 0){
            this.setState({eventList:this.state.goingEvents.slice(0,goingEventsendingIndex),footerLoading:false});
          }else{
            this.setState({eventList:this.state.intrestedEvents.slice(0,intrestedEventsEndingIndex),footerLoading:false});
          }
      })
    }
  }

  render() {

    const isIOS = Platform.OS === 'ios';

    return (
      <View style={{flex:1}}>
        <FlatList
          data={this.state.eventList}
          ListFooterComponent={()=>{
            return (this.state.footerLoading && 
              <View style={{paddingTop:10}}><ActivityIndicator  animating size="small" /></View>);
          }}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (<EventFeedItem {...item}/>)}
          ListHeaderComponent={this.renderHeader(this)}
          onRefresh={()=>{this.refresh()}}
          refreshing={this.state.loading}
          ListEmptyComponent={()=>{
            return (<View style={{alignItems:'center',justifyContent:'space-around'}}><Text style={styles.noEventsText}>There are no events to show</Text></View>)}}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}  
          onEndReached={()=>{this.handelLoadMore()}}
          onEndReachedThreshold={isIOS ? 0:1}          
          
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