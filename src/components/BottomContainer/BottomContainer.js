import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Text, View, TouchableOpacity} from 'react-native';
import Card from '../Card/Card';
import Icon from 'react-native-dynamic-vector-icons';
import styles, {container} from './BottomContainer.style';
import {Button} from 'react-native-elements';

const BottomContainer = props => {
  const {
    switchText,
    switchValue,
    disableSwitch,
    IconComponent,
    backgroundColor,
    switchTextStyle,
    onPressSettings,
    disableSettings,
    contentComponent,
    onSwitchValueChange,
    usernameOnChangeText,
    onPressLogin,
    passwordOnChangeText,
    usernameIconComponent,
    passwordIconComponent,
    usernameTextInputValue,
    passwordTextInputValue,
  } = props;
  return (
    <View style={container(backgroundColor)}>
      {contentComponent}
      <View style={styles.containerGlue}>
        <Card
          value={usernameTextInputValue}
          title="نام کاربری"
          placeholder="َMagFa123456764"

          onChangeText={usernameOnChangeText}
          iconComponent={usernameIconComponent}
          {...props}
        />
        <Card
          name="key"
          secureTextEntry
          title="رمز عبور"
          type="FontAwesome"
          value={passwordTextInputValue}
          placeholder="َABCDEF@G123456"
          onChangeText={text => passwordOnChangeText(text)}
          iconComponent={passwordIconComponent}
          {...props}
        />
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Button
          containerStyle={{width: 200,height:50, borderRadius: 8}}
          buttonStyle={{width: 200,height:50, borderRadius: 8}}
          titleStyle={{fontSize:18}}
          iconRight
          onPress={onPressLogin}
          title="ورود"
        />
      </View>
    </View>
  );
};

BottomContainer.propTypes = {
  switchText: PropTypes.string,
  disableSwitch: PropTypes.bool,
  disableSettings: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

BottomContainer.defaultProps = {
  IconComponent: Icon,
  disableSwitch: false,
  disableSettings: false,
  switchText: 'Remember me',
  backgroundColor: 'rgba(255,255,255,0.45)',
};

export default BottomContainer;
