
// Menambahkan event listener di tombol submit agar data baru akan diproses JS setelah user menekan tombol submit
document.getElementById('form-bmi').addEventListener('submit', function(event) {
  event.preventDefault();

  // Mengambil data-data dari form HTML menggunakan Id masing-masing input
  const weight = parseFloat(document.getElementById('input-bb').value);
  const height = parseFloat(document.getElementById('input-tb').value) / 100;
  const age = parseFloat(document.getElementById('input-usia').value)


  // Spesifik untuk gender, memproses input radio button dari HTML
  let gender = ''

  if (document.getElementById('selection-pria').checked) {
    gender = 'pria'
  }

  else if (document.getElementById('selection-wanita').checked) {
    gender = 'wanita'
  }

  // Melakukan perhitungan BMI menggunakan formula yang sudah ditentukan
  if (!isNaN(weight) && !isNaN(height) && height > 0 && age > 0 && gender != '') {
    const bmi = (weight / (height * height)).toFixed(1);
    if (bmi > 0 && bmi <= 100) {
      displayResult(bmi);
    } 
    else {
      alert('Masukkan tinggi dan berat badan yang valid!');
    }
  } else if (age < 0) {
    alert('Masukkan usia, tinggi dan berat badan yang valid!');
  } else if (gender == '') {
    alert('Pilih jenis kelamin anda!')
  }
  
  else {
    alert('Masukkan tinggi dan berat badan yang valid!');
  }
});

// Button reset yang akan mengkosongkan form dan juga menghilangkan result sebelumnya jika ada
document.querySelector('button[type="reset"]').addEventListener('click', function() {
  document.getElementById('result-container').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
function displayResult(bmi) {
  const resultContainer = document.getElementById('result-container');
  const bmiValueElement = document.getElementById('bmi-value');
  const resultLabelElement = document.querySelector('.resultLabel');
  const resultDescriptionElement = document.querySelector('.resultDescription');
  const detailedDescriptionElement = document.getElementById('result-detailed-description');

  let resultLabel = '';
  let resultDescription = '';
  let detailedDescription = '';

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

  bmiValueElement.textContent = bmi;
  resultLabelElement.textContent = resultLabel;
  resultDescriptionElement.textContent = resultDescription;
  detailedDescriptionElement.textContent = detailedDescription;

  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Menambahkan event listener ke semua input untuk mendeteksi jika ada perubahan di salah satu input
const inputs = document.querySelectorAll('#input-bb, #input-tb, #input-usia, #selection-pria, #selection-wanita');
inputs.forEach(input => {
  input.addEventListener('input', function() {
    document.getElementById('result-container').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});