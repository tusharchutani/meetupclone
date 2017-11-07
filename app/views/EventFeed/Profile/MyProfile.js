import React, { Component } from 'react';
import {
  View,
  // Text
} from 'react-native';
import {connect} from 'react-redux';
import {getMyprofile} from '../../../actions';
import UserInfoFeed from '../UserInfoFeed';

export default class MyProfile extends Component {

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
   return(<UserInfoFeed isMyProfile={true} {...this.props.profileData}/>);
  }



}
const MARGIN = 20


var mapStateToProps = (state) =>{
  return {
    profileData: state.profiles.myProfile
  }
}

module.exports = connect(mapStateToProps)(MyProfile);