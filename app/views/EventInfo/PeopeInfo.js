import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {RoundImage} from '../../MokUI/MokUI'
import Constants from '../../MokUI/UIConstants';
import {GET_EVENT_USER_GOING} from '../../api';
import {connect} from 'react-redux';
import {List, ListItem} from 'react-native-elements';
import { SearchBar, Icon, Button } from 'react-native-elements'
import {searchUsers, openUserProfile, setUserProfile,showErrorAlert} from '../../actions';
import axios from 'axios';
export default class PeopleInfo extends Component{
    _val = 0;
   static navigationOptions = ({ navigation }) => {
    var title = navigation.state.params ? navigation.state.params.title:"";
        return {
          title
        }    
  }

  constructor(props) {
    super(props);
  
    this.state = {
      isLoading: false,
      error: null,
      refreshing: false,
      users:[]
    };
  }


  loadUsers(){
   this.setState({isLoading:true});
   axios.get(GET_EVENT_USER_GOING(this.props.eventId),{timeout:10000}).then((response)=>{
    
    this.setState({users:response.data.userID_array});
    this.setState({isLoading:false});
   }).catch((error)=>{
    this.setState({isLoading:false});
    this.props.dispatch(showErrorAlert(error.message));
   })
  }
  componentDidMount(){
   this.props.navigation.setParams({
    title: "Going"
  });
   this.loadUsers();
  }


  getUserProfile(_id){
     if(this._val == 0){
        this._val = 1;
        this.props.dispatch(openUserProfile());
        this.props.dispatch(setUserProfile(_id));
        
        setTimeout(()=>{this._val = 0; }, 1000);
    }
  }

  render() {
  return (
    <View style={styles.container}>

      <FlatList
        keyExtractor={(item, index) => index}
        onRefresh={this.loadUsers}
        refreshing={this.state.isLoading}        
        data={this.state.users}
        renderItem={({ item }) => {
          var imageUrl = (item.avatarurl != undefined && item.avatarurl != "new") ? item.avatarurl:"http://www.thedigitalkandy.com/wp-content/uploads/2016/01/facebook-no-profile.png";
          var name = item.firstname + " " + item.lastname;
          var email = item.email;
          return (
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{this.getUserProfile(item._id)}}> 
            <RoundImage size={50} style={{justifyContent:'center'}} source={imageUrl}/>
            <View>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>
          </TouchableOpacity>);
        }}
         ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
           ListEmptyComponent={()=>{
            return (<View style={{alignItems:'center',justifyContent:'space-around'}}><Text style={styles.noEventsText}>No one is going the event</Text></View>)}}
      />
    </View>
  );
}
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Constants.color1
  },
  loadingContainer:{
    backgroundColor:'rgba(255,255,255,0.6)',
    position: 'absolute',
    top:0,
    bottom:0, 
    left:0,
    right:0
  },
  itemContainer: {
    flex: 1,
    flexDirection:'row',
    height:75,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor:Constants.tableDividerColor,
  },
  nameText:{
    fontWeight:'bold',
    color:Constants.color2
  },noEventsText:{
    paddingTop:Constants.screenHeight*0.25, 
    fontWeight:'bold',
    fontSize:15,
    color:Constants.color3
  },
  emailText:{
    paddingLeft:10,
    color:Constants.color3
  }
    
});

var mapStateToProps = (state) =>{

  return {
    eventId:state.events.eventInfo._id
    // userList: state.events.eventList ? ds.cloneWithRows(state.events.eventList):ds.cloneWithRows([])
  }
}

module.exports = connect(mapStateToProps)(PeopleInfo); 