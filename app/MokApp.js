import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import MokAppRouter from './AppRouter';
import Constants from './MokUI/UIConstants';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {hideAlert, openMainApp} from './actions';
import {Font} from 'expo';
export default class MokApp extends Component {


  constructor(props) {
      super(props);
      this.state = {
        uiEnabled:this.props.uiEnabled
      }
    }
   componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/MaterialIcons-Regular.ttf'),
    });

  }

    componentDidUpdate(){
      if(this.props.uiEnabled == true && !this.state.uiEnabled){
        this.setState({uiEnabled:true});
        if(this.props.userId != null){
          this.props.dispatch(openMainApp());
        }        
      }

    }

  render() {
    let showAlerts = () => {
      if(this.props.alerts.showAlert){
        // this.props.alerts.showAlert = false;

        Alert.alert(
          
        this.props.alerts.alert_title,
        this.props.alerts.alert_msg,
        [
          {text: 'OK', onPress: () => {this.props.dispatch(hideAlert());} },
        ],
        { cancelable: false }
      )
      }
    }
//{this.state.uiEnabled && <MokAppWithNavigation/>}    
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content'/>
        <MokAppWithNavigation/>
        {!this.state.uiEnabled && <View style={styles.loadingContainer}>
           <ActivityIndicator animating={true} color={Constants.color2}
                   style={styles.activityIndicator}
                      size="large"/>  
        </View>}
        {showAlerts()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    ...Platform.select({
        android: {
            marginTop: StatusBar.currentHeight
        } })
  },loadingContainer:{
    backgroundColor:'rgba(255,255,255,0.6)',
    position: 'absolute',
    top:0,
    bottom:0, 
    left:0,
    right:0
  },
  activityIndicator:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:240
  }

});


const Mok = ({dispatch, nav}) => {

  return (<MokAppRouter navigation={addNavigationHelpers({
        dispatch,
        state: nav
      })}/>);}



const mapStateToMokProps = state => {
  return ({ nav: state.nav});
}


const MokAppWithNavigation = connect(mapStateToMokProps)(Mok)

var mapStateToProps = (state) =>{
  return ({
    alerts: state.alerts, activity:state.activity,
    uiEnabled:state.uiEnabled.uiEnabled,
    userId:state.auth.user_id
  });
}
module.exports = connect(mapStateToProps)(MokApp);