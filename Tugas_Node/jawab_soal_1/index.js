// Import library Axios
const axios = require('axios');

// Data yang akan dikirim dalam permintaan POST
const postData = {
  username: 'brian_rt',
  email: 'brianricardotamin@gmail.com',
  password: 'password'
};

// URL endpoint API untuk melakukan pendaftaran pengguna
const registrationAPI = 'https://api.example.com/register';

// Lakukan permintaan HTTP POST menggunakan Axios
axios.post(registrationAPI, postData)
  .then(response => {
    // Tanggapan berhasil diterima
    console.log('Pendaftaran berhasil:', response.data);
  })
  .catch(error => {
    // Tanggapan gagal atau ada kesalahan
    console.error('Gagal mendaftar:', error.message);
  });
