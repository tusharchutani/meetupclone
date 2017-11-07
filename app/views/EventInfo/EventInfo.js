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
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { Icon,Button, FormInput } from 'react-native-elements';
import Constants from '../../MokUI/UIConstants';
import {SecureStore} from 'expo';
import {GOING_TO_EVENT,NOT_GOING_TO_EVENT,GET_USER_PROFILE,INTRESTED_IN_EVENT} from '../../api';
import {openEditEvent} from '../../actions';

export default class EventInfo extends Component {
  

 constructor(props) {
	    super(props);

      this.state = {
        eventTitleImage: this.props.eventInfo.eventTitleImage ? this.props.eventInfo.eventTitleImage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
        eventName: this.props.eventInfo.title, 
        eventDate: this.props.eventInfo.startDate ? new Date(this.props.eventInfo.startDate).toString() : null,
        eventTags: this.props.eventInfo.tags,
        eventLocation: this.props.eventInfo.streetname, //TODO: change this to address
        userGoing: this.props.eventInfo.usergoing,
        goingPeople:this.props.going ? this.props.going : [],
        description: this.props.eventInfo.description,
        host: this.props.eventInfo.host,
        attendanceIcon:'stars',
        RSVPButtonTitle:'RSVP',
        RSVPButtonDisabled:false,
        isLoading:false,
        hostname:"",
        isCommentTextBoxVisible:false
      };
	}		

  static navigationOptions = {
    title: this.state ? this.state.eventName : "Event info"
  };

  componentDidMount(){
    if(this.state.usergoing){
    this.setState({RSVPButtonTitle:'Going',attendanceIcon:'done'});
    }
  }
  openTextBox(){
    this.setState({isCommentTextBoxVisible:true});
  }

  renderDiscussionBoard(){
    return (
      <View style={[{paddingLeft:0,paddingRight:0},styles.eventInfoContainer]}> 
        <Text style={styles.title}>Discussion board: </Text>

      <View style={{flexDirection:'row'}}>
         <FormInput inputStyle={{color:Constants.color2,flex:1}}
          placeholderTextColor={Constants.color3}
          placeholder="Add public event" />
          <Button
            small
            buttonStyle={styles.addCommentButton}
            icon={{name: 'send'}}
            title='' />

      </View>
        <ScrollView style={{height:200}}> 
          <FlatList
            enableEmptySections={true}
            keyExtractor={(item, index) => index}
            data={[1,2,3,4,5,6,1,1,1,1,1,1,1]} 
            renderItem={({ item }) => (<View style={{paddingBottom:10}}>
              <Text style={{fontWeight:'bold', fontSize:16,marginBottom:5}}>Tushar</Text>
              <Text>This event looks awesome</Text>
              </View>)}
          />          
        </ScrollView>
      </View>    );
  }


  onGoing(){
  this.setState({RSVPButtonDisabled:true,isLoading:true});
    if(!this.state.usergoing){
      SecureStore.getItemAsync('user_id').then((userId)=>{
          axios.get(GOING_TO_EVENT(userId,this.props.eventInfo._id)).then((response)=>{
              this.setState({RSVPButtonTitle:'Going',attendanceIcon:'done',RSVPButtonDisabled:false,usergoing:true,isLoading:false});
          }).catch((error)=>{
        this.setState({RSVPButtonDisabled:false,isLoading:false});
        })
      });
    }else{
      SecureStore.getItemAsync('user_id').then((userId)=>{
            axios.get(NOT_GOING_TO_EVENT(userId,this.props.eventInfo._id)).then((response)=>{
                this.setState({RSVPButtonTitle:'RSVP',attendanceIcon:'star',usergoing:false,RSVPButtonDisabled:false, isLoading:false});
            }).catch((error)=>{
              this.setState({RSVPButtonDisabled:false,isLoading:false});  
            })
        });
    }

  }

  onIntrested(){
    this.setState({RSVPButtonDisabled:true,isLoading:true});
    axios.get(INTRESTED_IN_EVENT(this.props.userId, this.props.eventInfo._id)).then(()=>{
      this.setState({RSVPButtonDisabled:false,isLoading:false});
    }).catch((error)=>
    {
      console.log("There is an error "+error);
    });


  }


