import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import USBoxList from './USBoxList';
import MovieDetail from './MovieDetail';

import styles from '../style/main';

class USBox extends Component {
  static navigationOptions = {
    title: '北美票房',
    headerStyle: {
      backgroundColor: 'darkslateblue'
    },
    headerTintColor: 'rgba(255,255,255,0.8)'
  };
  render(){
    const { navigation } = this.props;
    return(
      <USBoxList navigation= {navigation} />
    )
  }
}

const homePage = StackNavigator({
  Home: { screen: USBox },
  MoveiDetail: { screen: MovieDetail }
});

export { homePage as default }
