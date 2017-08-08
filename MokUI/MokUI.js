import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import PropTypes from 'prop-types';
import Constants from './UIConstants'
export class Tags extends Component {
  render() {
    return (
      <View style={tagStyles.container}>
        <Text style={tagStyles.tagText}>
  		  {this.props.text}
        </Text>
      </View>
    );
  }
}

export class RoundImage extends Component {
  render() {

    return (
        <Image style={{
          width: this.props.size, 
          height: this.props.size, 
          borderRadius:this.props.size/2, 
          borderColor:Constants.color1, 
          borderWidth:2,
          alignItems: 'center',
          justifyContent:'center'}}  
        source={{uri: this.props.source}}/>
    );
  }
}

RoundImage.propTypes = {
  size:PropTypes.number.isRequired,
  source:PropTypes.string.isRequired,
}



const textPaddingRightLeft=10;
const tagStyles = StyleSheet.create({
  container: {
  	borderRadius:100,
  	marginRight:10,
  	backgroundColor:'#3FABE2',
  	paddingRight:textPaddingRightLeft,
  	paddingLeft:textPaddingRightLeft,
  },tagText:{
  	color:'white',

  	backgroundColor: 'transparent'
  }


});

module.exports = { Tags,RoundImage };