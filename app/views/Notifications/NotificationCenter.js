import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {List} from 'react-native-elements';
import {connect} from 'react-redux';
import {RoundImage} from '../../MokUI/MokUI'
import Constants from '../../MokUI/UIConstants';
import {getMyNotifications,navigateToEventInfo,getEventInfo,openUserProfile,setUserProfile} from '../../actions';
export default class NotificationCenter extends Component {
  _val = 0;
  static navigationOptions = ({ navigation }) => {
        return {
          title:"Notifications",
          headerLeft:null,
          loading:false
        }
  };

    constructor(props) {
    super(props);
    this.state = {loading:false}
    }

  renderNotifcation(notification){
    const {notificationtype,userfullname} = notification;
    let {userAvatar} = notification;
      if(userAvatar == "new"){
        userAvatar = Constants.defaultProfilePic;
      }
    if(notificationtype == "USER_FOLLOW"){
      let navigateToUserProfile = () => {
         if(this._val == 0){
            this._val = 1;
            this.props.dispatch(openUserProfile());
            this.props.dispatch(setUserProfile(notification.userid));
            
            setTimeout(()=>{this._val = 0; }, 1000);
        }        
      }
      return(
      <TouchableOpacity onPress={navigateToUserProfile} style={styles.notificationItem}>
         <RoundImage size={40} source={userAvatar}/>
        <Text style={{paddingLeft:20,paddingRight:50}}>
          <Text style={styles.notificationUserName}>{userfullname}</Text>
          <Text> started following you.</Text>
        </Text>
      </TouchableOpacity>);
    }else if(notificationtype == "EVENT_INVITE"){
      let notificationText = notification.notification;
      let navigateToEvent = () => {
            if(this._val == 0){
              this._val = 1;
              this.props.dispatch(navigateToEventInfo());
              this.props.dispatch(getEventInfo(notification.eventid,this.props.userId)).then(()=>{
                setTimeout(()=>{this._val = 0; }, 1000); 
              }).catch((err)=>{this._val = 0});
            }
      }
      return(
      <TouchableOpacity onPress={navigateToEvent} style={styles.notificationItem}>
         <RoundImage size={40} source={userAvatar}/>
        <Text style={{paddingLeft:20,paddingRight:50}}>
          <Text style={styles.notificationUserName}>{userfullname}</Text>
          <Text>{" "+notificationText.substr(userfullname.length)}</Text>
        </Text>
      </TouchableOpacity>);
    }
  }

  componentDidMount(){
  	this.getNotifications();
  }

  getNotifications(){
    this.setState({loading:true})
    this.props.dispatch(getMyNotifications()).then((response)=>{
      this.setState({loading:false})
    });
  }

  render() {
    return (
    <View style={styles.container}> 
        <FlatList
          style={{paddingRight:25,flex:1}}
          keyExtractor={(item, index) => index}
          enableEmptySections={true}
          keyExtractor={(item, index) => index}
          data={this.props.notificationList}
          renderItem={({ item }) => {return this.renderNotifcation(item)}}
          ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onRefresh={()=>{this.getNotifications()}}
          refreshing={this.state.loading}
          ListEmptyComponent={()=>{
            return (
              <View style={{alignItems:'center',justifyContent:'space-around'}}>
                <Text style={styles.noEventsText}>You have no notifications</Text>
              </View>)}}          
        />
	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Constants.color1
  },
  notificationItem:{
    height:80,
    flexDirection:'row',
    alignItems:'center',
    width:Constants.screenWidth,
    padding:10,
    // marginLeft:10,
    // marginTop:10,
    backgroundColor:Constants.color1
  },
  notificationUserName:{
      fontSize:15,
      fontWeight:'bold',
  },roundImage:{
    // padding:10,
    paddingRight:5
  },separator:{
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor:Constants.tableDividerColor,
  },
  noEventsText:{
    paddingTop:Constants.screenHeight*0.25, 
    fontWeight:'bold',
    fontSize:15,
    color:Constants.color3
  }  

});

var mapStateToProps = (state) =>{
	return {
		notificationList: state.notifications.notificationList.notification_array,
    userId:state.auth.user_id
	}
}

module.exports = connect(mapStateToProps)(NotificationCenter);