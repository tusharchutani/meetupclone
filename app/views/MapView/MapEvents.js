import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import { MapView,Permissions,Location } from 'expo';
import {connect} from 'react-redux';
import Constants from '../../MokUI/UIConstants';
import {Constants as ExpoConstants} from 'expo';
import Carousel from 'react-native-snap-carousel';
import CarouselView from './CarouselView'
import {getMapEvents, showErrorAlert, showAlert} from '../../actions'
import {Button} from 'react-native-elements';
export default class MapEvents extends Component {

  _mapView = null;
  _val = 0;
  _region = null;
  constructor(props, context) {
     super(props, context);
    this.state = {
      navigation:{
       screenName:'NA'
      }
    }
    //TODO: get stuff from rest API
    this.state = {
      entries:this.props.mapEvents,
      errorMessage: null,
      location:null,
      isDisabled:false,
      markers:[{
          latlng:[49,-122],
          title:"Title",
          description:"Test description"
      }]
    }
  }

  _centerMapOnMarker (markerIndex) {

        const mapRef = this._mapView;
        var location = this.props.mapEvents[markerIndex] ? this.props.mapEvents[markerIndex].location : null;
    
      if(location){
        mapRef.animateToRegion({
                    latitude: location[1],
                    longitude: location[0],
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.006
          });
      }

    }

  componentWillMount() {
    if (Platform.OS === 'android' && !ExpoConstants.isDevice) {

      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync().then(()=>{
        this.props.dispatch(getMapEvents(this.state.location.latitude,
        this.state.location.longitude));
      }).catch((error)=>{
        this.props.dispatch(showErrorAlert(error));
      });
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.props.dispatch(showAlert("Error","Location access not granted"));
      console.log("Location access not granted");
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
        Alert.alert(
        "Permission not granted",
        "It was not granted",
        [
          {text: 'Yes', 
          onPress: () =>{
            this.setState({isSigningOut:true});
            setTimeout(()=>{dispatch(unauthUser);}, 600);
            
          }
        },        
          {text: 'No', style: 'cancel'}
        ],
        { cancelable: true }
      )      
    }

    let location = await Location.getCurrentPositionAsync({});
    location = { 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421      
    };
          
    this._mapView.animateToRegion(location);
    this.setState({ location });
  };

  


  onUpdateEvents(){
    if(this._region != null){
      this.setState({isDisabled:true});
      this.props.dispatch(getMapEvents(this._region.latitude,
            this._region.longitude)).then(()=>{
        this.setState({isDisabled:false})
      }).catch((error)=>{
        this.setState({isDisabled:false});
        this.props.dispatch(showErrorAlert(error));
      });
    }
  }

 
  render () {

    const slides = this.props.mapEvents ? this.props.mapEvents.map((entry, index) => {
          return (
                  <View key={`entry-${index}`} style={styles.slide}>
                      <CarouselView {...entry}/>
                  </View>
          );
      }):null;

      const eventMarkers = this.props.mapEvents ? this.props.mapEvents.map((entry, index) => {
        const {_carousel} = this;
          return (
            <MapView.Marker key={`marker-${index}`}
            onPress={()=>{
              _carousel.snapToItem(index)
            }} coordinate={{latitude:entry.location[1], longitude:entry.location[0]}}/>
          );
      }):null;

      return (

        <View style={styles.container}>
          <MapView onRegionChange={(region)=> {this._region = region}} ref={(mapView) => { this._mapView = mapView; }} 
          style={styles.container} 
          initialRegion={this.state.location}>
            {eventMarkers}
          </MapView>
          <View style={{position:'absolute',paddingBottom:180,paddingLeft:100}}>
            <ActivityIndicator
              animating={this.state.isDisabled}
              size="large"/>
            <Button small disabled={this.state.isDisabled} borderRadius={100} buttonStyle={{height: 30,backgroundColor:Constants.color2}} 
            onPress={()=>{this.onUpdateEvents()}}
            title="Update events"/>
          </View>
           <Carousel
                  firstItem={2}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.6}              
                  data={this.state.entries}
                  ref={(carousel) => { this._carousel = carousel; }}
                  containerCustomStyle={styles.sliderContainer}
                  sliderWidth={Constants.screenWidth}
                  itemWidth={sliderWidth}
                  onSnapToItem={(index, marker) => this._centerMapOnMarker(index)}                
                >
                { slides }
              </Carousel>
           </View>

          
      );
  }


}
const sliderWidth = 230;
const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'flex-end'
  },
  slide:{
    height:150, 
    width:sliderWidth
  },sliderContainer:{
    position:'absolute',
    flex:1,
    backgroundColor:'transparent',
    paddingBottom: 25
  }
});

var mapStateToProps = (state) =>{
  return {
    mapEvents:state.events.mapEvents
  }
}


module.exports = connect(mapStateToProps)(MapEvents); 
