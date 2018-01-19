import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { RoundImage } from '../../MokUI/MokUI';
import Constants from '../../MokUI/UIConstants';
import {List, ListItem, Icon, Button} from 'react-native-elements';
import EventFeedItem from './EventFeedItem';
import {setUserConnections,getUserConnections, openEditProfile, getMyprofile,setUserProfile} from '../../actions'
import {GET_EVENT_INFO,FOLLOW_USER,UNFOLLOW_USER} from '../../api'

export default class UserInfoFeed extends Component {
  _val = 0; 
  _isDataCollected = false;
  _isFollowing = false;

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.state = {
      usergoing:[],
      refreshing:false,
      isLoading:false,
      currentPage:1,
      footerLoading:false

    };

  }

  openBlockingOptions(){
    const {props} = this;

    if(props.profileData.blockedByRequestingUser){
        ActionSheetIOS.showActionSheetWithOptions({
          options: ['Block', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) { 
              props.dispatch(blockUser(props.profileData._id));
          }
        });
    }else{
          ActionSheetIOS.showActionSheetWithOptions({
          options: ['Unblock', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) { 
            props.dispatch(unBlockUser(this.props.profileData._id));
          }
        });   
    }
  }


  navigateToConnections(self, followerOrFollowing){
    
      const {props} = self;
        if(self._val == 0){
        this.setState({isLoading:true});          
        self._val++;
        props.dispatch(setUserConnections(followerOrFollowing,props._id)).then(()=>{
          props.dispatch(getUserConnections());  
          this.removeAllLoading();
          setTimeout(()=>{self._val = 0; }, 1000);
        });
      }
  }


  follow(){
    this.setState({isLoading:true});

    if(!this._isFollowing){
      axios.post(FOLLOW_USER(this.props.userId,this.props._id)).then((response)=>{
        this.setState({isLoading:false,followButtonText:'following',followButtonColor:Constants.color4});
        this._isFollowing = true;
        this.props.dispatch(setUserProfile(this.props._id))
      }).catch(()=>{
        this.setState({isLoading:false});
      })
      
    }else{
      axios.post(UNFOLLOW_USER(this.props.userId,this.props._id)).then((response)=>{
        this.setState({isLoading:false,followButtonText:'follow',followButtonColor:Constants.color2});
        this._isFollowing = false;
        this.props.dispatch(setUserProfile(this.props._id));
      }).catch(()=>{
        this.setState({isLoading:false});
      })      
    }

  }

  renderHeader(self) {


    const {props} = self;
    let firstName = props.firstname ? props.firstname : "First" ;
    let lastname = props.lastname ? props.lastname: "Lastname";
    let followingNumber =props.following ? props.following.length : 0;
    let followersNumber = props.followers ? props.followers.length : 0;
    let numberOfEvents = props.usergoing ? props.usergoing.length : 0;
    let userProfilePic = (props.avatarurl != undefined && props.avatarurl != "new") ? props.avatarurl:"http://www.thedigitalkandy.com/wp-content/uploads/2016/01/facebook-no-profile.png";
    let email = props.email ? props.email : "undfinedemail@gmail.com";
    //check to see if FB image
    if(userProfilePic.indexOf("fbcdn.net") == -1){
      userProfilePic += '?random_number='+ new Date().getTime();  
    }
    
    return (
      <View>
          <View style={{flexDirection:'row',justifyContent:'space-between', alignItems: 'stretch', paddingBottom:10,paddingRight:10}}>


            <View>
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



            {!this.props.isMyProfile && 
              <Button
              small
              icon={{name: 'message'}}
              onPress={()=>{Linking.openURL("mailto:"+email).catch(err => console.log('An error occurred', err));}}
              backgroundColor={Constants.color2}
              disabled={this.props.isBlocked}
              buttonStyle={styles.messageButton}
              title='Message' />}
              {!this.props.isMyProfile &&
              <Button
              small
              backgroundColor={this.state.followButtonColor}
              buttonStyle={styles.followButton}
              disabled={this.state.isLoading || this.props.isBlocked}
              title={this.state.followButtonText}
              onPress={()=>{this.follow()} } />}

              {this.state.isLoading && <ActivityIndicator animating={true}
                                   size="small"/>  }

          </View>
          
        </View>
        <View style={[styles.separator,{flex:1}]} /> 
      </View>);
  }

  setFollowing(nextProps){

    if(!nextProps.isBlocked){
        if(!nextProps.followers){
          this._isFollowing = false;
          this.setState({followButtonText:'follow',followButtonColor:Constants.color2});
        }else{
          if(nextProps.followers.includes(this.props.userId)){
            this._isFollowing = true;
            this.setState({followButtonText:'following',followButtonColor:Constants.color4});
          }else{
            this.setState({followButtonText:'follow',followButtonColor:Constants.color2});
          }
        }
    }else{
      this.setState({followButtonText:'blocked'});
    }
  } 

  componentWillReceiveProps(nextProps){
    if(nextProps.usergoing&&(nextProps.usergoing.length == 0)){
        this.setState({isLoading:false});
    }else{
        this.setState({isLoading:true});
        if(nextProps.usergoing != null && !nextProps.isBlocked){
            this.getUserEventsInfo(1,nextProps.usergoing);
        }else{
        	this.setState({isLoading:false,refreshing:false,usergoing:[]});
        }

    }


    if(nextProps.userId != nextProps._id){
      this.setFollowing(nextProps);
    }
  }


  getUserEventsInfo(page=1,usergoing){
    let startIndex = (page*8)-8;
    let endIndex = (page*8) < usergoing.length ? (page*8) : usergoing.length;

    let getEvents = usergoing.slice(startIndex,endIndex).map((eventId, index)=>{    
      return axios.get(GET_EVENT_INFO(eventId, this.props.userId),{timeout:30000});
    });
    if(getEvents.length == 0){
      this.setState({refreshing:false});
    }
      axios.all(getEvents).then(responses => {
      let temp = [];
      responses.forEach((response) =>{
        if(response.data != null){
          temp.push(response.data);
        }
      });
      if(page == 1){
        //TEMP FIX 
        temp.sort(this.startDateCompare);
        console.log("Temp lenght is "+temp.length);
        this.setState({usergoing:temp,isLoading:false,refreshing:false});
      }else{
        //TEMP FIX 
        let userGoingArr = [...this.state.usergoing, ...temp]; 
        console.log("User going lenght is "+userGoingArr.length);
        userGoingArr.sort(this.startDateCompare);
        this.setState({usergoing:userGoingArr,isLoading:false})
      }
      this.setState({footerLoading:false});
    }).catch((error)=>{
    console.log("User info feed error "+error);
    this.removeAllLoading();
    });
  }

  startDateCompare(a, b){
  if (a.startDate < b.startDate)
    return -1;
  if (a.startDate > b.startDate)
    return 1;
  return 0;    
  }

  handelLoadMore(){
    
    if(this.state.usergoing.length && !this.state.footerLoading){
        this.setState({currentPage:this.state.currentPage+1,footerLoading:true},()=>{
          this.getUserEventsInfo(this.state.currentPage,this.props.usergoing);
        });    	
    }
  }

  reloadProfile(){
    this.setState({refreshing:true,currentPage:1});
    
    if(this.props.isMyProfile){
      this.props.dispatch(getMyprofile()).then(()=>{
        this.removeAllLoading();
      }).catch(err => {
        this.removeAllLoading();
      })
    }else{
      this.props.dispatch(setUserProfile(this.props._id, this.props.userId)).then(()=>{
        this.removeAllLoading();
      }).catch(err => {
          console.log("There was an error updating other profile "+err);
          this.removeAllLoading();
        })
    }
  }

  removeAllLoading(){
    this.setState({reloadProfile:false,isLoading:false, refreshing:false,footerLoading:false});
  }

  render() {
	 const isIOS = Platform.OS === 'ios';

   return(
            <FlatList
            style={styles.container}
             data={this.state.usergoing}
             // extraData={this.state} 
             keyExtractor={(item, index) => index}
             renderItem={({item, index})=>(<EventFeedItem key={`entry-${index}`} {...item}/>)}
             ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
             ListHeaderComponent={this.renderHeader(this)}
             ListFooterComponent={()=>{
                return (this.state.footerLoading && 
                  <View style={{paddingTop:10}}><ActivityIndicator  animating size="small" /></View>);
              }}                
            onRefresh={()=>{this.reloadProfile()}}
            refreshing={this.state.refreshing}           
            onEndReached={()=>{this.handelLoadMore()}}
            onEndReachedThreshold={isIOS ? 0:1}
           />);
  }

}
const MARGIN = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:Constants.screenHeight,
    backgroundColor: Constants.color1,
    paddingBottom: 10
  },
  eventInfoHeaderImage:{
  	paddingTop:20,
  	alignItems:'flex-end',
  	height:150
  },profileInfo:{
  	alignItems:'center',
  	marginTop:20,
    marginLeft:15
  },name:{
  	fontSize:15,
  	fontWeight:'bold',
  	marginBottom:5,
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

var mapStateToProps = (state) =>{
    return {
      userId: state.auth.user_id
  }
}


module.exports = connect(mapStateToProps)(UserInfoFeed);