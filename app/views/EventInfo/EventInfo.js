import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { Icon,Button, FormInput } from 'react-native-elements';
import Constants from '../../MokUI/UIConstants';
import {SecureStore} from 'expo';
import {GOING_TO_EVENT,NOT_GOING_TO_EVENT,GET_USER_PROFILE,INTRESTED_IN_EVENT} from '../../api';
import {openEditEvent, showErrorAlert,OPEN_PEOPLE_INFO,getEventInfo} from '../../actions';
import {POSTCOMMENT,GET_COMMENTS} from '../../api'
export default class EventInfo extends Component {
  

 constructor(props) {
	    super(props);
      this.state = {
        id:this.props.eventInfo._id ? this.props.eventInfo._id : "",
        eventTitleImage: this.props.eventInfo.backgroundimage ? this.props.eventInfo.backgroundimage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
        eventName: this.props.eventInfo.title ? this.props.eventInfo.title : "", 
        eventDate: this.props.eventInfo.startDate ? new Date(this.props.eventInfo.startDate).toString() : null,
        eventTags: this.props.eventInfo.tags,
        eventLocation: this.props.eventInfo.streetname, //TODO: change this to address
        userGoing: this.props.eventInfo.currentUserGoing,
        userInterested:this.props.eventInfo.currentUserInterested,
        goingPeople:this.props.eventInfo.going ? this.props.eventInfo.going : [],
        description: this.props.eventInfo.description,
        host: this.props.eventInfo.host ? this.props.eventInfo.host : null,
        RSVPButtonDisabled:false,
        isLoading:false,
        hostname:"",
        isCommentTextBoxVisible:false,
        comment:"",
        isPostingComment:false,
        gotHostName:false,
        comments:[],
        gotComments:false,
        loading:false
      };

	}		


  _val = 0;
  static navigationOptions = ({navigation}) => {
   return {title: this.state ? this.state.eventName : "Event info"}  
  }




  getComments(id){
    console.log("Getting comments");
     axios.get(GET_COMMENTS(id)).then((response)=>{
      this.setState({comments:response.data.posts,gotComments:true});
    }).catch((error)=>{
      console.log("There was an error getting the data from the server. "+error);
    });
    
  }

  postComment(){
    this.setState({isPostingComment:true});
    axios.post(POSTCOMMENT(this.props.userId,this.state.id),{comment:this.state.comment}).then(()=>{
      this.getComments(this.state.id);
      // let comments = this.state.comments;
      // comments.push({firstname:"You",lastname:"",usercomment:this.state.comment});
      this.setState({comment:"",isPostingComment:false});


    }).catch((error)=>{
      this.setState({isPostingComment:false});
    });
  }

  renderDiscussionBoard(){
    return (
      <View style={[{paddingLeft:0,paddingRight:0},styles.eventInfoContainer]}> 
      <Text style={styles.title}>Discussion board: </Text>

      <View style={{flexDirection:'row'}}>
                <ActivityIndicator
            animating={this.state.isPostingComment}
          size="small"/>
         <FormInput inputStyle={{color:Constants.color2,flex:1, width:260}}
          onChangeText={(event)=>{this.setState({comment:event});}}
          placeholderTextColor={Constants.color3}
          value={this.state.comment}
          placeholder="Add public event" />
          <Icon
            name="send" 
            onPress={()=>{this.postComment()}}/>


      </View>
        
          <FlatList
            keyExtractor={(item, index) => index}
            data={this.state.comments} 
            renderItem={({ item }) =>{
              return (<View style={{paddingBottom:10}}>
              <Text style={{fontWeight:'bold', fontSize:16,marginBottom:5}}>{item.firstname + " "+ item.lastname}</Text>
              <Text>{item.usercomment}</Text>
              </View>);
            }}
          />    
      </View>    );
  }


  onGoing(){
  this.setState({RSVPButtonDisabled:true,isLoading:true});
    if(!this.state.userGoing){
      axios.get(GOING_TO_EVENT(this.props.userId,this.state.id)).then((response)=>{
          this.setState({RSVPButtonTitle:'Going',
            RSVPButtonDisabled:false,
            InterestedButtonColor:Constants.color2,
            userGoing:true,isLoading:false,RSVPButtonColor:Constants.color4});
      }).catch((error)=>{
      this.setState({RSVPButtonDisabled:false,isLoading:false});
      })
    }else{
        axios.get(NOT_GOING_TO_EVENT(this.props.userId,this.state.id)).then((response)=>{
            this.setState({RSVPButtonTitle:'RSVP',
              attendanceIcon:'star',userGoing:false,
              RSVPButtonDisabled:false, isLoading:false,
              RSVPButtonColor:Constants.color2})
          }).catch((error)=>{
          dispatch(showErrorAlert(error));
          this.setState({RSVPButtonDisabled:false,isLoading:false});  
        })
      
  }
}

  

