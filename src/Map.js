/* eslint-disable no-dupe-class-members */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Switch,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Modal,
  AsyncStorage,
  Alert,
  BackHandler,
} from 'react-native';
import gps from './assets/Image/gps.png';

import signs from './assets/Image/signs.png';
import MapboxGL from '@react-native-mapbox-gl/maps';
import line from './assets/Image/dirction.png';
import closePop from './assets/Image/signsha.png';
import LinearGradient from 'react-native-linear-gradient';
import down from './assets/Image/down_arrow.png';
import DrawLayer from './drawLayer';
import Organization from './organization';
import mapAction from './action/mapAction';
import exampleIcon from './assets/Image/jh.png';
import exampleIconTow from './assets/Image/transport.png';
import Toast from 'react-native-simple-toast';
import LayerMap from './LayerMap';
import {onSortOptions} from './utils';
import line_sample from './line_sample.json';
export const IS_ANDROID = Platform.OS === 'android';

import {Card} from 'react-native-elements';
import smileyFaceGeoJSON from './smiley_face.json';

const layerStyles = {
  background: {
    backgroundPattern: exampleIcon,
  },
  smileyFace: {
    iconImage: 'exampleIcon',
    iconRotationAlignment: 'map',
    iconAllowOverlap: true,
    iconOptional: true,

    // textIgnorePlacement: true,
    // textField: ' this.state.count.toString()',
    // textSize: 15,
    // textMaxWidth: 50,
    // textColor: '#FFF',
    // textAnchor: 'center',
    // textTranslate: [22, -22],
    // textAllowOverlap: true,
  },
};
var idLineCarBefore = 0;
var dataPro = '';
class ShowMap extends React.Component {
  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
      routeFillMapFull: 'visible',
      drawerType: 'overlay',
      openDrawerOffset: 100,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      panCloseMask: 0.9,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      jsonMap: {features: [1, 2]},
      routeFill: 'none',
      isFindCar: false,
      modalVisible: false,
      isFetchingAndroidPermission: IS_ANDROID,
      teamTehran: 'visible',
      addressTehran:
        'https://sorna.tehran.ir:8090/Java/proxy.jsp?http://31.24.236.12:6080/arcgis/rest/services/BASEMAP/MapServer/export?FORMAT=PNG32&F=image&TRANSPARENT=true&SIZE=256%2C256&bbox={bbox-epsg-3857}&BBOXSR=3857&IMAGESR=3857&DPI=90',
      vehicleInfo: '',
      locationCar: [51.087286, 35.431924],
      showUserLocation: true,
      zoom: 7,
      imei: 0,
      dataOrg: [{text: 'شهداری'}, {text: 'اتش نشانی'}],
      styleMapeTheme:
        'mapbox://styles/hamidrdeveloper0263/cka1ad2np3hqp1iph6tryhw7a',
      validCarLine: false,
      line_sample: {
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [[51.087286, 35.431924]],
            },
            properties: {
              bear: 70,
              IMEI: '867965023074335',
              isMobile: '0',
            },
          },
        ],
        type: 'FeatureCollection',
      },
    };
    this.onLayer = this.onLayer.bind(this);

    this.onMapChange = this.onMapChange.bind(this);
    this.onUserMarkerPress = this.onUserMarkerPress.bind(this);
  }

  handleBackButton = () => {
    Alert.alert(
      'هشدار',
      'آیا از برنامه می خواهید خارج شوید ؟',
      [
        {
          text: 'خیر',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'بله', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };
  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiaGFtaWRyZGV2ZWxvcGVyMDI2MyIsImEiOiJja2EzNWpod28wOGpuM2ZwOXlkaWNrdThjIn0.szYu38lZ7D4fEoHGHX_3vA',
    );
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
      MapboxGL.setAccessToken(
        'pk.eyJ1IjoiaGFtaWRyZGV2ZWxvcGVyMDI2MyIsImEiOiJja2EzNWpod28wOGpuM2ZwOXlkaWNrdThjIn0.szYu38lZ7D4fEoHGHX_3vA',
      );
    }
  }
  onTrackingChange(index, userTrackingMode) {
    this.setState({
      userSelectedUserTrackingMode: userTrackingMode,
      currentTrackingMode: userTrackingMode,
    });
  }
  onToggleUserLocation() {
    this.onTrackingChange(1, MapboxGL.UserTrackingModes.Follow);

    this.setState({
      showUserLocation: !this.state.showUserLocation,
    });
  }
  onLayer(id) {
    switch (id) {
      case 1:
        this.setState({
          styleMapeTheme:
            'mapbox://styles/hamidrdeveloper0263/cka4j1lac06hc1inz7v5i1jj6',
          teamTehran: 'none',
        });
        console.log(id + '' + this.state.styleMapeTheme);
        return true;

      // eslint-disable-next-line no-fallthrough
      case 2:
        this.setState({
          styleMapeTheme:
            'mapbox://styles/hamidrdeveloper0263/cka4iylj006aw1imnpvj3s8jn',
          teamTehran: 'none',
        });
        console.log(id + '' + this.state.styleMapeTheme);
        return true;

      // eslint-disable-next-line no-fallthrough
      case 3:
        this.setState({
          teamTehran: 'visible',
          addressTehran:
            'https://sorna.tehran.ir:8090/Java/proxy.jsp?http://31.24.236.12:6080/arcgis/rest/services/BASEMAP/MapServer/export?FORMAT=PNG32&F=image&TRANSPARENT=true&SIZE=256%2C256&bbox={bbox-epsg-3857}&BBOXSR=3857&IMAGESR=3857&DPI=90',
        });
        console.log(id + '' + this.state.styleMapeTheme);
        return true;
    }
  }
  onExit() {
    let keys = ['username', 'password', 'userid'];

    AsyncStorage.multiRemove(keys, err => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
      console.log('AsyncStorage', err);
    });
    this.props.navigation.goBack();
  }
  onSetLineCar(e, index) {
    console.log('LINE', e);
    idLineCarBefore = 0;
    var e_i = e.features[0].properties.IMEI;
    this.setState({
      imei: e_i,
    });
    mapAction.getApiVehicleInfo(e.features[0].properties.IMEI).then(data => {
      console.log('INFO', data);
      if (data.length > 0) {
        this.setState({
          vehicleInfo: data[0],
          modalVisible: !this.state.modalVisible,
          validCarLine: true,
          idLineCar: e.features[0].properties.IMEI,
        });
      }
    });
  }
  onClosePopUp() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  getMark = id => {
    this.setState({
      jsonMap: smileyFaceGeoJSON,
      zoom: 8,
    });

    mapAction.getApiMarker(id).then(data => {
      var getMark = JSON.parse(data);
      this.setState({
        jsonMap: getMark,
      });
      console.log('jsonMap', this.state.jsonMap);
    });
  };
  componentDidMount() {
    let {navigation} = this.props;
    MapboxGL.locationManager.start();
    this.getMark(
      '98507,89692,87493,89610,109876,87493,38526,89667,38547,96203',
    );
    var dataPro = navigation.getParam('dataPro', 'NO-User');
    AsyncStorage.multiGet([
      'username',
      'password',
      'companyId',
      'userid',
      'contactId',
    ]).then(data => {
      console.log('Login', data[0][1]);
      console.log('Login2', data[3][1]);
      if (data[3][1].length > 2) {
        mapAction.getOrganization(data[3][1]).then(json => {
          console.log('HI', json);

          var api = json.organization[0].childrens;

          this.setState({
            dataOrg: api,
          });
        });
      }
      // LoginAction.getLogin().then(user => console.log('Login3', user));
    });
  }

  componentWillUnmount() {
    MapboxGL.locationManager.stop();
  }

  onMapChange(index, styleURL) {
    this.setState({styleURL});
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  onFindCar = item => {
    this.setState({
      isFindCar: false,
      locationCar: item.geometry.coordinates,
      zoom: 14,
    });
  };
  onOpenDropCar = () => {
    this.setState({
      isFindCar: true,
    });
  };
  renderItemForCar({item, index}) {
    console.log(item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.onFindCar(item);
          }}>
          <Card
            containerStyle={{
              padding: 8,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{item.properties.IMEI}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  onShowLineCar() {
    const {validCarLine, idLineCar} = this.state;
    var i = this.state.imei;

    if (validCarLine && idLineCar != idLineCarBefore) {
      Toast.show('در حال مسیریابی');

      mapAction.getApiLine(i).then(data => {
        if (data != 'error') {
          var line = {
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [[51.087286, 35.431924]],
                },
                properties: {
                  bear: 70,
                  IMEI: '867965023074335',
                  isMobile: '0',
                },
              },
            ],
            type: 'FeatureCollection',
          };
          line.features[0].geometry = data;

          console.log('line_sample', line);
          if (data.coordinates.length > 2) {
            this.setState({
              line_sample: line,
              routeFill: 'visible',
              routeFillMapFull: 'none',
            });
          } else {
            Toast.show('کاربر حرکتی نکرده است');
            this.setState({
              routeFill: 'none',
              validCarLine: false,
              routeFillMapFull: 'visible',
              addressTehran: '',
            });
          }
        } else {
          Toast.show('کاربر حرکتی نکرده است');
          this.setState({
            routeFill: 'none',
            validCarLine: false,
            routeFillMapFull: 'visible',
          });
        }
      });
      idLineCarBefore = idLineCar;
    } else {
      if (validCarLine === false) {
        Toast.show('لطفا اول ماشین را انتخاب کنید ');
      }
      idLineCarBefore = 0;

      this.setState({
        routeFill: 'none',
        validCarLine: false,
        routeFillMapFull: 'visible',
      });
    }
  }
  render() {
    let {modalVisible, vehicleInfo, isFindCar} = this.state;
    if (vehicleInfo != '') {
      var latitudeInf = vehicleInfo.latitude.substring(0, 12);
      var longtitudeInfo = vehicleInfo.longtitude.substring(0, 12);
    }

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          styleURL={this.state.styleMapeTheme}
          style={{width: '100%', height: '100%', position: 'absolute'}}>
          <MapboxGL.Camera
            zoomLevel={this.state.zoom}
            centerCoordinate={this.state.locationCar}
          />
          {this.state.teamTehran == 'visible' ? (
            <View>
              <MapboxGL.RasterSource
                id={'wms-test-source'}
                sourceID="wms-test-source"
                tileSize={256}
                url={this.state.addressTehran}
              />
              <MapboxGL.RasterLayer
                id="wms-test-source"
                sourceID="wms-test-source"
                style={{visibility: 'visible', rasterOpacity: 1}}
              />
            </View>
          ) : null}
          <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
          <MapboxGL.MarkerView coordinate={[51.087286, 35.431924]} />

          <MapboxGL.Images images={{exampleIcon}} />
          <MapboxGL.Images images={{exampleIconTow}} />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            cluster={true}
            onPress={(e, index) => this.onSetLineCar(e, index)}
            clusterMaxZoomLevel={10}
            shape={this.state.jsonMap}>
            <MapboxGL.SymbolLayer
              id="exampleIconName"
              style={{
                iconImage: 'exampleIcon',
                iconRotationAlignment: 'map',
                iconAllowOverlap: true,
                iconOptional: true,
                visibility: this.state.routeFillMapFull,
              }}
            />
            <MapboxGL.SymbolLayer
              id="clusters"
              type="circle"
              source="earthquakes"
              filter={['has', 'point_count']}
              style={{
                iconImage: 'exampleIconTow',
                iconSize: 0.3,
                iconRotationAlignment: 'map',
                iconAllowOverlap: true,
                iconOptional: true,
                visibility: this.state.routeFillMapFull,
                textField: '{point_count_abbreviated}',
                textColor: '#fff',
                textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                textSize: 12,
              }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource id="routeSource" shape={this.state.line_sample}>
            <MapboxGL.LineLayer
              id="routeFill"
              type="number"
              style={{
                lineDasharray: [4, 10],
                lineColor: 'red',
                lineWidth: 2,
                visibility: this.state.routeFill,
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={styles.right}>
            <DrawLayer action={this.onLayer} />
            <Organization dataOrg={this.state.dataOrg} dataPro={this.getMark} />
          </View>

          <View style={styles.left}>
            <TouchableOpacity onPress={() => this.onShowLineCar()}>
              <LayerMap
                style={styles.home}
                image={line}
                styleImageIn={{width: 20, height: 20}}
                styleImage={
                  this.state.validCarLine === true
                    ? {tintColor: '#3498db'}
                    : {tintColor: '#000'}
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => this.onToggleUserLocation()}>
              <LayerMap
                style={styles.home}
                image={gps}
                action={this.gpsFine}
                styleImageIn={{
                  width: 20,
                  height: 20,
                  tintColor: '#fff',
                }}
                styleImage={{tintColor: '#3498db'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onExit()}>
              <LayerMap
                style={styles.home}
                image={signs}
                action={this.onExit}
                styleImageIn={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
            <View style={{width: '100%', height: '100%'}}>
              <Card
                containerStyle={{
                  width: '80%',
                  borderRadius: 20,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    paddingLeft: 20,
                  }}>
                  <Text style={{fontSize: 17, width: '85%'}}>
                    {vehicleInfo.orgname}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 17}}>گروه کاری:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {vehicleInfo.drv_firstname}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>{'نام و نام خانوادگی:'}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>{vehicleInfo.sm_numbersim}</Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>شماره همراه:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {vehicleInfo.plaqueleftno +
                      +' ' +
                      vehicleInfo.plaquechar_name +
                      ' ' +
                      vehicleInfo.plaquerightno}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>پلاک:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>{vehicleInfo.imei}</Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>IMEI:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>{vehicleInfo.vh_vin}</Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>VIN:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {vehicleInfo.device_type_name}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>نوع دستگاه:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {vehicleInfo.persian_time + ':' + vehicleInfo.persian_date}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>زمان ارسال:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>{vehicleInfo.gps_speed}</Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>سرعت GPS:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>{vehicleInfo.sm_numbersim}</Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>شماره سیم کارت:</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {latitudeInf + ',' + longtitudeInfo}
                  </Text>
                  <View style={{width: 10}} />
                  <Text style={{fontSize: 15}}>مختصات:</Text>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', width: 48, height: 48}}
                  onPress={e => {
                    this.onClosePopUp();
                  }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: '#cccc',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                    }}>
                    <Image source={closePop} style={{width: 12, height: 12}} />
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            width: 130,
            alignSelf: 'center',
            height: 50,
          }}
          activeOpacity={8}
          onPress={this.onOpenDropCar}>
          <LinearGradient
            style={{
              position: 'absolute',
              bottom: 0,
              width: 130,
              alignSelf: 'center',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#3498DB', '#07609B']}>
            <Text style={{fontSize: 16, color: '#fff'}}>{'یافتن ماشین'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
          }}
        />
        <Modal visible={isFindCar} transparent={true}>
          <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Card
              containerStyle={{
                width: '90%',
                height: '70%',
                position: 'absolute',

                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                bottom: 0,
              }}>
              <TouchableOpacity
                style={{width: 25, height: 25, alignSelf: 'center'}}
                onPress={() =>
                  this.setState({
                    isFindCar: false,
                  })
                }>
                <View style={{width: 30, height: 2, backgroundColor: '#000'}} />
              </TouchableOpacity>

              <FlatList
                ListHeaderComponent={
                  <Text style={{textAlign: 'center'}}>{`تعداد کاربر ${
                    this.state.jsonMap.features.length
                  }`}</Text>
                }
                style={{width: '100%', height: '100%'}}
                data={this.state.jsonMap.features}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => this.renderItemForCar(item, index)}
              />
            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    color: '#FFFFFF',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageGps: {
    backgroundColor: '#3498db',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: 80,
    height: 50,
    marginBottom: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  imageLine: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: 80,
    height: 50,
    marginBottom: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  imageLayer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: 80,
    height: 50,
    marginBottom: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  home: {
    width: 80,
    height: 50,
    backgroundColor: '#2980b9',
  },
  right: {flex: 1, width: '50%', height: '100%'},
  left: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  map: {
    flex: 5,
  },
  text: {
    padding: 20,
  },
});

export default ShowMap;
