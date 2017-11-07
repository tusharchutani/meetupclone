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
export default class CarouselView extends Component {
  _val = 0;

  constructor(props) {
    super(props);
    let DETAULT_IMAGE_URL="http://data.whicdn.com/images/108454974/large.jpg";
    this.state = {
      eventTitleImage: this.props.eventTitleImage ? this.props.eventTitleImage : DETAULT_IMAGE_URL, //TODO: set to default if not given find this default
      eventDate: this.props.startDate ? new Date(this.props.startDate) : null,
    };
  }

  onMoreInfo(){
    if(this._val == 0){
       this._val++;
       setTimeout(()=>{this.props.dispatch(getEventInfo(this.props, this.props.userId)); }, 1000); }
    
  }
  render() {
    let tagView = () => {
      return this.props.tags ? this.props.tags.map((tag, i)=>{
          return (<Tags key={i} text={tag}/>);
        }):null;
      };
    return (
    <TouchableHighlight underlayColor={Constants.color5} style={styles.container} onPress={()=>this.onMoreInfo()}>
      <View style={{flex:1}} >
        <Image style={styles.eventImage} source={{uri:this.state.eventTitleImage}}>
          <View style={styles.eventDateContainer}>
            <Text style={styles.eventDate}>{this.state.eventDate ? this.state.eventDate.getDate():""}</Text> 
            <View style={{flexDirection:'column',paddingLeft:5}}>
              <Text style={styles.eventMonth}>{this.state.eventDate ? this.state.eventDate.toLocaleString(Constants.locale, { month: "short" }).toUpperCase() :""}</Text>
              <Text style={styles.eventDay}>{this.state.eventDate ? this.state.eventDate.toLocaleString(Constants.locale, { weekday: "short"  }):""}</Text>
            </View>          
          </View>
          <View style={styles.eventInfoContainer}>
              <Text style={styles.eventName}>{this.props.title}</Text>
          </View>
          <View style={{flexDirection:'row', padding:20}}>
            {tagView()}
          </View>
        </Image>
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
    width:230,
    // borderRadius:5,
    backgroundColor:Constants.color1,
    paddingBottom:MARGIN
  },
  eventImage:{
    height:110,
    alignItems:'flex-start',
    justifyContent:'space-between',
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
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    flex:1,
    color:Constants.color1
  },
  eventInfoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:5 
  }

  
});

var mapStateToProps = (state) => {
  return {
    userId: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(CarouselView);