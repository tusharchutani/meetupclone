import React, { Component } from 'react';
import Constants  from '../../MokUI/UIConstants';
import {TouchableOpacity, 
  Linking, 
  SectionList, 
  Text, 
  StyleSheet,
  View, 
  Image,
  Alert,
  ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {unauthUser} from '../../actions';
import _ from 'lodash';
import {Button} from 'react-native-elements';
const sections = [
  {
    id: 0,
    title: 'More Information',
    data: [
      {id: 0, text: 'Feed back/Report a problem', feedBack:true},
      {id: 1, text: 'Terms of Service', termsAndCondition:true},
    ]
  },
  {
    id: 1,
    title: 'Account Action',
    data: [
      {id: 1, text: 'Sign out',logOut:true}
    ]
  }
]

const extractKey = ({id}) => id

class Settings extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {isSigningOut:false}
    }
  signOut(){
    
    const {dispatch} = this.props; 
        Alert.alert(
        "Sign out",
        "Are you sure you want to sign out",
        [
          {text: 'Yes', 
          onPress: () =>{
            this.setState({isSigningOut:true});
            setTimeout(()=>{dispatch(unauthUser);}, 600);
            
          }
        },        
          {text: 'No', style: 'cancel'}
        ],
        { cancelable: true }
      )
  }


  renderItem = ({item}) => {
    if(item.logOut){
      return (
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.signOut()}}>
          <Text style={styles.logOutButton}>
            {item.text}
          </Text>
      </TouchableOpacity>
      )
    }else if(item.feedBack){
      return (
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{Linking.openURL("mailto:servicefeedback@spotapp.ca?subject=FEEDBACK").catch(err => console.log('An error occurred', err));}}>
          <Text style={styles.row}>
            {item.text}
          </Text>
      </TouchableOpacity>        
        );
    }else if(item.termsAndCondition){
      return (
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{Linking.openURL("http://spotapp.ca/terms").catch(err => console.log('An error occurred', err));}}>
          <Text style={styles.row}>
            {item.text}
          </Text>
      </TouchableOpacity>        
        );
    }

    return (
      <TouchableOpacity style={{flexDirection:'row'}}>
      <Text style={styles.row}>
        {item.text}
      </Text>
      </TouchableOpacity>
    )
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userId && this.state.isSigningOut){
      this.setState({isSigningOut:false});
    }
  }

  renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={styles.sectionHeaderText}>
          {section.title}
        </Text>
      </View>

    )
  }
  renderHeader(){
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/new_logo.png')}
        style={{width: 145, height: 145}}/>
        <Text style={{fontSize:18, fontWeight:'bold'}}>Spot</Text>
    </View>)
  }

  render() {
    return (
      <View style={{flex:1}}>

         <SectionList
        style={styles.container}
        sections={sections}
        ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader()}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={extractKey}
      />

        {this.state.isSigningOut && 
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={Constants.color2}
                 style={styles.activityIndicator}
                      size="large"/>  
        </View>}     
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
    backgroundColor: Constants.color1,
    color: Constants.color3,
  },rowInfo:{
    padding: 10,
    marginBottom: 5,
    backgroundColor: Constants.color1,
    color: Constants.color6,
    fontWeight: 'bold',  
    fontSize:14
  },
  loadingContainer:{
    backgroundColor:'rgba(255,255,255,0.6)',
    position: 'absolute',
    top:0,
    bottom:0, 
    left:0,
    right:0
  },activityIndicator:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:240
  },
  headerContainer:{
    flex:1,
    alignItems:'center',
    paddingBottom:30,
    paddingTop:10
  },logOutButton:{
    color:'red',
    fontSize:15,
    padding: 7,
  },
  sectionHeaderText:{
    padding: 7,
    color: Constants.color2,
  },
  sectionHeaderView:{
      borderRadius: 1, 
      borderWidth:1,
      borderColor:'#EDEDED',
      backgroundColor: Constants.color6
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Constants.tableDividerColor,
  }
})


var mapStateToProps = (state) =>{
  return {
    userId:state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(Settings);