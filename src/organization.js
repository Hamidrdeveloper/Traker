/* eslint-disable react-native/no-inline-styles */
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

import ORG from './assets/Image/menu.png';
import mapAction from './action/mapAction';
import Icon from 'react-native-vector-icons/FontAwesome';
const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class Organization extends React.Component {
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
      LayoutAnimation.linear();
      this.setState({
        w: this.state.w + 95,
        h: this.state.h + 300,

        borderTopRightRadius: this.state.h / 10,
        borderBottomRightRadius: this.state.h / 10,
        pRight: this.state.pRight + 70,
      });
    } else {
      LayoutAnimation.linear();
      this.setState({
        w: this.state.w - 95,
        h: this.state.h - 300,
        pRight: 10,
      });
    }

    this.setState({
      viewStateAnim: !this.state.viewStateAnim,
      viewState: !this.state.viewState,
    });
    // Animate the update
  };
  componentDidMount() {
    // this.toggleAnimation();
  }
  renderItem(item) {
    let {dataPro} = this.props;
    console.log('ItemOrg', item);
    var title = item.text;
    var titleSub = title.substring(0, 19);

    return (
      <View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <View style={{width: 10}} />
          <TouchableOpacity
            onPress={() => {
              dataPro(item.orgId);
              LayoutAnimation.linear();
              this.setState({
                w: this.state.w - 95,
                h: this.state.h - 300,
                pRight: 10,
              });
              this.setState({
                viewStateAnim: !this.state.viewStateAnim,
                viewState: !this.state.viewState,
              });
            }}>
            <Text style={{fontSize: 15}}>{titleSub + '...'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 80,
              height: 35,
              position: 'absolute',
              left: 0,
              paddingLeft:8,
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              alert('hi');
            }}>
            <Icon name="chevron-down" size={14} />
          </TouchableOpacity>
        </View>
      </View>
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
                <FlatList
                  style={styles.flat}
                  data={this.props.dataOrg}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => this.renderItem(item)}
                />
              ) : null}
              <Image
                style={[styles.image, {marginRight: this.state.pRight}]}
                source={ORG}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
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
