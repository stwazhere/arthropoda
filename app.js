/* ==========================================================
   OYUN MANTIĞI
   Görünümle uğraşırken bu dosyaya dokunman gerekmez.
   ========================================================== */

/* ---------- 1. Ağaç yardımcıları ---------- */

// id'den takson kaydına hızlı erişim için sözlük
const byId = {};
TAXA.forEach(t => { byId[t.id] = t; });

// Sadece tür kayıtları (tahmin edilebilecekler)
const turler = TAXA.filter(t => t.rank === "tür");

// Bir taksonun soy çizgisi: [Arthropoda, ..., kendisi]
function soyCizgisi(id) {
  const yol = [];
  let su = byId[id];
  while (su) {
    yol.unshift(su);
    su = su.parent ? byId[su.parent] : null;
  }
  return yol;
}

// En yakın ortak ata (LCA): iki soy çizgisi nerede ayrılıyor?
function ortakAta(idA, idB) {
  const a = soyCizgisi(idA);
  const b = soyCizgisi(idB);
  let son = a[0];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i].id === b[i].id) son = a[i];
    else break;
  }
  return son;
}

/* ---------- 2. Oyun durumu ---------- */

let hedef;            // gizli tür
let acilanIpucu;      // kaç ipucu açıldı
let bitti;            // oyun bitti mi

/* ---------- 3. Sayfadaki öğeler ---------- */

const form = document.getElementById("tahmin-formu");
const girdi = document.getElementById("tahmin-girdisi");
const liste = document.getElementById("tur-listesi");
const mesaj = document.getElementById("mesaj");
const ipucuDugmesi = document.getElementById("ipucu-dugmesi");
const pesDugmesi = document.getElementById("pes-dugmesi");
const ipucuListesi = document.getElementById("ipuclari");
const tahminListesi = document.getElementById("tahminler");
const sonuc = document.getElementById("sonuc");

/* ---------- 4. Arama listesi ---------- */

function etiket(t) { return t.latin + " (" + t.tr + ")"; }

turler
  .slice()
  .sort((a, b) => a.latin.localeCompare(b.latin))
  .forEach(t => {
    const secenek = document.createElement("option");
    secenek.value = etiket(t);
    liste.appendChild(secenek);
  });

// Yazılan metinden türü bul (Latince, Türkçe veya "Latince (Türkçe)")
function turBul(metin) {
  const m = metin.trim().toLocaleLowerCase("tr");
  return turler.find(t =>
    etiket(t).toLocaleLowerCase("tr") === m ||
    t.latin.toLocaleLowerCase("tr") === m ||
    t.tr.toLocaleLowerCase("tr") === m
  );
}

/* ---------- 5. Oyunu başlat ---------- */

function yeniOyun() {
  hedef = turler[Math.floor(Math.random() * turler.length)];
  acilanIpucu = 0;
  bitti = false;
  tahminListesi.innerHTML = "";
  ipucuListesi.innerHTML = "";
  sonuc.hidden = true;
  mesaj.textContent = "";
  girdi.value = "";
  girdi.disabled = false;
  ipucuDugmesi.disabled = false;
  pesDugmesi.disabled = false;
  girdi.focus();
}

/* ---------- 6. Tahmin ---------- */

form.addEventListener("submit", function (olay) {
  olay.preventDefault();       // sayfanın yenilenmesini engelle
  if (bitti) return;

  const tahmin = turBul(girdi.value);
  if (!tahmin) {
    mesaj.textContent = "Listede olmayan bir ad. Yazarken çıkan önerilerden seçebilirsin.";
    return;
  }
  mesaj.textContent = "";

  const ata = ortakAta(tahmin.id, hedef.id);
  const dogruMu = tahmin.id === hedef.id;

  tahminKartiEkle(tahmin, ata, dogruMu);
  girdi.value = "";

  if (dogruMu) oyunuBitir(true);
});

function tahminKartiEkle(tahmin, ata, dogruMu) {
  const yol = soyCizgisi(ata.id)
    .map(t => "<li>" + t.latin + "</li>")
    .join("");

  const ortakYazi = dogruMu
    ? "<strong>Doğru tahmin.</strong>"
    : "Ortak ata: <strong>" + ata.latin + "</strong> (" + ata.tr + ", " + ata.rank + ")";

  const kart = document.createElement("li");
  kart.className = "tahmin" + (dogruMu ? " dogru" : "");
  kart.innerHTML =
    '<div class="tahmin-ad"><em>' + tahmin.latin + "</em><span>" + tahmin.tr + "</span></div>" +
    '<div class="ortak">' + ortakYazi + "</div>" +
    '<ol class="yol">' + yol + "</ol>";

  tahminListesi.prepend(kart);   // en yeni tahmin üstte
}

/* ---------- 7. İpucu ---------- */

ipucuDugmesi.addEventListener("click", function () {
  if (bitti) return;
  if (acilanIpucu >= hedef.ipucu.length) return;

  const [tur, metin] = hedef.ipucu[acilanIpucu];
  acilanIpucu++;

  const oge = document.createElement("li");
  oge.innerHTML = '<span class="tur">' + tur + "</span>" + metin;
  ipucuListesi.appendChild(oge);

  if (acilanIpucu >= hedef.ipucu.length) {
    ipucuDugmesi.disabled = true;
    ipucuDugmesi.textContent = "İpuçları bitti";
  } else {
    ipucuDugmesi.textContent = "İpucu al (" + acilanIpucu + "/" + hedef.ipucu.length + ")";
  }
});

pesDugmesi.addEventListener("click", function () {
  if (!bitti) oyunuBitir(false);
});

/* ---------- 8. Oyun sonu: tayin kartı ---------- */

function oyunuBitir(kazandi) {
  bitti = true;
  girdi.disabled = true;
  ipucuDugmesi.disabled = true;
  pesDugmesi.disabled = true;
  ipucuDugmesi.textContent = "İpucu al";

  const maddeler = hedef.tayin.map(m => "<li>" + m + "</li>").join("");
  const baslik = kazandi ? "Buldun." : "Gizli tür:";
  const soy = soyCizgisi(hedef.id).slice(0, -1).map(t => t.latin).join(" › ");

  sonuc.innerHTML =
    "<p>" + baslik + "</p>" +
    "<h2>" + hedef.latin + "</h2>" +
    '<p class="tr-ad">' + hedef.tr + "</p>" +
    "<h3>Nasıl ayırt edilir?</h3><ul>" + maddeler + "</ul>" +
    "<h3>Soy çizgisi</h3><p>" + soy + "</p>" +
    '<button id="yeni-oyun" type="button">Yeni oyun</button>';
  sonuc.hidden = false;

  document.getElementById("yeni-oyun").addEventListener("click", yeniOyun);
  sonuc.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

yeniOyun();