  onIntrested(){
    this.setState({RSVPButtonDisabled:true,isLoading:true});
    if(!this.state.userInterested){
      axios.get(INTRESTED_IN_EVENT(this.props.userId, this.state.id)).then(()=>{
        this.setState({
                  RSVPButtonDisabled:false,
                    isLoading:false,
                    attendanceIcon:'star',
                    userGoing:false,
                    userInterested:true,
                    RSVPButtonDisabled:false,
                    RSVPButtonColor:Constants.color2,
                    InterestedButtonColor: Constants.color4
                    })}).catch((error)=>
      {
        console.log("There is an error "+error);
      });
    }else{
      axios.get(NOT_GOING_TO_EVENT(this.props.userId, this.state.id)).then(()=>{
        this.setState({
                    RSVPButtonDisabled:false,
                    isLoading:false,
                    usergoing:false,
                    userInterested:false,
                    RSVPButtonDisabled:false, 
                    isLoading:false,
                    RSVPButtonColor:Constants.color2,
                    InterestedButtonColor: Constants.color2})}).catch((error)=>
      {
        console.log("There is an error "+error);
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.eventInfo != null){
      this.setState({
        id:nextProps.eventInfo._id,
        eventTitleImage: nextProps.eventInfo.backgroundimage ? nextProps.eventInfo.backgroundimage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
        eventName: nextProps.eventInfo.title, 
        eventDate: nextProps.eventInfo.startDate ? new Date(nextProps.eventInfo.startDate).toString() : null,
        eventTags: nextProps.eventInfo.tags,
        eventLocation: nextProps.eventInfo.streetname, //TODO: change this to address
        userGoing: nextProps.eventInfo.currentUserGoing,
        userInterested:nextProps.eventInfo.currentUserInterested,
        goingPeople:nextProps.eventInfo.going ? nextProps.eventInfo.going : [],
        description: nextProps.eventInfo.description,
        host: nextProps.eventInfo.host ? nextProps.eventInfo.host : null
      });
    
      if(nextProps.eventInfo.currentUserGoing){
        this.setState({RSVPButtonColor:Constants.color4});
      }else{
        this.setState({RSVPButtonColor:Constants.color2});
      }

      if(nextProps.eventInfo.currentUserInterested){
        this.setState({InterestedButtonColor:Constants.color4});
      }else{
        this.setState({InterestedButtonColor:Constants.color2});
      } 
 
      this.getComments(nextProps.eventInfo._id);
      
    }    
  }

  openPeopleInfo(){
      this.props.dispatch(OPEN_PEOPLE_INFO());
    }

  reloadEventInfo(){
    this.setState({loading:true});
    if(this.props.eventInfo._id){
        this.props.dispatch(getEventInfo(this.props.eventInfo._id,this.props.userId)).then(()=>{
          this.setState({loading:false});
        }).catch((error)=>{
          this.setState({loading:false});
          this.props.dispatch(showErrorAlert(error.message));
        });
    }else{
      this.setState({loading:false});
    }

  }
      
  render() {

    if(!this.state.gotHostName && this.state.host != null){
      axios.get(GET_USER_PROFILE(this.state.host),{timeout:1000}).then((response)=>{
        var hostname = response.data.firstname + " " + response.data.lastname;
        this.setState({hostname, gotHostName:true});
      }).catch(()=>{
        this.setState({gotHostName:true});
      });      
    }

    var isMyevent = false; 

    if(this.props.userId == this.state.host){
      isMyevent = true;
    }

  	return (
      <KeyboardAvoidingView 
      behavior="padding" 
      style={[{backgroundColor:'transparent'},Constants.styles.fill]}
       keyboardVerticalOffset={80}>
        <ActivityIndicator
          style={styles.loadingContainer}
          animating={this.state.isLoading}
          size="large"/>
          <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={()=>{this.reloadEventInfo()}}
                />}
            >
              <Image style={styles.eventInfoHeaderImage} 
              source={{uri:this.state.eventTitleImage}}>
              <View style={[styles.eventInfoContainer,styles.eventNameInfoContainer]}>
                <Text style={styles.eventInfoName}>{this.state.eventName}</Text> 
                <Text style={styles.eventHostName}>Hosted by {this.state.hostname}</Text>
              </View>
            </Image>
             <View style={{flexDirection:'row',justifyContent:'center'}}>
            {!isMyevent  && 
              <TouchableOpacity style={{padding:10, paddingBottom:5}} onPress={()=>{this.onGoing();}} disabled={this.state.RSVPButtonDisabled}>
                <Icon
                  name='done'
                  color={this.state.RSVPButtonColor}
                  size={40}
                  containerStyle={{backgroundColor:'transparent'}}
                   />
                   <Text style={{fontSize:12, color:this.state.RSVPButtonColor}}>Going</Text>
                  </TouchableOpacity> }

             {!isMyevent  &&  
              <TouchableOpacity style={{padding:10,paddingBottom:5}} onPress={()=>{this.onIntrested();}} disabled={this.state.RSVPButtonDisabled}>
                <Icon
                  name='star'
                  color={this.state.InterestedButtonColor}
                  size={40}
                  containerStyle={{backgroundColor:'transparent'}}
                   />
                   <Text style={{fontSize:12, color:this.state.InterestedButtonColor}}>Interested</Text>
                </TouchableOpacity>
                  }

            {isMyevent 
              && 
               <TouchableOpacity style={{padding:10,paddingBottom:5}} 
               onPress={()=>{
                      if(this._val == 0){
                        this._val++;
                        this.props.dispatch(openEditEvent());
                        setTimeout(()=>{this._val = 0; }, 1000);
                      }
                    }
                  }
                 disabled={this.state.RSVPButtonDisabled}>
                <Icon
                  name='mode-edit'
                  color={this.state.InterestedButtonColor}
                  size={40}
                  containerStyle={{backgroundColor:'transparent'}}
                   />
                   <Text style={{fontSize:12, color:this.state.InterestedButtonColor}}>Edit</Text>
                </TouchableOpacity>
            }

            </View>
          <View style={styles.separator} />        
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer,{paddingTop:0}]}> 
            <Icon name="event" size={Constants.small_icon_size} color={Constants.color3}/>
            <Text style={styles.eventDateTimeInfo}>{this.state.eventDate}</Text>
          </View>
          
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
            <Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
            <Text style={styles.eventDateTimeInfo}>{this.state.eventLocation}</Text>
          </View>     
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
          <View>
            <Icon name="note" size={Constants.small_icon_size} color={Constants.color3}/>
          </View> 
            <Text style={styles.eventDateTimeInfo}>
            {this.state.description}
            </Text>
            
          </View>
          {this.renderDiscussionBoard()}

            <View style={{margin:25, marginRight:0}}>
              <TouchableOpacity onPress={()=>{this.openPeopleInfo()}}>
                <Text style={{fontWeight:'bold',marginBottom:10}}>{this.state.goingPeople.length} person(s) are going to the event</Text>
              </TouchableOpacity>
            </View>


          </ScrollView>
        </KeyboardAvoidingView>

    );
  }
}


