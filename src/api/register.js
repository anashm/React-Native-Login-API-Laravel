const register = async (
  nom,
  prenom,
  email,
  photo,
  civilite,
  password,
  ville,
  adresse,
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

  formData.append('nom', nom);
  formData.append('prenom', prenom);
  formData.append('email', email);
  formData.append('civilite', civilite ? civilite : 'Homme');
  formData.append('password', password);
  formData.append('ville', ville);
  formData.append('adresse', adresse);

  const res = await fetch(
    'http://192.168.100.8/ApiReactNative/public/api/users/register',
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
};

export default {
  register,
};
