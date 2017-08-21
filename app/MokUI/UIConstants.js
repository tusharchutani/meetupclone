import {StyleSheet} from 'react-native';
export default Constants = {
	color1:'white',
	color2:'black',
	color3:'grey',
	color4:'#3FABE2',
	medium_icon_size:30,
	small_icon_size:18,
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