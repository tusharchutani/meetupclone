import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';
import moment from 'moment'
import {FormLabel, FormInput, Button, ListItem } from 'react-native-elements'
import Constants  from '../../MokUI/UIConstants';
import {MultiLineTextField} from '../../MokUI/MokUI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {createEvent, showErrorAlert} from '../../actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {GOOGLE_MAP_API} from '../../api';
import { Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class CreateEvent extends Component {

  static navigationOptions = ({ navigation }) => {

    return {
      header:null
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
        locationSuggestion:[],
        isInvalid:{
          eventTitle:true,
          startDate:true,
          info:true,
          address:true,
          eventDescription:true,
          tags:true
        },
        eventImageURi:'',
        eventImage:{
          name:"",
          type:""
        }
      }
    }

  validateForm(){
    const {title, startDate, tags, location} = this.state.eventInfo;
    if(title.length == 0 || tags.length == 0 || location.length == 0 || startDate <= moment()){
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

uploadAndCreate() { 
    if(this.state.eventImageURi.length != 0){
             var imageName = this.state.eventImageURi.split("/");
                imageName = imageName[imageName.length-1];
                this.state.eventImage.name = imageName;
                this.state.eventImage.type = "image/jpg";
              const options = {
                keyPrefix: "uploads/",
                bucket: "uploadsformok",
                region: "us-east-1",
                accessKey: "AKIAI3LSLN3KT4SV4MNA",
                secretKey: "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",
                successActionStatus: 201
                };
              RNS3.put(this.state.eventImage, options).then(response => {
                    if (response.status !== 201){throw new Error("Failed to upload image to S3")}
                    let photoLocation = response.body.postResponse.location;
                    let eventInfo = this.state.eventInfo;
                    eventInfo.eventimage = photoLocation;
                    this.setState({eventInfo:eventInfo});

                    this.props.dispatch(createEvent(this.state.eventInfo)).then((response)=>{
                      debugger
                      this.props.navigation.goBack();
                      // setTimeout(()=>{this.props.dispatch(getEventInfo(this.props._id,this.props.userId));}, 2000);
                      this.setState({loading:false});
                      }).catch((error)=>{
                       this.props.dispatch(showErrorAlert(error));
                      });
                    this.setState({isCreateButtonDisabled:false});        
                      });
      }else{
       
        this.props.dispatch(createEvent(this.state.eventInfo)).then((response)=>{
          this.props.navigation.goBack();
          // setTimeout(()=>{this.props.dispatch(getEventInfo(this.props._id,this.props.userId));}, 2000);
          this.setState({loading:false});
          }).catch((error)=>{
           this.props.dispatch(showErrorAlert(error));
          });
        this.setState({isCreateButtonDisabled:false});        
      }
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
    if(event.length == 0){
      this.setState({locationSuggestion:[]})
      return
    }
    axios.get(GOOGLE_MAP_API(event)).then((response)=>{
      this.setState({locationSuggestion:response.data.results});
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
      this.props.dispatch(showErrorAlert("Error","Please fill out all required information")); //!!!
      this.setState({loading:false});
    }else{
      let eventInfo = this.state.eventInfo;
      this.setState({isCreateButtonDisabled:true}); 
       this.uploadAndCreate();
     }
 }
  selectLocation(item){
    cityName = item.address_components.filter(function(component){
      return (component.types.includes("political") &&
        component.types.includes("locality"));
    })[0].long_name;
    this.setState({location:item.formatted_address,locationSuggestion:[]});
    let {lat, lng} = item.geometry.location;

    const {isInvalid, eventInfo} = this.state; 
    isInvalid.address = false;
    eventInfo.street = item.formatted_address;
    eventInfo.location = [lng,lat];
    eventInfo.city = cityName;
    this.setState({isInvalid,eventInfo});    
    this.validateForm();
  }

  chooseEventImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ eventImageURi:result.uri,eventImage:result });
    }
  };

  render() {
    return (

       <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.titleBar}> 
            <Icon name="clear" style={{paddingRight:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={()=> {this.props.navigation.goBack()}}/>
            <Text style={styles.title}>Create event</Text>
            <ActivityIndicator animating={this.state.loading}
                              style={{paddingRight: 30}}
                              size="small"/>           
          </View>           
        <ScrollView>
            <Image style={{
              // width: Constants.screenWidth, 
              height: 160, 
              borderColor:Constants.color1,
              margin:15,
              borderWidth:2,
              alignItems: 'center',
              justifyContent:'center'}} 
              source={{uri: this.state.eventImageURi.length != 0 ? this.state.eventImageURi : Constants.defaultEventImage}}
              />
            {this.state.eventImageURi.length == 0 && 
              <TouchableOpacity onPress={()=>{
                this.chooseEventImage()}}>
                <Text style={styles.imageButtonText}>Choose photo</Text>
            </TouchableOpacity>}
            {this.state.eventImageURi.length != 0 && 
              <TouchableOpacity onPress={()=>{this.setState({eventImageURi:""});}}>
                <Text style={styles.imageButtonText}>Remove picture</Text>
            </TouchableOpacity>}
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
              value={this.state.location}             
              placeholder="Event address" 
              onChangeText={(event)=>{
                const {isInvalid, eventInfo} = this.state; 
                isInvalid.address = true;
                this.setState({isInvalid});    
                this.setState({location:event});
                this._eventAddressChange(event);
              }
            }/>
            {this.state.locationSuggestion.length != 0 &&
              <View style={{height:150, marginRight:29, marginLeft:29}}>
            <FlatList
              keyExtractor={(item, index) => index}
              data={this.state.locationSuggestion}
              renderItem={({ item }) => {
                return (
                <TouchableOpacity style={{flex:1,height:48}} onPress={()=>{this.selectLocation(item)}}> 
                    <Text style={styles.locationSuggestionText}>{item.formatted_address}</Text>
                </TouchableOpacity>);
              }}
               ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
            </View>}
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
      </KeyboardAwareScrollView>

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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor:Constants.tableDividerColor,
  },  
  locationSuggestionText:{
    fontSize:17
  },imageButtonText:{
    color:Constants.color4,
    fontWeight:'bold',
    paddingLeft:15
  },
  createButton:{
    padding:20
  }
});

const MULTILINE_TEXT_FIELD_HEIGHT=335;


module.exports = connect()(CreateEvent);
