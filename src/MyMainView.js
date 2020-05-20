import React, {Component} from 'react';
import {
  Switch,
  SliderIOS,
  PickerIOS,
  PickerItemIOS,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

import winter from './assets/Image/forestwi.png';
import teh from './assets/Image/forestteh.png';
import green from './assets/Image/foresgreen.png';
import styles from './styles';
import Button from './Button';
import PropTypes from 'prop-types';

export default class MyMainView extends Component {
  setParentState(args) {
    this.props.setParentState(args);
  }
  static PropTypes = {
    action: PropTypes.func,
  };

  render() {
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <View style={{height: 15}} />
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => {
            this.props.action(1);
          }}>
          <Image style={{width: 30, height: 30}} source={winter} />
        </TouchableOpacity>
        <View style={{height: 15}} />
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => {
            this.props.action(2);
          }}>
          <Image style={{width: 30, height: 30}} source={teh} />
        </TouchableOpacity>
        <View style={{height: 15}} />
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => {
            this.props.action(3);
          }}>
          <Image style={{width: 30, height: 30}} source={green} />
        </TouchableOpacity>
      </View>
    );
  }
}

// Shadow props are not supported in React-Native Android apps.
// The below part handles this issue.

// iOS Styles
var iosStyles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.75,
  },
});

const iosMinTrTintColor = '#1073ff';
const iosMaxTrTintColor = '#b7b7b7';
const iosThumbTintColor = '#343434';

// Android styles
const androidStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 4 / 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});

const androidMinTrTintColor = '#26A69A';
const androidMaxTrTintColor = '#d3d3d3';
const androidThumbTintColor = '#009688';

const sliderStyles = Platform.OS === 'ios' ? iosStyles : androidStyles;
const minimumTrackTintColor =
  Platform.OS === 'ios' ? iosMinTrTintColor : androidMinTrTintColor;
const maximumTrackTintColor =
  Platform.OS === 'ios' ? iosMaxTrTintColor : androidMaxTrTintColor;
const thumbTintColor =
  Platform.OS === 'ios' ? iosThumbTintColor : androidThumbTintColor;
