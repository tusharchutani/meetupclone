import React, { Component } from 'react';
import Constants  from '../../MokUI/UIConstants';
import Prompt from 'react-native-prompt';
import {TouchableOpacity, SectionList, Text, StyleSheet,View } from 'react-native';

const sections = [
  {
    id: 0,
    title: 'My Account',
    data: [
      {id: 0, text: 'Name',info:'Tushar Chutani'},
      {id: 1, text: 'UserName'},
      {id: 2, text: 'Birthday'},
      {id: 3, text: 'Mobile Number'},
      {id: 4, text: 'Email'},
      {id: 5, text: 'Update Password'},
    ]
  },
  {
    id: 1,
    title: 'Additional Services',
    data: [
      {id: 6, text: 'Manage Preferences'}
    ]
  },
  {
    id: 4,
    title: 'More Information',
    data: [
      {id: 11, text: 'Support'},
      {id: 12, text: 'Privacy Policy'},
      {id: 13, text: 'Terms of Service'},
      {id: 14, text: 'Other Legal'},
    ]
  },
  {
    id: 0,
    title: 'Account Action',
    data: [
      {id: 1, text: 'Deactivate Account'}
    ]
  }
]

const extractKey = ({id}) => id

export default class App extends Component {
  
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.setState({promptVisible:true})}}>
      <Text style={styles.row}>
        {item.text}
      </Text>
      <Text style={styles.rowInfo}>
        {item.info}
      </Text>      
      </TouchableOpacity>
    )
  }

  constructor(props, context) {
     super(props, context);
      this.state = {
        promptVisible:false
      }
  }  
  
  renderSectionHeader = ({section}) => {
    return (
        <Text style={styles.header}>
          {section.title}
        </Text>
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
          <Prompt
        title="Edit"
        placeholder="Start typing"
        defaultValue={this.state.promptValue}
        visible={ this.state.promptVisible }
        onCancel={ () => this.setState({
          promptVisible: false,
          message: "You cancelled"
        }) }
        onSubmit={ (value) => this.setState({
          promptVisible: false,
          message: `You said "${value}"`
        }) }/>
         <SectionList
        style={styles.container}
        sections={sections}
        ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={extractKey}
      />
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: Constants.color1,
  },
  row: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: Constants.color1,
    color: Constants.color3,
  },rowInfo:{
    padding: 10,
    marginBottom: 5,
    backgroundColor: Constants.color1,
    color: Constants.color2,
    fontWeight: 'bold',  
    fontSize:14
  },
  header: {
    padding: 7,
    marginBottom: 5,
    backgroundColor: Constants.color3,
    color: Constants.color2,
    fontWeight: 'bold'
    //opacity: 0.7
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor,
  }
})