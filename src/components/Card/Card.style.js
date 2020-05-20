import {isAndroid} from '@freakycoder/react-native-helpers';

export const _textStyle = titleColor => {
  return {
    fontSize: 15,
    fontWeight: '700',
    paddingRight: 8,
    marginTop: 8,
    fonFamily: 'IRANSansMobile_Medium',
    color: titleColor,
  };
};

export default {
  _textInputStyle: {
    fontSize: 14,
    paddingRight: 15,

    fontWeight: '800',
    right: isAndroid ? 5 : 0,
    marginTop: isAndroid ? 0 : 3,
    height: isAndroid ? 35 : null,
    textAlign:'right'
  },
  container: {
    margin: 8,
    height: 75,
    paddingTop: 15,
    width: '95%',
    marginTop: 0,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerGlue: {
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
  },
  textContainer: {
    width: '90%',
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: isAndroid ? 10 : null,
  },
};
