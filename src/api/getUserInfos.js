import axios from 'axios';
import settings from '../settings/settings';

// const baseURL = 'http://10.0.2.2/ApiReactNative/public';
const baseURL = settings.getCurrentSettings();

const getUserInfos = async userId => {
  var data = JSON.stringify({
    id: userId,
  });
  var config = {
    method: 'post',
    url: `${baseURL}/api/users/getUserInfos`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const resultat = await axios(config);

    return resultat;
  } catch (error) {
    console.log('error fetching user infos', error);
  }
};

export default {
  getUserInfos,
};
