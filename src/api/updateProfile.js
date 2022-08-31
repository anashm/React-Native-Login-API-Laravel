import axios from 'axios';

// const baseURL = 'http://10.0.2.2/ApiReactNative/public';
// const baseURL = 'http://192.168.100.8/ApiReactNative/public';
const updateProfile = async (
  userId,
  email,
  civiliteInput,
  nom,
  prenom,
  ville,
  adresse,
  photo,
) => {
  let filename = photo.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  let formData = new FormData();

  formData.append('photo', {
    uri: photo,
    name: filename,
    type: type,
  });
  formData.append('id', userId);
  formData.append('nom', nom);
  formData.append('prenom', prenom);
  formData.append('email', email);
  formData.append('civilite', civiliteInput);
  formData.append('ville', ville);
  formData.append('adresse', adresse);

  const res = await fetch(
    'http://192.168.100.8/ApiReactNative/public/api/users/updateProfile',
    {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  );

  let responseJson = await res.json();
  return responseJson;
  // var data = JSON.stringify({
  //   id: userId,
  //   email: email,
  //   ville: ville,
  //   adresse: adresse,
  //   nom: nom,
  //   prenom: prenom,
  //   civilite: civiliteInput,
  // });
  // var config = {
  //   method: 'post',
  //   url: `${baseURL}/api/users/updateProfile`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: data,
  // };

  // try {
  //   const resultat = await axios(config);

  //   return resultat;
  // } catch (error) {
  //   console.log('error update user infos', error);
  // }
};

export default {
  updateProfile,
};
