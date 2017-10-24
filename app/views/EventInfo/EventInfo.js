import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { Icon,Button } from 'react-native-elements';
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
        hostname:""
      };
	}		

  static navigationOptions = {
    title: this.state ? this.state.eventName : "Event info"
  };


  renderDiscussionBoard(){
    return (
      <View style={styles.eventInfoContainer}> 
        <Text>Discussion board: </Text>
        <ScrollView style={{height:100,marginTop:10}}>
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View> 
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View> 
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>   
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>   
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>   
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>   
           <View style={{flexDirection:'row'}}> 
             <Text style={{fontWeight:'bold'}}>
             Aayush:
             </Text>
             <Text>Lorem ipsum</Text>
           </View>                                                                                        
        </ScrollView>
      </View>    );
  }

  renderUsersGoing(item){
    /*return this.props.tags ? this.props.tags.map((tag, i)=>{
      axio.get(GET_USER_INFO).then((response)=>{
        return (<Image source={{uri:response.data.avatarurl}}/>);
      });
        
      }):null; */ 
      return (<Image style={styles.userPhotosIcon} source={{uri:item.imageSource}}/>);
      
  }

  onGoing(){
  this.setState({RSVPButtonDisabled:true,isLoading:true});
    if(!this.state.usergoing){
      SecureStore.getItemAsync('user_id').then((userId)=>{
          axios.get(GOING_TO_EVENT(userId,this.props.eventInfo._id)).then((response)=>{
              this.setState({RSVPButtonTitle:'Going',attendanceIcon:'stars',RSVPButtonDisabled:false,usergoing:false,isLoading:false});
          }).catch((error)=>{
        this.setState({RSVPButtonDisabled:false,isLoading:false});
        })
      });
    }else{
      SecureStore.getItemAsync('user_id').then((userId)=>{
            axios.get(NOT_GOING_TO_EVENT(userId,this.props.eventInfo._id)).then((response)=>{
                this.setState({RSVPButtonTitle:'RSVP',attendanceIcon:'done',usergoing:true,RSVPButtonDisabled:false, isLoading:false});
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
      <View style={[Constants.styles.fill, {backgroundColor:Constants.color1}]}>
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
          <View style={styles.separator} />
      		<View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
      			<Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
      			<Text style={styles.eventDateTimeInfo}>{this.state.eventLocation}</Text>
      		</View>  		
        <View style={styles.separator} />
      		<View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
      			<Icon name="note" size={Constants.small_icon_size} color={Constants.color3}/>
      			<Text style={styles.eventDateTimeInfo}>
            {description}
      			</Text>
      		</View>
        <View style={styles.separator} />
          {this.renderDiscussionBoard()}

            <View style={{margin:25, marginRight:0}}>
              <Text style={{fontWeight:'bold',marginBottom:10}}>{goingPeople.length} are going to the event</Text>
            </View>


          </ScrollView>
        </View>
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
  	color:Constants.color3
  },
  userPhotosIcon:{
    height:70,
    width:70,
    marginRight:10,
  },separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor,
  },
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

var mapStateToProps = (state) =>{
  return {
    eventInfo: state.events.eventInfo,
    userId: state.auth.user_id
  }
}



module.exports = connect(mapStateToProps)(EventInfo);