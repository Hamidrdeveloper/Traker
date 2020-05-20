import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';

import PropTypes from 'prop-types';
import mapAction from './action/mapAction';

import snow from './assets/Image/forestwi.png';

export default class Home extends React.Component {
  static PropTypes = {
    image: PropTypes.any,
    funMain: PropTypes.any,
    styleImage: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={[styles.image, this.props.styleImage]}
            source={this.props.image}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: 80,
    height: 85,
    paddingBottom: 15,
  },
  image: {
    width: 20,
    height: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: 80,
    height: 50,
    marginBottom: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
  },
  map: {
    flex: 5,
  },
  text: {
    padding: 20,
  },
});
