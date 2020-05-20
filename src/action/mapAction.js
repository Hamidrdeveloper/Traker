import Channel from '../channel/indext';

var channel = new Channel();
const getApiMarker = o => {
  var org = o;
  return channel.getMarker(org).then(data => {
    console.log('Start', 'getApiMarker' + data);
    return data;
  });
};
const getOrganization = (id) => {
  return channel.getOrganization(id).then(data => {
    return data;
  });
};
const getApiVehicleInfo = i => {
  return channel.getVehicleInfo(i).then(data => {
    return data;
  });
};
const getApiLine = i => {
  return channel.getLine(i).then(data => {
    return data;
  });
};
export default {getApiMarker, getOrganization, getApiVehicleInfo, getApiLine};
