// Menambahkan event listener di tombol submit agar data baru akan diproses JS setelah user menekan tombol submit
document.getElementById('form-bmi').addEventListener('submit', function(event) {
  event.preventDefault();

  // Mengambil data-data dari form HTML menggunakan Id masing-masing input
  const weight = parseFloat(document.getElementById('input-bb').value);
  const height = parseFloat(document.getElementById('input-tb').value) / 100;
  const age = parseFloat(document.getElementById('input-usia').value);
  console.log(`${weight} kg, ${height * 100} cm, ${age} Tahun`);

  // Spesifik untuk gender, memproses input radio button dari HTML
  let gender = '';

  if (document.getElementById('selection-pria').checked) {
    gender = 'Pria';
  } else if (document.getElementById('selection-wanita').checked) {
    gender = 'Wanita';
  }

  // Melakukan perhitungan BMI menggunakan formula yang sudah ditentukan
  if (!isNaN(weight) && !isNaN(height) && height > 0 && age > 0 && gender != '') {
    const bmi = (weight / (height * height)).toFixed(1);
    const ideal = `Berat badan ideal: ${Math.round((height * height) * 18.5) + 1} kg - ${Math.round((height * height) * 24.9) - 1} kg`;
    if (bmi > 0 && bmi <= 100) {
      displayResult(bmi, ideal, weight, height, age, gender);
    } else {
      alert('Masukkan tinggi dan berat badan yang valid!');
    }
  } else if (age < 0) {
    alert('Masukkan usia, tinggi dan berat badan yang valid!');
  } else if (gender == '') {
    alert('Pilih jenis kelamin anda!');
  } else {
    alert('Masukkan tinggi dan berat badan yang valid!');
  }
});

// Button reset yang akan mengkosongkan form dan juga menghilangkan result sebelumnya jika ada
document.querySelector('button[type="reset"]').addEventListener('click', function() {
  document.getElementById('result-container').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Mengaktifkan dan menampilkan tombol ganti bahasa kembali
  document.querySelector('.toggle-switch').style.display = 'flex';
});

