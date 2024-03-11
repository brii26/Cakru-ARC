// Import library readline untuk membaca input dari terminal
const readline = require('readline');

// Buat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// List untuk menyimpan data
let data = [];

// Fungsi untuk menampilkan data
function displayData() {
  if (data.length === 0) {
    console.log("Data kosong.");
  } else {
    console.log("Data:");
    data.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
}

// Callback function untuk menangani input dari user
function userInput() {
  rl.question('Masukkan data baru atau ketik "tampilkan" untuk menampilkan data: ', async (answer) => {
    if (answer.toLowerCase() === 'tampilkan') {
      displayData();
    } else {
      data.push(answer);
      console.log(`Data "${answer}" berhasil ditambahkan.`);
    }
    userInput(); // Pemanggilan kembali fungsi userInput untuk terus mendengarkan input dari user
  });
}

// Fungsi utama yang menggunakan async/await untuk menjalankan fungsi userInput
async function main() {
  console.log("Program CLI Sederhana\n");
  await userInput();
}

// Panggil fungsi utama
main();