  render() {

    if(this.state.hostname == ""){
      axios.get(GET_USER_PROFILE(this.state.host)).then((response)=>{
        var hostname = response.data.firstname + " " + response.data.lastname;
        this.setState({hostname});
      });      
    }

    var isMyevent = false; 

    if(this.props.userId == this.state.host){
      isMyevent = true;
    }

        var goingCount = this.props.eventInfo.going ? this.props.eventInfo.going.length:0;
        var interestedGoing = this.props.eventInfo.interested ? this.props.eventInfo.interested.length:0;
        var eventTitleImage = this.props.eventInfo.eventTitleImage ? this.props.eventInfo.eventTitleImage : DETAULT_IMAGE_URL;
        var eventName = this.props.eventInfo.title;
        var eventDate =  this.props.eventInfo.startDate ? new Date(this.props.eventInfo.startDate).toString() : null;
        var eventTags =  this.props.eventInfo.tags;
        var totalAttendance =  goingCount+interestedGoing;
        var eventLocation =  this.props.eventInfo.streetname; //TODO: change this to address
        var userGoing =  this.props.eventInfo.usergoing;
        var goingPeople = this.props.going ? this.props.going : [];
        var description =  this.props.eventInfo.description;
    

  	return (
      <KeyboardAvoidingView 
      behavior="padding" 
      style={[{backgroundColor:Constants.color1},Constants.styles.fill]}
       keyboardVerticalOffset={64}>
        <ActivityIndicator
          style={styles.loadingContainer}
          animating={this.state.isLoading}
          size="large"/>
          <ScrollView>
            <Image style={styles.eventInfoHeaderImage} 
            source={{uri:eventTitleImage}}>
              <View style={[styles.eventInfoContainer,styles.eventNameInfoContainer]}>
                <Text style={styles.eventInfoName}>{eventName}</Text> 
                <Text style={styles.eventHostName}>Hosted by {this.state.hostname}</Text>
              </View>
            </Image>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
           {!isMyevent  && <Button
                         small
                         raised
                         borderRadius={5}
                         buttonStyle={styles.eventButton}
                         title={this.state.RSVPButtonTitle}
                         icon={{name: this.state.attendanceIcon}}
                         backgroundColor={Constants.color2}
                         disabled={this.state.RSVPButtonDisabled}
                         onPress={()=>{this.onGoing();}}/>}

             {!isMyevent  &&  <Button
                small
                raised
                borderRadius={5}
                buttonStyle={styles.eventButton}
                title="Intrested"
                icon={{name: "star"}}
                backgroundColor={Constants.color2}
                disabled={this.state.RSVPButtonDisabled}
                onPress={()=>{this.onIntrested();}}/>}

             {isMyevent 
              && <Button
                 small
                 raised
                 borderRadius={5}
                 buttonStyle={styles.eventButton}
                 title="Edit"
                 icon={{name:"mode-edit"}}
                 backgroundColor={Constants.color2}
                 disabled={this.state.RSVPButtonDisabled}
                 onPress={()=>{this.props.dispatch(openEditEvent())}}/>}
            </View>
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
            <Icon name="event" size={Constants.small_icon_size} color={Constants.color3}/>
            <Text style={styles.eventDateTimeInfo}>{this.state.eventDate}</Text>
          </View>
          
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
            <Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
            <Text style={styles.eventDateTimeInfo}>{this.state.eventLocation}</Text>
          </View>     
        <View style={styles.separator} />        
          <View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
          <View>
            <Icon name="note" size={Constants.small_icon_size} color={Constants.color3}/>
          </View> 
            <Text style={styles.eventDateTimeInfo}>
            This is a long descriptionLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
            
          </View>
          {this.renderDiscussionBoard()}

            <View style={{margin:25, marginRight:0}}>
              <Text style={{fontWeight:'bold',marginBottom:10}}>{goingCount} person(s) are going to the event</Text>
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
  },postCommentButton:{
      height:30,
      width:30
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
    backgroundColor: Constants.tableDividerColor,
    marginTop:12
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