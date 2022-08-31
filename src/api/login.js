import axios from 'axios';
import settings from '../settings/settings';

const baseURL = settings.getCurrentSettings();
// const baseURL = 'http://192.168.100.8/ApiReactNative/public';
const login = async (email, password) => {
  console.log('baaaaaaase url ', settings.getCurrentSettings());
  var data = JSON.stringify({
    email: email,
    password: password,
  });
  var config = {
    method: 'post',
    url: `${baseURL}/api/users/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const resultat = await axios(config);

    return resultat;
  } catch (error) {
    console.log('error fetching login', error);
  }
};

export default {
  login,
};
