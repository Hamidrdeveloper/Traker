import Channel from '../channel/indext';

var channel = new Channel();
const getApiLogin = (user, pass) => {
  return channel.getLogin(user, pass).then(data => {
    console.log('Start', 'getApiMarker' + data);
    return data;
  });
};
export default {getApiLogin};
