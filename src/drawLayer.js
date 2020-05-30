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
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import {Card} from 'react-native-elements';

import PropTypes from 'prop-types';

import ORG from './assets/Image/layer.png';
import mapAction from './action/mapAction';
import MyMainView from './MyMainView';
const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class DrawLayer extends React.Component {
  static PropTypes = {
    image: PropTypes.any,
    funMain: PropTypes.any,
    dataPro: PropTypes.any,
    dataOrg: PropTypes.any,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      animationValue: 50,
      animationValueWidth: 50,
      w: 80,
      h: 50,
      pRight: 10,
      viewStateAnimIcon: false,
      viewState: true,
      viewStateAnim: true,
      data: [{name: 'شهداری'}, {name: 'اتش نشانی'}],
      padding: new Animated.Value(0),

      animationValueQuality: new Animated.Value(true),
    };
  }
  toggleAnimation = () => {
    LayoutAnimation.spring();
    this.setState({
      w: this.state.animationValueWidth + 200,
      h: this.state.animationValue + 200,
    });
    this.setState({viewStateAnim: false});
    if (this.state.viewState == true) {
      // Animated.timing(this.state.animationValue, {
      //   toValue: 300,
      //   timing: 10000,
      // }).start(() => {
      //   this.setState({viewState: false});
      // });
      // Animated.timing(this.state.animationValueWidth, {
      //   toValue: 200,
      //   timing:2000,
      //  // <-- Add this
      // }).start(() => {
      //   this.setState({viewState: false, padding: 10});
      // });
    } else {
      this.setState({viewStateAnim: true});
      Animated.timing(this.state.animationValue, {
        toValue: 50,
        duration: 1500,
      }).start();
      Animated.timing(this.state.animationValueWidth, {
        toValue: 80,
        duration: 1500,
      }).start();

      this.setState({viewStateAnim: true});
    }
  };
  _onPress = () => {
    if (this.state.viewState == true) {
      setTimeout(() => {
        this.setState({
          viewStateAnimIcon: true,
        });
      }, 10);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          w: this.state.w + 20,
          h: this.state.h + 100,
          borderTopRightRadius: this.state.h / 10,
          borderBottomRightRadius: this.state.h / 10,
          pRight: this.state.pRight + 10,
        });
      }, 200);

      setTimeout(() => {
        this.setState({
          viewStateAnimIcon: true,
          viewStateAnim: false,
          viewState: false,
        });
      }, 400);
    } else {
      // Animate the update

      this.setState({
        viewStateAnimIcon: false,
        viewStateAnim: true,
        viewState: true,
      });

      LayoutAnimation.easeInEaseOut();
      this.setState({
        w: this.state.w - 20,
        h: this.state.h - 100,
        pRight: 10,
      });
    }
  };
  componentDidMount() {
    // this.toggleAnimation();
  }
  renderItem(item) {
    let {dataPro} = this.props;
    console.log('ItemOrg', item);

    return (
      <TouchableOpacity
        onPress={() => {
          dataPro(item.orgId);
          LayoutAnimation.create();
          this.setState({
            w: this.state.w - 80,
            h: this.state.h - 300,
            pRight: 10,
          });
          this.setState({
            viewStateAnim: !this.state.viewStateAnim,
            viewState: !this.state.viewState,
          });
        }}>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 12}}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const animatedStyle = {
      height: this.state.animationValue,
      width: this.state.animationValueWidth,
      borderTopRightRadius: 300 / 10,
      borderBottomRightRadius: 300 / 10,
      paddingBottom: this.state.padding,
    };
    const ani = {
      opacity: this.state.animationValueQuality,
    };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            activeOpacity={0.1}
            style={[
              styles.box,
              {
                width: this.state.w,
                height: this.state.h,
                paddingRight: this.state.pRight,
              },
            ]}
            onPress={this._onPress}>
            <View
              style={[
                styles.box,
                {
                  width: this.state.w,
                  height: this.state.h,
                },
              ]}>
              {this.state.viewStateAnim == false ? (
                <MyMainView
                  action={this.props.action}
                  style={{width: '100%', backgrundColor: '#000', opacity: -1}}
                />
              ) : null}
              {this.state.viewStateAnimIcon == true ? null : (
                <Image
                  style={[styles.image, {marginRight: this.state.pRight}]}
                  source={ORG}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  box: {
    width: 80,
    height: 300,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  flat: {
    width: '100%',
    height: '100%',
  },
  MainContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: 20,
    height: 20,
    opacity: 100,
  },
  animatedBox: {
    backgroundColor: '#fff',

    width: 80,
    marginBottom: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
  },

  text: {
    color: '#FFFFFF',
  },
});
