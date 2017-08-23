import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MapView } from 'expo';


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
      region: { 
        latitude: 37.78825, 
        longitude: -122.4324, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }
    }
  }


    _centerMapOnMarker (markerIndex) {
        const mapRef = this._mapView;

        mapRef.animateToRegion({region:{
                    latitude: 137.78825,
                    longitude: -22.4324,
                    latitudeDelta: 0.0315,
                    longitudeDelta: 0.0258
                }});
    }

  render () {
      const slides = this.state.entries.map((entry, index) => {
          return (
                  <View key={`entry-${index}`} style={styles.slide}>
                      <EventFeedItem />
                  </View>
          );
      });

      return (

        <View style={styles.container}>
        
          <MapView ref={(mapView) => { this._mapView = mapView; }} style={styles.container} initialRegion={this.state.region}/>
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


AppRegistry.registerComponent('TestView', () => TestView);