const SPACE_BETWEEN_COMPONENTS = 13;
const PADDING_FROM_SIDES = 25;
const DETAULT_IMAGE_URL="http://data.whicdn.com/images/108454974/large.jpg";
const styles = StyleSheet.create({
  eventInfoHeaderImage:{
  	// marginTop:40,
  	height:200,
  	justifyContent:'flex-end',
  	marginBottom:SPACE_BETWEEN_COMPONENTS
  },eventInfoContainer:{
  	  	paddingRight: PADDING_FROM_SIDES,
  		paddingLeft: PADDING_FROM_SIDES,
      backgroundColor:'transparent',
  		marginTop:SPACE_BETWEEN_COMPONENTS
  },
  eventNameInfoContainer:{
  	backgroundColor:'rgba(0,0,0,0.7)',
  },eventButton:{
    height:30
  },title:{
    color:Constants.color2,
    fontSize:17,
    fontWeight:'bold'
  },
  eventInfoName:{
  	color:Constants.color1,
  	fontSize:20,
  	marginBottom:7,
    fontWeight:'bold'
  },
  eventHostName:{
  	color:Constants.color1,
  	fontSize:17,
    fontWeight:'bold'
  }, 
  attendenceContainer:{
  	flexDirection:'row',
  	flex:1,
  	justifyContent:'space-between'
  },
  eventDateTimeInfo:{
  	marginLeft:10,
    fontSize:15,
  	color:Constants.color2
  },
  userPhotosIcon:{
    height:70,
    width:70,
    marginRight:10,
  },separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor
  },addCommentButton:{
    height:20,
    marginTop:5
  },loadingContainer:{
      backgroundColor:'transparent',
      flex:1,
      width:Constants.screenWidth,
      position:'absolute',
      justifyContent: 'center',
      alignItems:'center',
      marginTop:Constants.screenHeight*0.4
  }
  
});

var mapStateToProps = (state) =>{
  return {
    eventInfo: state.events.eventInfo,
    userId: state.auth.user_id
  }
}



module.exports = connect(mapStateToProps)(EventInfo);