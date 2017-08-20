import React, { Component } from 'react'
import {TouchableOpacity, SectionList, Text, StyleSheet } from 'react-native'

const sections = [
  {
    id: 0,
    title: 'My Account',
    data: [
      {id: 0, text: 'Name'},
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
    id: 2,
    title: 'Who Can...',
    data: [
      {id: 7, text: 'Add Me'},
      {id: 8, text: 'See Me Going to an Event'},
    ]
  },
  {
    id: 3,
    title: 'Advanced',
    data: [
      {id: 9, text: 'Notification Settings'},
      {id: 10, text: 'Leave a Review'},
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
      {id: 0, text: 'Clear Cache'},
      {id: 1, text: 'Deactivate Account'}
    ]
  }
]

const extractKey = ({id}) => id

export default class App extends Component {
  
  renderItem = ({item}) => {
    return (
      <TouchableOpacity>
      <Text style={styles.row}>
        {item.text}
      </Text>
      </TouchableOpacity>
    )
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
      <SectionList
        style={styles.container}
        sections={sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'lightgrey',
  },
  header: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    //opacity: 0.7
  },
})