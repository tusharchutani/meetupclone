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
import {getEventInfo, navigateToEventInfo} from '../../actions';
export default class EventFeedItem extends Component {

  _val = 0;
  constructor(props) {
    super(props);
    let goingCount = this.props.going ? this.props.going.length:0;
    let interestedGoing = this.props.interested ? this.props.interested.length:0;
    let DETAULT_IMAGE_URL="http://data.whicdn.com/images/108454974/large.jpg";
    this.state = {
      eventTitleImage: this.props.backgroundimage ? this.props.backgroundimage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
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
      this.props.dispatch(navigateToEventInfo());
      this.props.dispatch(getEventInfo(this.props._id,this.props.userId)).then(()=>{
        setTimeout(()=>{this._val = 0; }, 1000); 
      }).catch((err)=>{this._val = 0});
    }
  }


  getUserProfile(_id){
     if(this._val == 0){
        this._val = 1;
        this.props.dispatch(openUserProfile());
        this.props.dispatch(setUserProfile(_id));
        
        setTimeout(()=>{this._val = 0; }, 1000);
    }
  }  


  componentWillReceiveProps(nextProps){
    let goingCount = this.props.going ? this.props.going.length:0;
    let interestedGoing = this.props.interested ? this.props.interested.length:0;
    let DETAULT_IMAGE_URL="http://data.whicdn.com/images/108454974/large.jpg";
    this.setState({
      eventTitleImage: nextProps.backgroundimage ? nextProps.backgroundimage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
      eventName: nextProps.title, 
      eventDate: nextProps.startDate ? new Date(nextProps.startDate) : null,
      eventTags: nextProps.tags,
      totalAttendance: goingCount+interestedGoing,
      eventLocation: nextProps.city, //TODO: change this to address
      attendence: nextProps.attendence,
      isDisabled:false
    });
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
              <Text style={styles.eventMonth}>{this.state.eventDate ? Constants.month[this.state.eventDate.getMonth()] :""}</Text>
              <Text style={styles.eventDay}>{this.state.eventDate ? Constants.day[this.state.eventDate.getDay()]:""}</Text>
            </View>
          </View>
        </Image>
        <View style={styles.eventInfoContainer}>
            <Text style={styles.eventName}>{this.state.eventName}</Text>
            <Text style={styles.cornerInfo}>{this.state.eventDate ? this.formatAMPM(this.state.eventDate):""}</Text>
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

    <Icon name="event" size={25} color={Constants.color3}/>

    </View>
  </View>
  </TouchableHighlight>
   
      
    );
  }
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
    backgroundColor:Constants.color6
  },
  eventDateContainer:{
    backgroundColor:'rgba(0,0,0,0.5)',
    marginTop:MARGIN,
    paddingLeft:10,
    flexDirection:'row',
    alignItems:'center'
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
var mapStateToProps = (state) =>{

  return {
    userId: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(EventFeedItem);