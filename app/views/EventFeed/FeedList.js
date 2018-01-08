import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Platform
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import EventFeedItem from './EventFeedItem'
import Constants  from '../../MokUI/UIConstants';
import {connect} from 'react-redux';
import {Permissions, Location, Expo} from 'expo';
import {Constants as ExpoConstants} from 'expo';
import shallowCompare from 'shallow-compare'
import {getEventsNearMe, getEventInfo, showErrorAlert, openCreateEvent, searchEventsByTag, openFindFriends} from '../../actions'

export default class FeedList extends Component {
  _val = 0;

  static navigationOptions = ({ navigation }) => {
        return {
          title:"Event Feed",
          headerRight: <Icon name="add" containerStyle={{paddingRight:15}} underlayColor="grey" 
                  size={Constants.medium_icon_size} 
                  color={Constants.color2} 
                  onPress={()=>{
                    navigation.dispatch(openCreateEvent());
                  }}/>,
          headerLeft: <Icon name="people" containerStyle={{paddingLeft:15}} size={Constants.medium_icon_size} color={Constants.color2} onPress={() => {
              navigation.dispatch(openFindFriends());
          }}/>,  }
  };

 constructor(props) {
    super(props);
    this.state = {
      isLoadingSearch:false,
      searchBarValue:"",
      location:{
        latitude:null,
        longitude:null
      },
      loading:false,
      footerLoading:false,
      currentPage:1
    };
  }

  _getCurrentLocation = async () => {

    
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log("Location access not granted");
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      if (Platform.OS === 'android' && !ExpoConstants.isDevice) {
           let location = { 
            latitude: 49.2848183,//location.coords.latitude,
            longitude:-123.1111718 //location.coords.longitude,
          };  
          this.setState({location});
        }else{
             let location = await Location.getCurrentPositionAsync({});
             location = { 
                latitude: location.coords.latitude,
                longitude:location.coords.longitude,
              };  
              this.setState({location});
        }
  };

  loadEventsNearMe(page=1){

      this.setState({loading:true});
        this._getCurrentLocation().then(()=>{
        this.setState({hasLoaded:false});
        this.props.dispatch(getEventsNearMe(this.state.location.latitude,
          this.state.location.longitude,page)).then(()=>{
            this.setState({loading:false,footerLoading:false});
        }).catch((error)=>{
            this.setState({loading:false,footerLoading:false});
            this.props.dispatch(showErrorAlert(error));
        });
      }).catch((error)=>{
        this.setState({loading:false,footerLoading:false});
        this.props.dispatch(showErrorAlert("Location has been disabled."));
      });
  }
  
  reloadEvents(){
    this.setState({currentPage:1},()=>{
      this.loadEventsNearMe();
    })
  }
  
  componentWillMount(){
    this.loadEventsNearMe();
  }

  moreInfo(data) {
    this.props.dispatch(getEventInfo(data, this.props.userId));
  }


  searchList = (event) =>{
    this.setState({searchBarValue:event});
    if(event.length == 0){
      this.props.dispatch(getEventsNearMe(this.state.location.latitude, this.state.location.longitude));
    }else{
      this.setState({isLoadingSearch:true});
      this.props.dispatch(searchEventsByTag(event.toLowerCase())).then(()=>{
        this.setState({isLoadingSearch:false});
      }).catch((error)=>{
        this.setState({isLoadingSearch:false});
        this.props.dispatch(showErrorAlert(error));
      });  
    }
  }


  handelLoadMore(){
      if(this._val == 0){
        this._val = 1;
        if(this.props.eventList.length >= 8){ 
          this.setState({footerLoading:true});
          this.setState({currentPage:this.state.currentPage+1},()=>{
            this.loadEventsNearMe(this.state.currentPage);
            setTimeout(()=>{this._val = 0; }, 2000);
            });
          }
      }
  }

  render() {
    const isIOS = Platform.OS === 'ios';
    return (
      <View style={styles.container}> 
        <SearchBar lightTheme value={this.state.searchBarValue} onChangeText={this.searchList} placeholder='Type Here...' 
        showLoadingIcon={this.state.isLoadingSearch}/>
          <FlatList
            enableEmptySections={true}
            keyExtractor={(item, index) => index}
            data={this.props.eventList}
            renderItem={({ item }) => (<EventFeedItem {...item}/>)}
            ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            onRefresh={()=>{this.reloadEvents()}}
            refreshing={this.state.loading}
            ListFooterComponent={()=>{
              return (this.state.footerLoading && 
                <View style={{paddingTop:10}}><ActivityIndicator  animating={true} size="small" /></View>);
            }}            
            ListEmptyComponent={()=>{
              return (
                <View style={styles.loadingContainer}>
                  {this.state.loading && isIOS && 
                    <View style={Constants.styles.inRowComponents}> 
                    <ActivityIndicator animating={true}
                                 style={{paddingRight: 10}}
                                    size="small"/> 
                    <Text style={styles.noEvents}>Loading...</Text></View>}
                  {!this.state.loading && <Text style={styles.noEvents}>There are no events near you</Text>}
                </View>)}}          
            onEndReached={()=>{this.handelLoadMore()}}
            onEndReachedThreshold={isIOS ? 0:1}
          /> 
      </View>);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: Constants.tableDividerColor,
    }, noEvents:{
      fontWeight:'bold',
      fontSize:15,
      color:Constants.color3
    },loadingContainer:{
      alignItems:'center',
      justifyContent:'space-around',
    paddingTop:Constants.screenHeight*0.25, 
    }
  });

  var mapStateToProps = (state) =>{

    return {
      eventList: state.events.eventList ? state.events.eventList:[],
      userId: state.auth.user_id
    }
  }

module.exports = connect(mapStateToProps)(FeedList);