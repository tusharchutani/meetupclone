import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { RoundImage } from '../../MokUI/MokUI';
import Constants from '../../MokUI/UIConstants';
import {List, ListItem, Icon, Button} from 'react-native-elements';
import EventFeedItem from './EventFeedItem';
import {setUserConnections,getUserConnections, openEditProfile} from '../../actions'
import {GET_EVENT_INFO} from '../../api'

export default class UserInfoFeed extends Component {
  _val = 0; 
  _isDataCollected = false;
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.state = {
      idOfEventsHostedByUser:this.props.eventsHostedByUser,
      eventsHostedByUser:[],
      loading: false,
      refreshing:false
    };

  }

  navigateToConnections(self, followerOrFollowing){
    
      const {props} = self;
        if(self._val == 0){
        this.setState({isLoading:true});          
        self._val++;
        props.dispatch(setUserConnections(followerOrFollowing,props._id)).then(()=>{
          props.dispatch(getUserConnections());  
          this.setState({isLoading:false});
          setTimeout(()=>{self._val = 0; }, 1000);
        });
      }
  }

  renderHeader(self) {

    const {props} = self;
    let firstName = props.firstname ? props.firstname : "First" ;
    let lastname = props.lastname ? props.lastname: "Lastname";
    let followingNumber =props.following ? props.following.length : 0;
    let followersNumber = props.followers ? props.followers.length : 0;
    let numberOfEvents = props.eventsHostedByUser ? props.eventsHostedByUser.length : 0;
    let userProfilePic = (props.avatarurl != undefined && props.avatarurl != "new") ? props.avatarurl:"http://www.thedigitalkandy.com/wp-content/uploads/2016/01/facebook-no-profile.png";

    return (
          <View style={{flexDirection:'row',alignItems: 'stretch', paddingBottom:10}}>


            <View >
                <View style={styles.profileInfo}>
                  <RoundImage size={100} source={userProfilePic}/>
                  <Text style={styles.name}>{firstName+" "+lastname}</Text>
                </View>
            </View> 

          <View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
              style={[styles.connectionInfoContainer]} 
              onPress={()=>{self.navigateToConnections(self,"follower")}}>
                <Text style={styles.connectionText}>{followersNumber}</Text>
                <Text style={{color:'grey'}}>Follower</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={[styles.connectionInfoContainer]}
                onPress={()=>{self.navigateToConnections(self,"following")}}>
                <Text style={styles.connectionText}>{followingNumber}</Text>
                <Text style={{color:'grey'}}>Following</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.connectionInfoContainer]}>
                <Text style={styles.connectionText}>{numberOfEvents}</Text>
                <Text style={{color:'grey'}}>Events</Text>
              </TouchableOpacity>
            </View>
            {this.props.isMyProfile && 
              <Button
              small
              icon={{name: 'create'}}
              onPress={()=>{this.props.dispatch(openEditProfile())}}
              backgroundColor={Constants.color2}
              buttonStyle={styles.messageButton}
              title='Edit profile' />}
              <View style={{paddingTop:5}}>
                <ActivityIndicator
                animating={this.state.isLoading}
                size="small"/>
              </View>

            {!this.props.isMyProfile && <Button
              small
              icon={{name: 'message'}}
              onPress={()=>{Linking.openURL("mailto:tushar_chuatni@gmail.com").catch(err => console.log('An error occurred', err));}}
              backgroundColor={Constants.color2}
              buttonStyle={styles.messageButton}
              title='Message' /> &&
              <Button
              small
              icon={{name: this.state.followIcon}}
              backgroundColor={Constants.color2}
              buttonStyle={styles.followButton}
              onPress={this.handelFollow}
              title="Follow" />}

          </View>

      </View>);
  }

  componentDidMount(){
    if(this.props.eventsHostedByUser&&(this.props.eventsHostedByUser.length == 0)){
        this.setState({refreshing:false});
    }else{
        this.setState({refreshing:true});
    }
  }

  loadUserProfile(){
    var lenghtOfEventsByUser = this.props.eventsHostedByUser ? this.props.eventsHostedByUser.length:0;
    var lenghtofEventsId = this.state.eventsHostedByUser ? this.state.eventsHostedByUser.length : 0;
    
    if((lenghtOfEventsByUser != lenghtofEventsId)&& !this._isDataCollected){
        this._isDataCollected=true;
        
        let getEvents = this.props.eventsHostedByUser ? this.props.eventsHostedByUser.map((eventId, index)=>{    
          return axios.get(GET_EVENT_INFO(eventId));
        }): [];
        if(getEvents.length == 0){
          this.setState({refreshing:false});
        }
        axios.all(getEvents).then(responses => {
          let temp = responses.map((response) =>{
            if(response.data != null){
              return response.data;
            }
            return {};
          })
          this.setState({eventsHostedByUser:temp,isLoading:false});
      }).catch((error)=>{
        console.log("User info feed error "+error);
        this.setState({eventsHostedByUser:temp,isLoading:false});
        });
  }

  }

  render() {
    this.loadUserProfile();
   return(
        <List>
            <FlatList
             data={this.state.eventsHostedByUser}
             // extraData={this.state} 
             ItemSeparatorComponent
             keyExtractor={(item, index) => index}
             renderItem={({item, index})=>(<EventFeedItem key={`entry-${index}`} {...item}/>)}
             ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
             ListHeaderComponent={this.renderHeader(this)}
            onRefresh={()=>{this.loadUserProfile()}}
            refreshing={this.state.loading}             
           />
        </List>);
  }



}
const MARGIN = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1,
    paddingBottom: 10
  },
  eventInfoHeaderImage:{
  	paddingTop:20,
  	alignItems:'flex-end',
  	height:150
  },profileInfo:{
  	alignItems:'flex-start',
  	marginTop:20,
    marginLeft:15
  },name:{
  	fontSize:15,
  	fontWeight:'bold',
  	marginBottom:5
  },infoContainer:{
  	margin:MARGIN, 
  	marginRight:0
  },connectionInfoContainer:{
    marginTop:30,
    alignItems:'center',
    padding:10
  },connectionText:{
    fontWeight:'bold',
    fontSize:20, 
    color:Constants.color4
  },info:{
  	marginTop:10,
  	color:Constants.color3
  },messageButton:{
    height:20,
    borderRadius:5,
    margin:0
  },followButton:{
    height:20,
    borderRadius:5,
    marginTop:5
  },
  userPhotosIcon:{
  	height:70,
  	width:70,
  	marginRight:MARGIN,
  },   
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor:Constants.tableDividerColor,
  }

});


module.exports = connect()(UserInfoFeed);