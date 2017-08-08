import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Tags } from '../../../MokUI/MokUI';

export default class EventFeedItem extends Component {


	constructor(props) {
	  super(props);
	  this.state = {
	  	eventTitleImage: this.props.eventTitleImage ? this.props.eventTitleImage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
	  	eventName: this.props.eventName, 
	  	eventDate: this.props.eventDate,
	  	eventTime: this.props.eventTime,
	  	eventTags: this.props.eventTags,
      totalGoing: this.props.totalGoing,
	  	eventLocation: this.props.eventLocation,
	  	attendence: this.props.attendence,
	  	bookmark: this.props.bookmark
	  };
	}

  render() {
    return (
      <View style={styles.container}>
      	<Image style={styles.eventImage} source={{uri:this.state.eventTitleImage}}>
      		<View style={styles.eventDateContainer}>
      			<Text style={styles.eventDate}>29</Text> 
      			<View style={{flexDirection:'column'}}> 
	      			<Text style={styles.eventMonth}>SEP</Text>
	      			<Text style={styles.eventDay}>Fri</Text>
	      		</View>
      		</View>
      		<Icon name="bookmark-border" size={35} color="white" style={styles.bookmarkIcon} onPress={bookmarkEvent}/>
  		</Image>
  		<View style={styles.eventInfoContainer}>
      		<Text style={styles.eventName}>{this.state.eventName}</Text>
      		<Text style={styles.cornerInfo}>10:00pm- 12:00pm</Text>
  		</View>

  		<View style={styles.eventInfoContainer}>
	      	<View style={styles.locationContainer}>
	      		<Icon name="location-on" size={18} color="grey"/>
	      		<Text style={{color:'grey'}}>{this.state.eventLocation}</Text>
	  		</View>

	      	<View style={styles.locationContainer}>
		      		<Icon name="group" size={20} color="grey"/>
		      		<Text style={styles.cornerInfo}>11</Text>
	  		</View>
  		</View>

	<View style={styles.eventInfoContainer}>
  		<View id="tag" style={styles.tagInfoContainer}>
  			<Tags text="Tag 1"/>
  			<Tags text="Tag 2"/>
  			<Tags text="Tag 2"/>  			  		
  		</View>

		<Icon name="event" size={25} color="grey" onPress={bookmarkEvent}/>

	</View>
      </View>
    	
    );
  }
}

let bookmarkEvent = ()=>{
	console.log("Book marking event");
}

let changeEventAttendance = () =>{
	console.log("change event atta");
}
const MARGIN = 10;
const MARGIN_CORNER = 15;
const DETAULT_IMAGE_URL="https://static1.squarespace.com/static/51c3cda0e4b0bea2ecf69bc4/561fc2c1e4b00e50405f46fd/57ed278a2994caa927f998af/1475159971460/shutterstock_242371765+%281%29.jpg";
const styles = StyleSheet.create({
  container: {
    // borderRadius:5,
    backgroundColor:'white',
    paddingBottom:MARGIN
  },
  eventImage:{
  	height:110,
  	alignItems:'flex-start',
  	flexDirection:'row',
  	justifyContent:'space-between',
  	// borderRadius:10
  },
  eventDateContainer:{
  	backgroundColor:'rgba(0,0,0,0.3)',
  	marginTop:MARGIN,
  	paddingLeft:10,
  	flexDirection:'row',
  	alignItems:'center'
  },
    bookmarkIcon:{
  	marginRight:MARGIN_CORNER,
  	backgroundColor:'transparent'
  },
  eventDate:{
  	fontSize:22,
  	color:'white'  	
  },
  eventMonth:{
	fontSize:15,
  	color:'white'	
  },
  eventDay:{
	fontSize:13,
  	color:'white'	
  },
  eventName:{
  	fontSize: 17,
 	fontWeight: 'bold',
  	color:'black'
  },
  locationContainer:{
  	flexDirection:'row',
  	alignItems:'center'
  },
  eventInfoContainer:{
  	flexDirection:'row',
  	justifyContent:'space-between',
  	marginLeft:MARGIN_CORNER,
  	marginRight:MARGIN_CORNER,
  },
  cornerInfo:{
  	color:'grey',
  	// marginBottom:MARGIN
  },tagInfoContainer:{
  	justifyContent:'flex-start',
  	marginTop:MARGIN,
  	flexDirection:'row'
  }

  
});

AppRegistry.registerComponent('EventFeedItem', () => EventFeedItem);