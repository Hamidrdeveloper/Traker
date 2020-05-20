const address = {
  getMarker: org => {
    return `http://31.24.234.103:8080/o/municipalityGIS-portlet/getMunCars?x1=0&y1=0&x2=35731&y2=51315&orgs=${org}`;
  },
  getOriganization: (id) => {
    return `http://31.24.234.103:8080/o/municipalityGIS-portlet/getUserOrgs?userId=${id}`;
  },
  getVehicleInfo: imei => {
    return `http://31.24.234.103:8080/o/municipalityGIS-portlet/getVehicleInfo?imei=${imei}`;
  },
  getLine: imei => {
    return `http://31.24.234.103:8080/o/municipalityGIS-portlet/getCarPath?imei=${imei}`;
  },
  getLogin: imei => {
    return `http://31.24.234.103:8080/api/jsonws/user/get-current-user`;
  },
};
export default address;
