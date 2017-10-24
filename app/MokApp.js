import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import MokAppRouter from './AppRouter';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {hideAlert} from './actions';
import {Font} from 'expo';
export default class MokApp extends Component {


   componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/MaterialIcons-Regular.ttf'),
    });
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
    return (
      <View style={styles.container}>
        
      	<MokAppWithNavigation/>
      	{showAlerts()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }});


const Mok = ({dispatch, nav}) => (<MokAppRouter navigation={addNavigationHelpers({
        dispatch,
        state: nav
      })}/>);



const mapStateToMokProps = state => {
  return ({ nav: state.nav});
}


const MokAppWithNavigation = connect(mapStateToMokProps)(Mok)

var mapStateToProps = (state) =>{
return ({alerts: state.alerts, activity:state.activity });
}
module.exports = connect(mapStateToProps)(MokApp);