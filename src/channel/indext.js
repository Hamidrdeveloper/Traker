import address from './address';
import producer from './producer';
import Toast from 'react-native-simple-toast';

class Channel {
  getMarker(org) {
    var api = address.getMarker(org);
    console.log('getMarker', api);
    return fetch(api, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(responseJson => {
        console.log('====>', JSON.parse(responseJson));
        return responseJson;
      });
  }
  getOrganization(id) {
    console.log('res', 'ُSTART');

    //headers.append('Content-Type', 'text/json');
    const base64 = require('base-64');

    var api = address.getOriganization(id);
    return fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + base64.encode('Sadatsharif' + ':' + 'Qwedcxz123'),
      },
    })
      .then(response => response.text())
      .then(responseJson => {
        console.log('res', JSON.parse(responseJson));

        return JSON.parse(responseJson);
      });
  }
  getVehicleInfo(i) {
    console.log('res', 'ُSTART');

    //headers.append('Content-Type', 'text/json');
    const base64 = require('base-64');

    var api = address.getVehicleInfo(i);
    console.log('getVehicleInfo', api);
    return fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + base64.encode('Sadatsharif' + ':' + 'Qwedcxz123'),
      },
    })
      .then(response => response.text())
      .then(responseJson => {
        console.log('getVehicleInfo', JSON.parse(responseJson));

        return JSON.parse(responseJson);
      });
  }
  getLine(i) {
    console.log('getLine', 'ُSTART');

    //headers.append('Content-Type', 'text/json');
    const base64 = require('base-64');

    var api = address.getLine(i);
    console.log('getLine', api);
    return fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + base64.encode('Sadatsharif' + ':' + 'Qwedcxz123'),
      },
    })
      .then(response => response.text())
      .then(responseJson => {
        if (responseJson.length > 10) {
          console.log('getLine', responseJson);
          return JSON.parse(responseJson);
        } else {
          console.log('getLine', responseJson);
          return 'error';
        }
      })
      .catch(error => {
        return 'error';
      });
  }
  getLogin(user, pass) {
    console.log('getLine', 'ُSTART');
    //headers.append('Content-Type', 'text/json');
    const base64 = require('base-64');
    var api = address.getLogin();
    console.log('getLine', api);
    return fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode(user + ':' + pass),
      },
    })
      .then(response => response.text())
      .then(responseJson => {
        var data = 'null';
        if (responseJson != null) {
          data = JSON.parse(responseJson);
          if (data.companyId != null) {
            return data;
          } else {
            return 'null';
          }
        }
        return data;
      })
      .catch(err => {
        return 'err';
      });
  }
}
export default Channel;
