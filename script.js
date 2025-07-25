function updateJudul() {
  const mapel = document.getElementById("mapel").value;
  document.getElementById("output").innerHTML = `<h2>LEMBAR KERJA PESERTA DIDIK – ${mapel}</h2>`;
}

function generateSoal() {
  const mapel = document.getElementById("mapel").value;
  const materi = document.getElementById("materi").value;
  const jumlah = parseInt(document.getElementById("jumlahSoal").value);
  const jenis = document.getElementById("jenisSoal").value;
  const gambarUrl = document.getElementById("gambarUrl").value;

  let output = `<h2>LEMBAR KERJA PESERTA DIDIK – ${mapel}</h2>`;
  output += `<p><strong>Topik:</strong> ${materi}</p>`;
  output += `<p><strong>Jenis Soal:</strong> ${jenis}</p>`;
  if (gambarUrl) {
    output += `<img src="${gambarUrl}" alt="Stimulus Gambar" class="stimulus"/>`;
  }
  output += `<hr><ol>`;

  for (let i = 1; i <= jumlah; i++) {
    const soal = ambilSoalOtomatis(jenis, materi, i) || `${jenis} tentang ${materi} - soal ${i}`;
    output += `<li>${soal}</li>`;
  }

  output += `</ol>`;
  output += `<br><strong>Rubrik Penilaian (Skala 1-4):</strong><ul>
    <li>4 – Sangat Baik</li>
    <li>3 – Baik</li>
    <li>2 – Cukup</li>
    <li>1 – Perlu Bimbingan</li></ul>`;

  document.getElementById("output").innerHTML = output;
}

function ambilSoalOtomatis(jenis, materi, nomor) {
  if (window.bankSoal && bankSoal[jenis]) {
    const data = bankSoal[jenis];
    const idx = (nomor - 1) % data.length;
    return data[idx].replace("[materi]", materi);
  }
  return null;
}

function exportPDF() {
  const element = document.getElementById("output");
  html2pdf().from(element).save("Lembar_Kerja_GuruCipta.pdf");
}
