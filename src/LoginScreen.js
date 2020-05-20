import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-spinkit';
/**
 * ? Local Imports
 */
import Logo from './components/Logo/Logo';
import styles, {container} from './LoginScreen.style';
import BottomContainer from './components/BottomContainer/BottomContainer';
import {
  ScreenWidth,
  ScreenHeight,
  isIPhoneXFamily,
} from '@freakycoder/react-native-helpers';
const defaultBackground =
  'https://images.unsplash.com/photo-1543637005-4d639a4e16de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1481&q=80';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const LoginScreen = props => {
  const {
    source,
    loginText,
    spinnerType,
    spinnerSize,
    spinnerColor,
    onPressLogin,
    spinnerStyle,
    spinnerEnable,
    spinnerVisibility,
    loginButtonTextStyle,
    loginButtonBackgroundColor,
  } = props;

  renderSpinner = () => (
    <View style={styles.spinnerStyle}>
      <Spinner
        size={spinnerSize}
        type={spinnerType}
        style={spinnerStyle}
        color={spinnerColor}
        isVisible={spinnerVisibility}
      />
    </View>
  );

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: height,
        }}>
        <View
          enabled={false}
          behavior="height"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: ScreenWidth,
                height: '100%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={source}
                resizeMode="stretch"
                style={{
                  width: ScreenWidth,
                  height: '100%',
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            wdith: '100%',
            height: ScreenHeight - 100,
          }}
          behavior="padding"
          enabled>
          <View style={styles.loginContainer}>
            <Logo {...props} />
          </View>
          <BottomContainer style={{}} {...props} />
        </View>
        
      </View>
    </KeyboardAwareScrollView>
  );
};

LoginScreen.propTypes = {
  loginText: PropTypes.string,
  spinnerEnable: PropTypes.bool,
  spinnerType: PropTypes.string,
  spinnerSize: PropTypes.number,
  spinnerColor: PropTypes.string,
  spinnerVisibility: PropTypes.bool,
  loginButtonBackgroundColor: PropTypes.string,
};

LoginScreen.defaultProps = {
  spinnerSize: 30,
  loginText: 'LOGIN',
  spinnerEnable: false,
  spinnerColor: ScreenWidth,
  spinnerVisibility: false,
  spinnerType: 'ThreeBounce',
  source: {uri: defaultBackground},
  loginButtonBackgroundColor: '#282828',
  loginButtonTextStyle: styles.loginButtonTextStyle,
};

export default LoginScreen;
