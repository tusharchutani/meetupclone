import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment'
import {FormLabel, FormInput, Button } from 'react-native-elements'
import Constants  from '../../MokUI/UIConstants';
import {MultiLineTextField} from '../../MokUI/MokUI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {createEvent, showAlert} from '../../actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {GOOGLE_MAP_API} from '../../api';
import { Icon } from 'react-native-elements';

export default class CreateEvent extends Component {

  static navigationOptions = ({ navigation }) => {

    return {
      header:null
       /*   title:'Create events',
          headerLeft: (<Icon name="clear" style={{marginLeft:20}} 
                      underlayColor="grey" 
                      onPress={()=>{navigation.goBack()}}/>),
          headerRight: (<ActivityIndicator
                        animating={navigation.state.loading}
                        style={{paddingRight:25}}
                        size="small"
                      /> )
          }*/
  }};

  constructor(props) {
      super(props);

      this.state = {
        isDateTimePickerVisible: false,
        loading:false,
        isCreateButtonDisabled:true,
        eventInfo:{
                title:"",
                address:"",
                description:"",
                startDate:moment(),
                tags:"",
                street:"",
                city:"",
                location:[]
              },
        isInvalid:{
          eventTitle:true,
          startDate:true,
          info:true,
          address:true,
          eventDescription:true,
          tags:true
        }
      }
    }

