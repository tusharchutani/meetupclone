import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RoundImage } from '../../MokUI/MokUI';
import Constants from '../../MokUI/UIConstants';

export default class Profile extends Component {
	renderUserPhotos(item){
		return (<Image style={styles.userPhotosIcon} source={{uri:item.imageSource}}/>);
	}
  render() {
    return (
      <ScrollView style={styles.container}>

          <View style={{flexDirection:'row',alignItems: 'stretch'}}>
            <View>
                <View style={styles.profileInfo}>
                  <RoundImage source="https://facebook.github.io/react/img/logo_og.png" size={100}/>
                  <Text style={styles.name}>Tushar Chutani</Text>
                </View>
                <View style={Constants.styles.inRowComponents}> 
                  <Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
                  <Text style={styles.locationInfo}>Vancouver BC</Text>
                </View>
              </View> 


              <TouchableOpacity style={styles.connectionInfoContainer}>
                <Text style={styles.connectionText}>321</Text>
                <Text style={{size:9,color:'grey'}}>Follower</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.connectionInfoContainer}>
                <Text style={styles.connectionText}>31</Text>
                <Text style={{size:9,color:'grey'}}>Following</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.connectionInfoContainer}>
                <Text style={styles.connectionText}>10</Text>
                <Text style={{size:9,color:'grey'}}>Events</Text>
              </TouchableOpacity>

           </View>
  			<View style={styles.infoContainer}>
  				<Text>About</Text>
  				<Text style={styles.info}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim</Text>
  			</View>
      </ScrollView>
    );
  }



}
const MARGIN = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1,
  },
  eventInfoHeaderImage:{
  	paddingTop:20,
  	alignItems:'flex-end',
  	height:150
  },profileInfo:{
  	alignItems:'flex-start',
  	marginTop:20,
    marginLeft:15
  },name:{
  	fontSize:15,
  	fontWeight:'bold',
  	marginBottom:5
  },infoContainer:{
  	margin:MARGIN, 
  	marginRight:0
  },connectionInfoContainer:{
    marginTop:30,
    alignItems:'center',
    padding:10
  },connectionText:{
    fontWeight:'bold',
    fontSize:20, 
    color:Constants.color4
  },info:{
  	marginTop:10,
  	color:Constants.color3
  },
  userPhotosIcon:{
  	height:70,
  	width:70,
  	marginRight:MARGIN,
  }

});

AppRegistry.registerComponent('Profile', () => Profile);