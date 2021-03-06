import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {List, ListItem} from 'react-native-elements';

export default class Followers extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount(){
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

 
render() {
  return (
    <List>
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
          />
        )}
      />
    </List>
  );
}
}

  // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      
       

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
    
});


AppRegistry.registerComponent('Followers', () => Followers);