  validateForm(){
    const {title, startDate, tags, street} = this.state.eventInfo;
    if(title.length == 0 || tags.length == 0 || street.length == 0 || startDate <= moment()){
      this.setState({isCreateButtonDisabled:true});
    }else{
      this.setState({isCreateButtonDisabled:false});
    }
  }
    
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
      const {eventInfo,isInvalid} = this.state; 
      eventInfo.startDate=date;
      if(date <= moment()){
          isInvalid.startDate = true;
      }else{
        isInvalid.startDate = false;
      }
      this.setState({isInvalid});
      this.setState({eventInfo});      
      this._hideDateTimePicker();
      this.validateForm();
    };

  _checkEventDateTimeTitle(){

    const {eventInfo,isInvalid} = this.state; 

    if(eventInfo.startDate > moment()){
      // this.setState({date: moment(date).format('MMMM Do YYYY, h:mm:ss a')});
      return moment(eventInfo.startDate).format('MMMM Do YYYY, h:mm:ss a'); 
    }

    return 'Pick a meet up date'
  }

  evetDateTimeView(){

      let PADDING_FOR_RN_ELEMENTS = 20;
          return (
            <View style={{paddingLeft:PADDING_FOR_RN_ELEMENTS,paddingTop:5}}>
            <Button
              medium
              title={this._checkEventDateTimeTitle()}
              backgroundColor={Constants.color3} 
              containerViewStyle={styles.createButton}
              onPress={this._showDateTimePicker}/>

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='datetime'/>                
          </View>);
      }


  _eventTitleChange(event){
    const {isInvalid, eventInfo} = this.state; 
    
    if(event.length < 5){
      isInvalid.eventTitle = true;
    }else{
      isInvalid.eventTitle = false;
    }
    eventInfo.title = event;
    this.setState({eventInfo, isInvalid});
    this.validateForm();
  }

  _eventDescriptionChange(event){
    const {eventInfo} = this.state; 
    eventInfo.description = event;
    this.setState({eventInfo});
  }
  _eventTagChange(event){
    const {isInvalid,eventInfo} = this.state; 

    if(event.length < 3){
      isInvalid.tags = true;
    }else{
      isInvalid.tags = false;
    }
    eventInfo.tags = event.replace(/\s+/, "").split(",");
    this.setState({eventInfo, isInvalid});
    this.validateForm();
  }

  _eventAddressChange(event){
    const {isInvalid, eventInfo} = this.state; 
    axios.get(GOOGLE_MAP_API(event)).then((response)=>{

      if(response.data.results.length != 1){
         isInvalid.address = true;
        this.setState({isInvalid});

      }else{

        isInvalid.address = false;
        eventInfo.street = event;
        let {lat, lng} = response.data.results[0].geometry.location;
        //city or not TODO

      /*  let cityArray = response.data.results[0].filter(function(e){
          console.log("e is "+e.type);
          return true;
        });*/
        // console.log(cityArray[0].long_name);
        // eventInfo.city = cityArray[0].long_name;

        
        eventInfo.location = [lng,lat];
        this.setState({eventInfo, isInvalid});
      }
    }).catch(()=>{
         isInvalid.address = true;
          this.setState({isInvalid});
      });
    this.validateForm();
  }
  _createEvent(){

    this.setState({loading:true});
    const {eventTitle, startDate, address, tags} = this.state.isInvalid; 
    

    if(eventTitle || startDate || address || tags){
      this.props.dispatch(showAlert("Error","Please fill out all required information")); //!!!
      this.setState({loading:false});
    }else{
      this.props.dispatch(createEvent(this.state.eventInfo)).then((response)=>{
        this.props.navigation.goBack();
        setTimeout(()=>{this.props.dispatch(getEventInfo(this.props._id,this.props.userId));}, 2000);
        this.setState({loading:false});
      });
    }
    this.setState({isCreateButtonDisabled:false});
 }

  render() {
    return (

       <View style={styles.container}>
          <View style={styles.titleBar}> 
            <Icon name="clear" style={{paddingRight:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={()=> {this.props.navigation.goBack()}}/>
            <Text style={styles.title}>Create event</Text>
            <ActivityIndicator animating={this.state.loading}
                              style={{paddingRight: 30}}
                              size="small"/>           
          </View>           
        <ScrollView>
            <View>
              <FormLabel>Event Title</FormLabel>
              <FormInput inputStyle={styles.formInput} placeholderTextColor={Constants.color3} placeholder="Event title" 
              onChangeText={(event)=>{
               this._eventTitleChange(event);
              }
            }/>
              {this.state.isInvalid.eventTitle && <FormLabel labelStyle={styles.formWarning}>The event name should be at least 5 characters long</FormLabel>}

              <FormLabel>Event address</FormLabel>
              <FormInput inputStyle={styles.formInput} 
              placeholderTextColor={Constants.color3} 
              placeholder="Event address" 
              onChangeText={(event)=>{
                this._eventAddressChange(event);
              }
            }/>
            {this.state.isInvalid.address && <FormLabel FormLabel labelStyle={styles.formWarning}>The address is not valid</FormLabel>}



              <FormLabel>Event date time</FormLabel>
              {this.evetDateTimeView()}

              <FormLabel>Event Description</FormLabel>
              <MultiLineTextField
              maxLength={40}
              numberOfLines={4}
              height={100}
              width={MULTILINE_TEXT_FIELD_HEIGHT}
              placeholder="Event description"
              onChangeText={(event)=>{this._eventDescriptionChange(event);
              }}            
              />


              <FormLabel>Event Tags (seperated by commas)</FormLabel>

            <MultiLineTextField
              maxLength={200}
              numberOfLines={4}
              height={50}
              width={MULTILINE_TEXT_FIELD_HEIGHT}
              placeholder="Event Tags"
              onChangeText={(event)=>{this._eventTagChange(event);
              }}            
              />

              {this.state.isInvalid.tags && <FormLabel labelStyle={styles.formWarning}>Please enter event tags (should be at least 3 character long)</FormLabel>}

              <Button
                medium
                title='Create'
                backgroundColor={Constants.color2} 
                containerViewStyle={styles.createButton}
                disabled={this.state.isCreateButtonDisabled}
                onPress={()=>{this._createEvent()}}/>
            </View>
        </ScrollView>      
      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1,
    // marginTop:28 //TODO: remove this and add this to the app.js where <Provider> tag is
  },
  formInput:{
    color:Constants.color2
  },
  titleBar:{
    backgroundColor:Constants.color1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:16,
    paddingTop:25

  },
  title:{
    textAlign:'left',
    color:Constants.color2,
    fontSize:22,
    paddingRight:180
  },
  formTitle:{
    color:Constants.color2
  },formWarning:{
  fontSize:10
  },
  createButton:{
    padding:20
  }
});

const MULTILINE_TEXT_FIELD_HEIGHT=335;


module.exports = connect()(CreateEvent);
