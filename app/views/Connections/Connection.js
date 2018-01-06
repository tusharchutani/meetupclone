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
import {connect} from 'react-redux';
import {List, ListItem} from 'react-native-elements';
import { SearchBar, Icon, Button } from 'react-native-elements'
import {searchUsers, openUserProfile, setUserProfile} from '../../actions';
export default class Connection extends Component{
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
      isLoadingSearch: false,
      error: null,
      refreshing: false,
      searchBarValue:""
    };
  }

  componentDidMount(){
   this.props.navigation.setParams({
    title: this.props.userList.title
  })
  }




  searchUser(searchQuery){
    this.setState({isLoadingSearch:true,searchBarValue:searchQuery});
    if(this.props.userList.isFindUser){
        if(searchQuery.length != 0){
          this.props.dispatch(searchUsers(searchQuery.toLowerCase())).then(()=>{
          this.setState({isLoadingSearch:false});});
        }else{
          this.props.dispatch(searchUsers(""))
          this.setState({isLoadingSearch:false});
      }
    }
  }

  getUserProfile(_id){
     if(this._val == 0){
        this._val = 1;
        this.props.dispatch(openUserProfile());
        this.props.dispatch(setUserProfile(_id));
        
        setTimeout(()=>{this._val = 0; }, 1000);
    }
  }

 searchBar(self){
  return ( <SearchBar lightTheme value={this.state.searchBarValue} onChangeText={(event)=>{self.searchUser(event)}} placeholder='Type Here...' 
      showLoadingIcon={self.state.isLoadingSearch}/>)
 }
  render() {
   _userList = this.props.userList.list.filter(function(n){ return n != undefined });
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index}
        data={_userList}
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
         ListHeaderComponent={this.props.userList.isFindUser && this.searchBar(this)}
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
  itemContainer: {
    flex: 1,
    flexDirection:'row',
    height:75,
    paddingLeft:20,
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
  },
  emailText:{
    paddingLeft:10,
    color:Constants.color3
  }
    
});

var mapStateToProps = (state) =>{

  return {
    userList:state.userSearch
    // userList: state.events.eventList ? ds.cloneWithRows(state.events.eventList):ds.cloneWithRows([])
  }
}

module.exports = connect(mapStateToProps)(Connection); 