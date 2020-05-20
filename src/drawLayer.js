import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import Drawer from 'react-native-drawer';
import MyMainView from './MyMainView';
import PropTypes from 'prop-types';
import Home from './Home';
import layer from './assets/Image/layer.png';
import mapAction from './action/mapAction';

import snow from './assets/Image/forestwi.png';
const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    shadowOpacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',

    shadowRadius: 3,
  },
  main: {width: '100%'},
};

export default class DrawLayer extends React.Component {
  static PropTypes = {
    image: PropTypes.any,
    funMain: PropTypes.any,
    action: PropTypes.any,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      animationValue: new Animated.Value(50),
      viewState: true,
    };
  }

  
  openDrawer = () => {
    var flag = false;
    if (flag == false) {
      this._drawer.open();
      flag = true;
    } else {
      flag = false;
      this._drawer.close();
    }
  };

  render() {
    return (
      <Drawer
        tapToClose={true}
        ref={c => (this._drawer = c)}
        type="displace"
        content={
          <MyMainView
            action={this.props.action}
            stayle={{width: '100%', backgrundColor: '#000'}}
          />
        }
        openDrawerOffset={100}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
        side={'left'}>
        <TouchableOpacity
          style={{width: 80, height: 50}}
          activeOpacity={0.1}
          onPress={() => {
            this.openDrawer();
          }}>
          <Home style={styles.home} image={layer} />
        </TouchableOpacity>
      </Drawer>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 15,
  },
  MainContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  home: {
    width: 80,
    height: 50,
    backgroundColor: '#2980b9',
  },
  animatedBox: {
    backgroundColor: '#fff',

    width: 80,
    height: 50,
    marginBottom: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
    width: 80,
    height: 50,
  },

  text: {
    color: '#FFFFFF',
  },
});
