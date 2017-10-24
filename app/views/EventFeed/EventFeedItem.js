import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Tags } from '../../MokUI/MokUI';
import Constants  from '../../MokUI/UIConstants';
import {connect} from 'react-redux';
import {getEventInfo} from '../../actions';
export default class EventFeedItem extends Component {

  _val = 0;
  constructor(props) {
    super(props);
    let goingCount = this.props.going ? this.props.going.length:0;
    let interestedGoing = this.props.interested ? this.props.interested.length:0;
    let DETAULT_IMAGE_URL="http://data.whicdn.com/images/108454974/large.jpg";
    this.state = {
      eventTitleImage: this.props.eventTitleImage ? this.props.eventTitleImage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
      eventName: this.props.title, 
      eventDate: this.props.startDate ? new Date(this.props.startDate) : null,
      eventTags: this.props.tags,
      totalAttendance: goingCount+interestedGoing,
      eventLocation: this.props.city, //TODO: change this to address
      attendence: this.props.attendence,
      isDisabled:false
    };
  }

  onMoreInfo(){
    if(this._val == 0){
      this._val = 1;
      this.props.dispatch(getEventInfo(this.props));
      setTimeout(()=>{this._val = 0; }, 1000); 
    }
  }
  
  render() {
    let tagView = () => {

        return this.props.tags ? this.props.tags.map((tag, i)=>{
          return (<Tags key={i} text={tag}/>);
        }):null;
    };
    return (
      <TouchableHighlight 
      underlayColor={Constants.color5} 
      style={styles.container} 
      onPress={()=>this.onMoreInfo()}>
       <View style={{flex:1}} >
        <Image style={styles.eventImage} source={{uri:this.state.eventTitleImage}}>
          <View style={styles.eventDateContainer}>
            <Text style={styles.eventDate}>{this.state.eventDate ? this.state.eventDate.getDate():""}</Text> 
            <View style={{flexDirection:'column',paddingLeft:5}}>
              <Text style={styles.eventMonth}>{this.state.eventDate ? this.state.eventDate.toLocaleString(Constants.locale, { month: "short" }).toUpperCase() :""}</Text>
              <Text style={styles.eventDay}>{this.state.eventDate ? this.state.eventDate.toLocaleString(Constants.locale, { weekday: "short"  }):""}</Text>
            </View>
          </View>
        </Image>
        <View style={styles.eventInfoContainer}>
            <Text style={styles.eventName}>{this.state.eventName}</Text>
            <Text style={styles.cornerInfo}>{this.state.eventDate ? this.state.eventDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'  }):""}</Text>
        </View>

       <View style={styles.eventInfoContainer}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
            <Text style={{color:Constants.color3}}>{this.state.eventLocation}</Text>
          </View>

        <View style={styles.locationContainer}>
            <Icon name="group" size={20} color={Constants.color3}/>
            <Text style={styles.cornerInfo}>{this.state.totalAttendance}</Text>
        </View>
      </View>

      <View style={styles.eventInfoContainer}>
      <View id="tag" style={styles.tagInfoContainer}>
      {tagView()}
      </View>

    <Icon name="event" size={25} color={Constants.color3} onPress={bookmarkEvent}/>

    </View>
  </View>
  </TouchableHighlight>
   
      
    );
  }
}

let bookmarkEvent = ()=>{
  // console.log("Book marking event");
}


let changeEventAttendance = () =>{
  // console.log("change event atta");
}
const MARGIN = 10;
const MARGIN_CORNER = 15;
const styles = StyleSheet.create({
  container: {
    // borderRadius:5,
    backgroundColor:Constants.color1,
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
    backgroundColor:'rgba(0,0,0,0.5)',
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
    color:Constants.color1
  },
  eventMonth:{
  fontSize:15,
    color:Constants.color1
  },
  eventDay:{
  fontSize:13,
    color:Constants.color1
  },
  eventName:{
    fontSize: 17,
  fontWeight: 'bold',
    color:Constants.color2
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
    color:Constants.color3,
    // marginBottom:MARGIN
  },tagInfoContainer:{
    justifyContent:'flex-start',
    marginTop:MARGIN,
    flexDirection:'row'
  }

  
});

module.exports = connect()(EventFeedItem);