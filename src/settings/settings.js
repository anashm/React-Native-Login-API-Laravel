const settings = {
  //10.0.2.2 is IP of my android emulator
  baseURL: 'http://10.0.2.2/ApiReactNative/public',
};

const getCurrentSettings = () => {
  return settings.baseURL;
};

export default {
  getCurrentSettings,
};
// export default getCurrentSettings();
