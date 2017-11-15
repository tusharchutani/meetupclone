import {StyleSheet, Dimensions} from 'react-native';


export default Constants = {
	//COLOURS
	color1:'white',
	color2:'black',
	color3:'grey',
	color4:'#3FABE2', //dark blue
	color5:'#F5FCFF', //light blue
	color6:'#F7F7F7', //grey
	color7:'green',
	tableDividerColor:'#8E8E8E',
	formTextColor:'#86939E',

//SIZES
	large_icon_size:40,
	medium_icon_size:28,
	small_icon_size:18,
	screenWidth: Dimensions.get('window').width,
	screenHeight: Dimensions.get('window').height,

//Style	
	styles:StyleSheet.create({
		inRowComponents:{
			flexDirection:'row'
		},
		inColumnComponents:{
			flexDirection:'column',
			alignItems:'center',
			// justifyContent:'center'
		},
  		fill: {
	    	flex: 1,
	    	backgroundColor: '#F5FCFF',
  		}			
	}),
	defaultProfilePic:"http://www.thedigitalkandy.com/wp-content/uploads/2016/01/facebook-no-profile.png",
	locale:"en-us" 
}