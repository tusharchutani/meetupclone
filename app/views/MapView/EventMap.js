import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import { MapView,Permissions,Location } from 'expo';

export default class EventMap extends Component {
  constructor(props) {
     super(props);
    
    this.state = {
      location:[-122.4324,37.78825]
    }
  }  
  componentWillReceiveProps(nextProps){
    if(nextProps.eventInfo != null){
      this.setState({location:nextProps.location})
    }
  }
  render() {
    var location;
    if(this.props.mapEvent.location.length == 2){

         location =  (<MapView style={styles.map}
                         region={{
                              latitude: this.props.mapEvent.location[0],
                              longitude: this.props.mapEvent.location[1],
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421
                         }}
                       >
                       <MapView.Marker
                           coordinate={{latitude:this.props.mapEvent.location[0],longitude:this.props.mapEvent.location[1]}}
                        />
                     </MapView>)
            
    }
    return (
      
      <View style={styles.container}>
              {location}
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
});

var mapStateToProps = (state) =>{
  return {
    mapEvent:state.events.mapEvent
  }
}


module.exports = connect(mapStateToProps)(EventMap); 