// Back to top button (tombol yang jika dipencet akan membawa user ke top of page)
window.addEventListener('scroll', function() {
  const backToTopButton = document.getElementById('back-to-top');
  if (window.scrollY > 100) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Function scroll to top yang menjadi function yang di run saat button back to top di klik
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function untuk menampilkan hasil dari perhitungan BMI
function displayResult(bmi, ideal, weight, height, age, gender) {
  const resultContainer = document.getElementById('result-container');
  const bmiValueElement = document.getElementById('bmi-value');
  const resultLabelElement = document.querySelector('.resultLabel');
  const resultDescriptionElement = document.querySelector('.resultDescription');
  const detailedDescriptionElement = document.getElementById('result-detailed-description');
  const idealDescriptionElement = document.getElementById('result-ideal-bb');

  let resultLabel = '';
  let resultDescription = '';
  let detailedDescription = '';

  const language = document.documentElement.lang;
  
  if (language === 'id') {
    if (bmi < 18.5) {
      resultLabel = 'Kekurangan Berat Badan';
      resultDescription = 'Anda memiliki berat badan kurang.';
      detailedDescription = 'Anda berada dalam kategori kekurangan berat badan. Disarankan untuk meningkatkan asupan kalori dan menjalani pola makan sehat untuk mencapai berat badan yang normal.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      resultLabel = 'Normal (Sehat)';
      resultDescription = 'Anda memiliki berat badan normal (sehat).';
      detailedDescription = 'Anda berada dalam kategori berat badan normal. Pertahankan pola makan seimbang dan rutin berolahraga untuk menjaga kesehatan.';
    } else if (bmi >= 25 && bmi < 29.9) {
      resultLabel = 'Berat Badan Lebih';
      resultDescription = 'Anda memiliki berat badan berlebih.';
      detailedDescription = 'Anda berada dalam kategori berat badan berlebih. Disarankan untuk mengatur pola makan dan rutin berolahraga untuk menurunkan berat badan ke batas normal.';
    } else if (bmi >= 30) {
      resultLabel = 'Obesitas';
      resultDescription = 'Anda memiliki obesitas.';
      detailedDescription = 'Anda berada dalam kategori obesitas. Sangat disarankan untuk berkonsultasi dengan ahli gizi dan dokter untuk rencana penurunan berat badan yang sehat.';
    }
  } else {
    if (bmi < 18.5) {
      resultLabel = 'Underweight';
      resultDescription = 'You are underweight.';
      detailedDescription = 'You are in the underweight category. It is recommended to increase your calorie intake and follow a healthy diet to reach a normal weight.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      resultLabel = 'Normal (Healthy)';
      resultDescription = 'You have a normal (healthy) weight.';
      detailedDescription = 'You are in the normal weight category. Maintain a balanced diet and regular exercise to stay healthy.';
    } else if (bmi >= 25 && bmi < 29.9) {
      resultLabel = 'Overweight';
      resultDescription = 'You are overweight.';
      detailedDescription = 'You are in the overweight category. It is recommended to manage your diet and exercise regularly to reduce weight to a normal range.';
    } else if (bmi >= 30) {
      resultLabel = 'Obese';
      resultDescription = 'You have obesity.';
      detailedDescription = 'You are in the obesity category. It is highly recommended to consult with a nutritionist and doctor for a healthy weight loss plan.';
    }
  }

  bmiValueElement.textContent = bmi;
  resultLabelElement.textContent = resultLabel;
  resultDescriptionElement.textContent = resultDescription;
  detailedDescriptionElement.textContent = detailedDescription;
  idealDescriptionElement.textContent = ideal;

  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth' });

  // Attach download event
  document.querySelector('.downloadButton').addEventListener('click', function() {
    generatePDF(weight, height, age, gender, bmi, resultLabel);
  });

  // Sembunyikan tombol ganti bahasa
  document.querySelector('.toggle-switch').style.display = 'none';
}

// Function untuk menggenerate PDF dengan menggunakan jsPDF
function generatePDF(weight, height, age, gender, bmi, resultLabel) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Nama: Guest", 10, 10);
  doc.text(`Jenis Kelamin: ${gender}`, 10, 20);
  doc.text(`Tinggi Badan: ${height * 100} cm`, 10, 30);
  doc.text(`Berat Badan: ${weight} kg`, 10, 40);
  doc.text(`Usia: ${age} Tahun`, 10, 50);
  doc.text(`BMI: ${bmi}`, 10, 60);
  doc.text(`Kategori: ${resultLabel}`, 10, 70);

  doc.save("hasil_bmi.pdf");
}

// Menambahkan event listener ke tombol konsultasi untuk membuka link konsultasi
document.querySelector('.consultButton').addEventListener('click', function() {
  window.open('https://ilmugiziku.com/2021/11/30/berbagai-aplikasi-gizi-mahasiswa-gizi-wajib-tahu/', '_blank');
});

// Menambahkan event listener ke tombol registrasi untuk membuka link konsultasi online
document.querySelector('.registerButton').addEventListener('click', function() {
  window.open('https://www.halodoc.com/artikel/chat-dokter-spesialis-gizi-online-pengertian-dan-cara-kerjanya', '_blank');
});

// Menambahkan event listener ke semua input untuk mendeteksi jika ada perubahan di salah satu input
const inputs = document.querySelectorAll('#input-bb, #input-tb, #input-usia, #selection-pria, #selection-wanita');
inputs.forEach(input => {
  input.addEventListener('input', function() {
    document.getElementById('result-container').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mengaktifkan dan menampilkan tombol ganti bahasa kembali
    document.querySelector('.toggle-switch').style.display = 'flex';
  });
});

// Menambahkan event listener ke tombol ganti bahasa
document.getElementById('language-toggle').addEventListener('change', function() {
  const language = document.documentElement.lang;
  if (language === 'id') {
    document.documentElement.lang = 'en';
    document.title = 'BMI Calculator';
    document.querySelector('h1').textContent = 'BMI Calculator';
    document.querySelector('label[for="selection-pria"]').textContent = 'Male';
    document.querySelector('label[for="selection-wanita"]').textContent = 'Female';
    document.querySelector('label[for="input-bb"]').textContent = 'Weight (kg)';
    document.querySelector('label[for="input-tb"]').textContent = 'Height (cm)';
    document.querySelector('label[for="input-usia"]').textContent = 'Age';
    document.querySelector('button[type="submit"]').textContent = 'Calculate BMI';
    document.querySelector('button[type="reset"]').textContent = 'Reset';
    document.querySelector('.result h2').textContent = 'Results';
    document.querySelector('.downloadButton').textContent = 'Download BMI Result';
    document.querySelector('.consultButton').textContent = 'Consult a Nutrition Expert Via App';
    document.querySelector('.registerButton').textContent = 'Online Nutrition Expert Consultation';
    document.querySelector('.result p:last-child').textContent = 'BMI does not fully represent a comprehensive diagnosis of an individual\'s health and disease risk. Further consultation regarding your weight-related concerns is recommended.';
  } else {
    document.documentElement.lang = 'id';
    document.title = 'Kalkulator BMI';
    document.querySelector('h1').textContent = 'Kalkulator BMI';
    document.querySelector('label[for="selection-pria"]').textContent = 'Pria';
    document.querySelector('label[for="selection-wanita"]').textContent = 'Wanita';
    document.querySelector('label[for="input-bb"]').textContent = 'Berat Badan (kg)';
    document.querySelector('label[for="input-tb"]').textContent = 'Tinggi Badan (cm)';
    document.querySelector('label[for="input-usia"]').textContent = 'Usia';
    document.querySelector('button[type="submit"]').textContent = 'Hitung BMI';
    document.querySelector('button[type="reset"]').textContent = 'Reset';
    document.querySelector('.result h2').textContent = 'Hasil';
    document.querySelector('.downloadButton').textContent = 'Download Hasil BMI';
    document.querySelector('.consultButton').textContent = 'Konsultasi Ahli Gizi Via Aplikasi';
    document.querySelector('.registerButton').textContent = 'Konsultasi Ahli Gizi Online';
    document.querySelector('.result p:last-child').textContent = 'BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan resiko penyakit seseorang. Anda perlu konsultasi lebih lanjut mengenai resiko dan kekhawatiran Anda terkait dengan berat badan Anda.';
  }
  
  // Hilangkan hasil ketika tombol ganti bahasa diklik
  document.getElementById('result-container').style.display = 'none';
});
