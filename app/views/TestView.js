import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapView,Permissions,Location } from 'expo';
import {connect} from 'react-redux';
import Constants from '../MokUI/UIConstants';
import Carousel from 'react-native-snap-carousel';
import EventFeedItem from './EventFeed/EventFeedItem';


export default class TestView extends Component {

  _mapView = null;
  
  constructor(props, context) {
     super(props, context);
    this.state = {
      navigation:{
       screenName:'NA'
      },
    }
    //TODO: get stuff from rest API
    this.state = {
      entries:[
        {title:"title 1"},
        {title:"title 2"},
        {title:"title 3"},
        {title:"title 4"},
        {title:"title 5"},
        {title:"title 6"}
      ],
      errorMessage: null,
      location: null,
      /*{ 
        latitude: 37.78825, 
        longitude: -122.4324, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }*/
      markers:[{
          latlng:[49,-122],
          title:"Title",
          description:"Test description"
      }]
    }
  }


  _centerMapOnMarker (markerIndex) {
      const mapRef = this._mapView;

      mapRef.animateToRegion({region:{
                  latitude: 137.78825,
                  longitude: -220.4324,
                  latitudeDelta: 0.0315,
                  longitudeDelta: 0.0258
              }});
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("Location access not granted");
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    location = { 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1.0922,
      longitudeDelta: 1.0421      
    };

    this.setState({ location });
  };

  render () {
      const slides = this.state.entries.map((entry, index) => {
          return (
                  <View key={`entry-${index}`} style={styles.slide}>
                      <EventFeedItem {...entry} onPress={()=>{console.log("Pressed");}}/>
                  </View>
          );
      });

      return (

        <View style={styles.container}>
        
          <MapView ref={(mapView) => { this._mapView = mapView; }} 
          style={styles.container} 
          initialRegion={this.state.location}>
            <MapView.Marker coordinate={{latitude:49, longitude:-122}}/>
          </MapView>
           <Carousel
                  firstItem={2}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.6}              
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
const sliderWidth = 200;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  slide:{
    height:150, 
    width:sliderWidth
  },sliderContainer:{
    position:'absolute',
    flex:1,
    backgroundColor:'transparent',
    paddingBottom: 50
  }
});

var mapStateToProps = (state) =>{
  return {
    mapEvents:state.events.mapEvents
  }
}


module.exports = connect(mapStateToProps)(TestView); 
