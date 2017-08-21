import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RoundImage } from '../../../MokUI/MokUI';
import Constants from '../../../MokUI/UIConstants';

export default class Profile extends Component {
	renderUserPhotos(item){
		return (<Image style={styles.userPhotosIcon} source={{uri:item.imageSource}}/>);
	}
  render() {
    return (
      <ScrollView style={styles.container}>
  	      	<Image style={styles.eventInfoHeaderImage} 
      		source={{uri:'https://static1.squarespace.com/static/51c3cda0e4b0bea2ecf69bc4/561fc2c1e4b00e50405f46fd/57ed278a2994caa927f998af/1475159971460/shutterstock_242371765+%281%29.jpg'}}>
      			<Icon name="more-vert" size={Constants.medium_icon_size} color={Constants.color5}/>
      		</Image>

      		<View style={styles.profileInfo}>
      			<RoundImage source="https://facebook.github.io/react/img/logo_og.png" size={100}/>
      			<Text style={styles.name}>Tushar Chutani</Text>
		  		<View style={Constants.styles.inRowComponents}> 
		  			<Icon name="location-on" size={Constants.small_icon_size} color={Constants.color3}/>
		  			<Text style={styles.locationInfo}>Vancouver BC</Text>
		  		</View>       			
  			</View>
  			<View style={styles.infoContainer}>
  				<Text>About</Text>
  				<Text style={styles.info}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim</Text>
  			</View>
  			<View style={{margin:MARGIN, marginRight:0}}>
  				<Text>Photos</Text>
  				<FlatList horizontal={true}
					  data={[
					  	{key:0, imageSource: 'http://dreamatico.com/data_images/people/people-2.jpg'}, 
					  	{key:1, imageSource: 'http://dreamatico.com/data_images/people/people-3.jpg'},
					  	{key:2, imageSource: 'http://dreamatico.com/data_images/people/people-1.jpg'},
					  	{key:3, imageSource: 'http://dreamatico.com/data_images/people/people-4.jpg'},
					  	{key:4, imageSource: 'http://dreamatico.com/data_images/people/people-5.jpg'},
					  	{key:5, imageSource: 'http://dreamatico.com/data_images/people/people-5.jpg'}]}
					  renderItem={({item}) => this.renderUserPhotos(item)}
					/>
  			</View>

      </ScrollView>
    );
  }



}
const MARGIN = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  eventInfoHeaderImage:{
  	paddingTop:20,
  	alignItems:'flex-end',
  	height:150
  },profileInfo:{
  	alignItems:'center',
  	marginTop:-50
  },name:{
  	fontSize:15,
  	fontWeight:'bold',
  	marginBottom:5
  },infoContainer:{
  	margin:MARGIN, 
  	marginRight:0
  },
  info:{
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