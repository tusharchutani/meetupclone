import React, { Component } from 'react';
import {
  View,
  // Text
} from 'react-native';
import {connect} from 'react-redux';
import {getMyprofile} from '../../../actions';
import UserInfoFeed from '../UserInfoFeed';

export default class OtherUserProfile extends Component {

constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    }
  
  }
 

  componentWillMount(){
    const {dispatch} = this.props;
    this.setState({isLoading:true});
    this.props.dispatch(getMyprofile()).then(()=>{
      this.setState({isLoading:false});
    });
  }


  render() {
    // return (
    //   <View style={{flex:1}}><Text>Hello this is a test</Text></View>)
   return(<UserInfoFeed isMyProfile={false} {...this.props.profileData}/>);
  }



}
const MARGIN = 20


var mapStateToProps = (state) =>{
  return {
    profileData: state.profiles.other_user_profile
  }
}

module.exports = connect(mapStateToProps)(OtherUserProfile);