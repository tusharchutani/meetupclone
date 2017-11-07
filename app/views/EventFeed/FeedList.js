import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import EventFeedItem from './EventFeedItem'
import Constants  from '../../MokUI/UIConstants';
import {connect} from 'react-redux';
import {Permissions, Location, Expo} from 'expo';
import {getEventsNearMe, getEventInfo, openCreateEvent, searchEventsByTag, openFindFriends} from '../../actions'

export default class FeedList extends Component {


  static navigationOptions = ({ navigation }) => {
        return {
          title:"Event Feed",
          headerRight: <Icon name="add" style={{marginRight:20}} underlayColor="grey" 
                  size={Constants.medium_icon_size} 
                  color={Constants.color2} 
                  onPress={()=>{
                    navigation.dispatch(openCreateEvent());
                  }}/>,
          headerLeft: <Icon name="people" style={{paddingLeft:20}} size={Constants.medium_icon_size} color={Constants.color2} onPress={() => {
              navigation.dispatch(openFindFriends());
          }}/>,  }
  };

 constructor(props) {
    super(props);
    this.state = {
      isLoadingSearch:false,
      location:{
        latitude:null,
        longitude:null
      },
      loading:false
    };
  }

  _getCurrentLocation = async () => {
    console.log("Getting current location");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("Location access not granted");
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    location = { 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };  
    this.setState({location});

  };

  loadEventsNearMe(){
        this._getCurrentLocation().then(()=>{
        this.setState({loading:true});
        this.props.dispatch(getEventsNearMe(this.state.location.latitude,
          this.state.location.longitude)).then(()=>{
            this.setState({loading:false});
        });
      });
  }
  componentWillMount(){
    this.loadEventsNearMe();
  }

  moreInfo(data) {
    this.props.dispatch(getEventInfo(data, this.props.userId));
  }

  searchList(event){
    if(event.length == 0){
      this.props.dispatch(getEventsNearMe(this.state.location.latitude, this.state.location.longitude));
    }else{
      this.setState({isLoadingSearch:true});
      this.props.dispatch(searchEventsByTag(event)).then(()=>{
        this.setState({isLoadingSearch:false});
      });      
    }

  }

  render() {
  return (
    <View style={styles.container}> 
      <SearchBar lightTheme onChangeText={(event)=>{this.searchList(event)}} placeholder='Type Here...' 
      showLoadingIcon={this.state.isLoadingSearch}/>
        <FlatList
          enableEmptySections={true}
          keyExtractor={(item, index) => index}
          data={this.props.eventList} 
          renderItem={({ item }) => (<EventFeedItem {...item}/>)}
          ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onRefresh={()=>{this.loadEventsNearMe()}}
          refreshing={this.state.loading}
        /> 

    </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor,
  }

});

var mapStateToProps = (state) =>{

  return {
    eventList: state.events.eventList ? state.events.eventList:[],
    userId: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(FeedList);