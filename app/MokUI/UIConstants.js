import {StyleSheet, Dimensions} from 'react-native';


export default Constants = {
	//COLOURS
	color1:'white',
	color2:'black',
	color3:'grey',
	color4:'#3FABE2',
	color5:'#F5FCFF',
	tableDividerColor:'#8E8E8E',

//SIZES
	large_icon_size:40,
	medium_icon_size:30,
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
	})
}