import React from 'react';
import { StyleSheet, AppRegistry } from 'react-native';

import MokApp from './app/MainApp';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {configureStore} from './app/store';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';

export default class App extends React.Component {




  _mokApp = null;

  render() {
    console.ignoredYellowBox = ['Remote debugger'];
    
    return (
      <Provider style={styles.container} store={configureStore()}>
         <MokAppWithNavigation />
      </Provider>
    );
  }
}

/*const Mok = ({dispatch, nav}) => (
    <MokApp navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}/>
);*/


const Mok = ({dispatch, nav}) => (<MokApp ref={(mokApp)=> {this._mokApp = mokApp;}} navigation={addNavigationHelpers({
        dispatch,
        state: nav
      })}/>);






const mapStateToProps = state => {
  if(state.auth.user && this._mokApp){

    const navigateAction = NavigationActions.navigate({routeName: 'MainApp'});
    // _mokApp.props.navigation.dispatch(navigateAction);
    console.log("Map state to props function");
    
  }
  return ({ nav: state.nav});

}

const MokAppWithNavigation = connect(mapStateToProps)(Mok)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



module.exports = App;