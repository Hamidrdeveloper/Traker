// import React from 'react';
// import {StyleSheet, View, Text, Image, AsyncStorage} from 'react-native';

// import MapboxGL from '@react-native-mapbox-gl/maps';

// import {Platform} from 'react-native';

// MapboxGL.setAccessToken(
//   'pk.eyJ1IjoiaGFtaWRyZGV2ZWxvcGVyIiwiYSI6ImNrM2xhZ2FoeDA1ODEzZ29ka3ExYTJ5Mm0ifQ.pSeMvX8deDC0j9shkjKvfg',
// );
// import exampleIcon from './assets/Image/jh.png';

// import Toast from 'react-native-simple-toast';
// import Login from './Login';
// import ShowMap from './Map';

// export const IS_ANDROID = Platform.OS === 'android';

// export default class Main extends React.Component {
//   static navigationOptions = {
//     headerMode: 'none',
//   };
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       username: 'ss',
//       password: 'ss',
//       flag: false,
//       isLogin: false,
//     };
//   }
//   componentDidMount() {
//     AsyncStorage.multiGet([
//       'username',
//       'password',
//       'companyId',
//       'userid',
//       'contactId',
//     ]).then(data => {
//       console.log('Login', data[0][1]);
//       console.log('Login2', data[2][1]);
//       if (data[0][1].length > 2) {
//         this.setState({isLogin: true});
//       }
//       // LoginAction.getLogin().then(user => console.log('Login3', user));
//     });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.isLogin ? <ShowMap /> : <Login />}
//       </View>
//     );
//   }
// }

// var styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 12,
//   },
//   text: {
//     color: '#FFFFFF',
//   },
//   container: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'flex-end',
//   },
//   imageGps: {
//     backgroundColor: '#3498db',
//     borderTopLeftRadius: 100,
//     borderBottomLeftRadius: 100,
//     width: 80,
//     height: 50,
//     marginBottom: 15,
//     paddingLeft: 15,
//     justifyContent: 'center',
//   },
//   imageLine: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 100,
//     borderBottomLeftRadius: 100,
//     width: 80,
//     height: 50,
//     marginBottom: 15,
//     paddingLeft: 15,
//     justifyContent: 'center',
//   },
//   imageLayer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 100,
//     borderBottomLeftRadius: 100,
//     width: 80,
//     height: 50,
//     marginBottom: 15,
//     paddingLeft: 15,
//     justifyContent: 'center',
//   },
//   image: {
//     width: 30,
//     height: 30,
//   },
//   home: {
//     width: 80,
//     height: 50,
//     backgroundColor: '#2980b9',
//   },
//   right: {flex: 1, width: '50%', height: '100%'},
//   left: {
//     alignSelf: 'flex-end',
//     alignContent: 'flex-end',
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   map: {
//     flex: 5,
//   },
//   text: {
//     padding: 20,
//   },
// });
