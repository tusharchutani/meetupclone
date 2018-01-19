import React, { Component } from 'react';
import {
  View,
  ActionSheetIOS,
  Platform,
  Alert
} from 'react-native';
import BottomSheet from 'react-native-js-bottom-sheet'
import {connect} from 'react-redux';
import {getMyprofile, blockUser, unBlockUser,openflagObject} from '../../../actions';
import { Icon } from 'react-native-elements'
import UserInfoFeed from '../UserInfoFeed';

export default class OtherUserProfile extends Component {

constructor(props) {
    super(props);
    this.openBlockingOptions = this.openBlockingOptions.bind(this);
    this.state = {
      isLoading:false,
      isUnblockDisabled:false
    }
  
  }
 

_setNavigationParams() {

  let blockComponent = <Icon name="more-vert" size={25} containerStyle={{paddingRight:10}} onPress={() => {this.openBlockingOptions()}}/>

  this.props.navigation.setParams({ 
    blockComponent,
    });
  }

  componentWillMount(){

    this._setNavigationParams();
    const {dispatch} = this.props;
    this.setState({isLoading:true});
    this.props.dispatch(getMyprofile()).then(()=>{
      this.setState({isLoading:false});
    });

  }
  componentDidMount(){
    console.log("Component did mount");
    this.props.navigation.setParams({
      openBlockingOptions: this.openBlockingOptions
    });
  }

  static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};

    return {
      headerRight:  params.blockComponent,
    }
  }

  openBlockingOptions(){
    const isIOS = Platform.OS === 'ios';

    if(isIOS){
      this.openBlockingOptionsiOS();
    }else{
      this.bottomSheet.open();
    }

  }

  openBlockingOptionsiOS(){
    const {props} = this;

    //props.profileData.blockedBy.includes(this.props.userId) will be true when my user has blocked him
    if(props.profileData.blockedBy.includes(this.props.userId)){
      //unblock user
        ActionSheetIOS.showActionSheetWithOptions({
          options: ['Unblock', 'Report', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) { 
            
              props.dispatch(unBlockUser(props.profileData._id,this.props.userId));
          }else if(buttonIndex === 1){
            props.dispatch(openflagObject(false));
          }
        });
    }else{
      //Block user
          ActionSheetIOS.showActionSheetWithOptions({
          options: ['Block', "Report", 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) { 
            console.log("Blocking user");
            props.dispatch(blockUser(this.props.profileData._id,this.props.userId));
          }else if(buttonIndex === 1){
            props.dispatch(openflagObject(false));
          }
        });   
    }    
  }

  componentWillReceiveProps(nextProps){
    //Did user block me?
    if(nextProps.profileData && nextProps.profileData.blockedBy.includes(this.props.userId)){
      this.setState({isBlocked:true});
    }
    // Did I block the user?
    else if(nextProps.profileData && nextProps.myProfileData && nextProps.myProfileData.blockedBy.includes(nextProps.profileData._id)){
      this.setState({isBlocked:true});
    }else{
      this.setState({isBlocked:false});
    }
  }


  makeBottomSheetForAndroid(){
    let options;
  const {props} = this;

    //props.profileData.blockedBy.includes(this.props.userId) will be true when my user has blocked him
    if(props.profileData.blockedBy.includes(this.props.userId)){
      options = [
            {
              title: 'Unblock',
              icon: (<Icon name="block" size={10} 
                size={Constants.medium_icon_size} 
                color={Constants.color3} 
                />),
              onPress: () => {
              this.props.dispatch(unBlockUser(props.profileData._id,this.props.userId));
              this.bottomSheet.close();} //this.props.dispatch(openflagObject())
            },
            {
              title: 'Report',
              icon: (<Icon name="flag" size={10} 
                size={Constants.medium_icon_size} 
                color={Constants.color3} 
                />),          
                onPress: () => {
                  this.props.dispatch(openflagObject(false));
                }             
              
            }
          ]
    }else{
      options = [
            {
              title: 'Block',
              icon: (<Icon name="block" size={10} 
                size={Constants.medium_icon_size} 
                color={Constants.color3} 
                />),
                onPress: ()=>{
                  this.props.dispatch(blockUser(this.props.profileData._id,this.props.userId));
                  this.bottomSheet.close();}
            },
            {
              title: 'Report',
              icon: (<Icon name="flag" size={10} 
                size={Constants.medium_icon_size} 
                color={Constants.color3} 
                />),          
              onPress: () => {
                this.props.dispatch(openflagObject(false));
              }
            }
          ]
    }
    return ( 
      <BottomSheet
          refs={(ref: BottomSheet) => {
            this.bottomSheet = ref
          }}
          title="Options"
          backButtonEnabled={true}
          coverScreen={false}
          options={options}
          isOpen={false}
        />);
  }

  render() {
    const isIOS = Platform.OS === 'ios';

   return(<View style={{flex:1}}>
    <UserInfoFeed isBlocked={this.state.isBlocked} isMyProfile={false} {...this.props.profileData}/>
    {!isIOS && this.makeBottomSheetForAndroid()}
    </View>);
  }



}
const MARGIN = 20


var mapStateToProps = (state) =>{
  return {
    profileData: state.profiles.other_user_profile,
    userId:state.auth.user_id,
    myProfileData: state.profiles.myProfile

  }

}

module.exports = connect(mapStateToProps)(OtherUserProfile);