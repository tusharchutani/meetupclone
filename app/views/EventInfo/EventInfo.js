import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from '../../../MokUI/UIConstants';
import ProgressiveImage from 'react-native-progressive-image';

export default class EventInfo extends Component {

 constructor(props) {
	    super(props);
	    this.state = {
	    	eventName: this.props.eventName,
	    	host: this.props.host,
	    	attendance:"going",//this.props.attendance, 
	    	eventDateTime:this.props.eventDateTime
	    }
	}		

  render() {

  	let interstedIcon = this.state.attendance == "interested" ? 
  	(<Icon name="stars" size={Constants.medium_icon_size} color={Constants.color4}/>) : 
  	(<Icon name="stars" size={Constants.medium_icon_size}/>);

  	let goingIcon = this.state.attendance == "going" ? 
  	(<Icon name="done" size={Constants.medium_icon_size} color={Constants.color4}/>) : 
  	(<Icon name="done" size={Constants.medium_icon_size}/>);

  	let notGoingIcon = this.state.attendance == "not going" ? 
  	(<Icon name="clear" size={Constants.medium_icon_size} color={Constants.color4}/>) : 
  	(<Icon name="clear" size={Constants.medium_icon_size}/>);  	

  	let attendanceComponent = (<View style={[styles.attendenceContainer, styles.eventInfoContainer]}>
  		<View style={Constants.styles.inColumnComponents}>
			{interstedIcon}
			<Text>Interested</Text>
		</View>

  		<View style={Constants.styles.inColumnComponents}>
			{goingIcon}
			<Text>Going</Text>
		</View>		

  		<View style={Constants.styles.inColumnComponents}>
			{notGoingIcon}
			<Text>Going</Text>
		</View>				
	</View>);


  	return (
      <ScrollView style={Constants.styles.fill}>
      	<Image style={styles.eventInfoHeaderImage} 
      	source={{uri:'https://static1.squarespace.com/static/51c3cda0e4b0bea2ecf69bc4/561fc2c1e4b00e50405f46fd/57ed278a2994caa927f998af/1475159971460/shutterstock_242371765+%281%29.jpg'}}>
      		<View style={[styles.eventNameInfoContainer, styles.eventInfoContainer]}>
	      		<Text style={styles.eventInfoName}>Camping</Text> 
	      		<Text style={styles.eventHostName}>Hosted by Tushar Chutani</Text>
	      	</View>
      	</Image>
  		{attendanceComponent}
  		<View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
  			<Icon name="event" size={Constants.small_icon_size} color={Constants.color3}/>
  			<Text style={styles.eventDateTimeInfo}>August 8 at 10:00 to 2:00 PM</Text>
  		</View>

  		<View style={[Constants.styles.inRowComponents,styles.eventInfoContainer]}> 
  			<Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
  			<Text style={styles.eventDateTimeInfo}>BC Place</Text>
  		</View>  		

  		<View style={styles.eventInfoContainer}> 
  			<Text>Description: </Text>
  			<Text style={styles.eventDateTimeInfo}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim

  			</Text>
  		</View>

      </ScrollView>
    );
  }
}


const SPACE_BETWEEN_COMPONENTS = 13;
const PADDING_FROM_SIDES = 25;

const styles = StyleSheet.create({
  eventInfoHeaderImage:{
  	marginTop:40,
  	height:200,
  	justifyContent:'flex-end',
  	marginBottom:SPACE_BETWEEN_COMPONENTS
  },eventInfoContainer:{
  	  	paddingRight: PADDING_FROM_SIDES,
  		paddingLeft: PADDING_FROM_SIDES,
  		marginBottom:SPACE_BETWEEN_COMPONENTS
  },
  eventNameInfoContainer:{
  	backgroundColor:'rgba(0,0,0,0.5)',
  	
  },
  eventInfoName:{
  	color:'white',
  	fontSize:20,
  	marginBottom:7
  }, 
  eventHostName:{
  	color:'white',
  	fontSize:17
  }, 
  attendenceContainer:{
  	flexDirection:'row',
  	flex:1,
  	justifyContent:'space-between'
  },
  eventDateTimeInfo:{
  	marginLeft:10,
  	color:Constants.color3
  }
  
});

AppRegistry.registerComponent('EventInfo', () => EventInfo);