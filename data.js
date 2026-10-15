/* ==========================================================
   VERİ DOSYASI
   Her kayıt bir takson (grup veya tür). "parent" bir üst grubu
   gösterir; ağaç bu bağlantılardan kurulur.
   Not: Türkçe adlar taslaktır, ileride kaynaklardan doğrulanmalı.
   Crustacea bilerek ayrı bir grup olarak yok: parafiletiktir,
   Hexapoda onun içinden çıkmıştır (Pancrustacea).
   ========================================================== */

const TAXA = [
  /* ---------- Gruplar ---------- */
  { id: "arthropoda", latin: "Arthropoda", tr: "Eklembacaklılar", parent: null, rank: "şube", not: "Eklemli bacaklar, kitinli dış iskelet, gövdenin segmentli olması." },

  { id: "chelicerata", latin: "Chelicerata", tr: "Kelicerliler", parent: "arthropoda", rank: "altşube", not: "Antenleri yoktur; ağız önünde kelicerler bulunur." },
  { id: "xiphosura", latin: "Xiphosura", tr: "Atnalı yengeçleri", parent: "chelicerata", rank: "takım", not: "Deniz canlıları; atnalı biçimli kalkan." },
  { id: "arachnida", latin: "Arachnida", tr: "Örümceksiler", parent: "chelicerata", rank: "sınıf", not: "Yetişkinlerde 4 çift bacak, antenler yok." },
  { id: "araneae", latin: "Araneae", tr: "Örümcekler", parent: "arachnida", rank: "takım", not: "Ağ bezleri (iplik memeleri), ince bir sap ile bağlanan karın." },
  { id: "scorpiones", latin: "Scorpiones", tr: "Akrepler", parent: "arachnida", rank: "takım", not: "Pedipalpler kıskaç; kuyruk ucunda iğne." },
  { id: "acari", latin: "Acari", tr: "Akarlar ve keneler", parent: "arachnida", rank: "grup", not: "Baş-göğüs ile karın kaynaşmış, tek parça gövde görünümü." },

  { id: "mandibulata", latin: "Mandibulata", tr: "Çeneliler", parent: "arthropoda", rank: "altşube", not: "Mandibul (çene) ve antenler vardır." },
  { id: "myriapoda", latin: "Myriapoda", tr: "Çok ayaklılar", parent: "mandibulata", rank: "altşube", not: "Uzun, çok segmentli gövde; çok sayıda bacak." },
  { id: "chilopoda", latin: "Chilopoda", tr: "Çıyanlar", parent: "myriapoda", rank: "sınıf", not: "Her segmentte bir çift bacak; yırtıcı." },
  { id: "diplopoda", latin: "Diplopoda", tr: "Kırkayaklar", parent: "myriapoda", rank: "sınıf", not: "Çoğu segmentte iki çift bacak; otobur/çürükçül." },

  { id: "pancrustacea", latin: "Pancrustacea", tr: "Pankrustaseler", parent: "mandibulata", rank: "grup", not: "Kabuklular ve böcekleri birlikte içeren monofiletik grup." },
  { id: "malacostraca", latin: "Malacostraca", tr: "Yumuşakkabuklular", parent: "pancrustacea", rank: "sınıf", not: "Yengeç, karides, kara bitkisi gibi tanıdık kabuklular." },
  { id: "decapoda", latin: "Decapoda", tr: "Onbacaklılar", parent: "malacostraca", rank: "takım", not: "5 çift yürüme bacağı, ilki genelde kıskaç." },
  { id: "isopoda", latin: "Isopoda", tr: "Eşbacaklılar", parent: "malacostraca", rank: "takım", not: "Üstten basık gövde, 7 çift benzer bacak." },
  { id: "allotriocarida", latin: "Allotriocarida", tr: "Allotriokaridler", parent: "pancrustacea", rank: "grup", not: "Yaprak ayaklı kabuklular ve altıbacaklıları birleştirir." },
  { id: "branchiopoda", latin: "Branchiopoda", tr: "Solungaç ayaklılar", parent: "allotriocarida", rank: "sınıf", not: "Yaprak biçimli, solungaç görevli bacaklar." },

  { id: "hexapoda", latin: "Hexapoda", tr: "Altıbacaklılar", parent: "allotriocarida", rank: "altşube", not: "Gövde baş, göğüs, karın; 3 çift bacak." },
  { id: "insecta", latin: "Insecta", tr: "Böcekler", parent: "hexapoda", rank: "sınıf", not: "Ağız parçaları dışarıda, göğüste kanat taşıyan türler." },
  { id: "odonata", latin: "Odonata", tr: "Yusufçuklar", parent: "insecta", rank: "takım", not: "İki çift uzun kanat, dev gözler, suda yaşayan nimf." },
  { id: "polyneoptera", latin: "Polyneoptera", tr: "Polyneopterler", parent: "insecta", rank: "grup", not: "Çekirge, peygamberdevesi, hamamböceği gibi eksik başkalaşımlılar." },
  { id: "orthoptera", latin: "Orthoptera", tr: "Düzkanatlılar", parent: "polyneoptera", rank: "takım", not: "Zıplayıcı arka bacaklar, ön kanatlar deri gibi." },
  { id: "mantodea", latin: "Mantodea", tr: "Peygamberdeveleri", parent: "polyneoptera", rank: "takım", not: "Yakalayıcı ön bacaklar." },
  { id: "hemiptera", latin: "Hemiptera", tr: "Yarımkanatlılar", parent: "insecta", rank: "takım", not: "Emici-delici hortum (rostrum)." },
  { id: "holometabola", latin: "Holometabola", tr: "Tam başkalaşım geçirenler", parent: "insecta", rank: "grup", not: "Yumurta, larva, pupa, ergin evreleri." },
  { id: "hymenoptera", latin: "Hymenoptera", tr: "Zarkanatlılar", parent: "holometabola", rank: "takım", not: "İki çift zar gibi kanat, arka kanatlar kancayla bağlı." },
  { id: "coleoptera", latin: "Coleoptera", tr: "Kınkanatlılar", parent: "holometabola", rank: "takım", not: "Ön kanatlar sert kın (elitra) olmuş." },
  { id: "panorpida", latin: "Panorpida", tr: "Panorpidler", parent: "holometabola", rank: "grup", not: "Kelebekler ile sinekleri içeren dal." },
  { id: "lepidoptera", latin: "Lepidoptera", tr: "Pullukanatlılar", parent: "panorpida", rank: "takım", not: "Kanatlar pullarla kaplı, hortum yaygın." },
  { id: "diptera", latin: "Diptera", tr: "Çiftkanatlılar", parent: "panorpida", rank: "takım", not: "Tek çift kanat, arka kanatlar denge çomağına (halter) dönüşmüş." },
  { id: "culicidae", latin: "Culicidae", tr: "Sivrisinekgiller", parent: "diptera", rank: "familya", not: "Kanat damarlarında pullar, uzun hortum." },
  { id: "brachycera", latin: "Brachycera", tr: "Kısa antenli sinekler", parent: "diptera", rank: "alttakım", not: "Kısa, 3 segmentli antenler ve aristalı yapı." },
  { id: "muscidae", latin: "Muscidae", tr: "Evsineğigiller", parent: "brachycera", rank: "familya", not: "Orta büyüklükte, gri-siyah sinekler." },
  { id: "drosophilidae", latin: "Drosophilidae", tr: "Meyve sineğigiller", parent: "brachycera", rank: "familya", not: "Küçük, genelde sarımsı sinekler." },
  { id: "syrphidae", latin: "Syrphidae", tr: "Çiçeksineğigiller", parent: "brachycera", rank: "familya", not: "Arılara benzeyen, havada asılı kalan sinekler." },

  /* ---------- Türler ---------- */
  { id: "limulus_polyphemus", latin: "Limulus polyphemus", tr: "Atnalı yengeci", parent: "xiphosura", rank: "tür",
    tayin: ["Atnalı biçimli geniş kalkan ve uzun, sivri kuyruk (telson).", "Gözler kalkanın yanlarında iri; bir çift de ortada küçük."],
    ipucu: [["Davranış", "Kıyı sığlıklarında yumurtlar; kıyıya toplu çıkışlarıyla bilinir."], ["Fizyoloji", "Mavi kanı bakır içerir ve bakteri toksinlerine karşı pıhtılaşır."], ["Morfoloji", "Antenleri yoktur; ön gövde tek bir atnalı kalkanla örtülüdür."]] },

  { id: "latrodectus_tredecimguttatus", latin: "Latrodectus tredecimguttatus", tr: "Karadul", parent: "araneae", rank: "tür",
    tayin: ["Siyah karında genellikle kırmızı benekler (13 tane).", "Dişi, erkekten belirgin büyüktür."],
    ipucu: [["Davranış", "Yere yakın, düzensiz ve yapışkan bir ağ kurar."], ["Fizyoloji", "Zehri sinir sistemini etkileyen latrotoksin içerir."], ["Morfoloji", "Parlak siyah, yuvarlak karın üzerinde kırmızı benek dizisi."]] },

  { id: "androctonus_crassicauda", latin: "Androctonus crassicauda", tr: "Kalın kuyruklu akrep", parent: "scorpiones", rank: "tür",
    tayin: ["Kuyruk (metasoma) kalın, kıskaçlar buna oranla ince.", "Koyu kahve-siyaha yakın renk."],
    ipucu: [["Davranış", "Geceleri avlanır, gündüz taş altlarında saklanır."], ["Fizyoloji", "Kütikülü morötesi ışıkta floresan parlar."], ["Morfoloji", "Pedipalp kıskaçlarının kuyruğa göre belirgin ince olması."]] },

  { id: "ixodes_ricinus", latin: "Ixodes ricinus", tr: "Koyun kenesi", parent: "acari", rank: "tür",
    tayin: ["Sert kene: sırtta sert kalkan (scutum) var.", "Anal oluk, anüsün önünden geçer."],
    ipucu: [["Davranış", "Otların ucunda bekleyip geçen konağa tutunur."], ["Fizyoloji", "Kan emerek kat kat büyür; Lyme hastalığını taşıyabilir."], ["Morfoloji", "Anal oluğun anüsün önünde kıvrılması bu cinsin ayırt edici özelliğidir."]] },

  { id: "scolopendra_cingulata", latin: "Scolopendra cingulata", tr: "Çıyan", parent: "chilopoda", rank: "tür",
    tayin: ["21 çift bacak; baş turuncu-sarımsı, gövde zeytin-kahve.", "Her segmentte yalnızca bir çift bacak."],
    ipucu: [["Davranış", "Gece avcısıdır, böcek ve küçük omurgalıları yer."], ["Fizyoloji", "Zehir bezleri ön bacaklarda (forsipül)."], ["Morfoloji", "İlk segmentin bacakları zehirli kıskaca dönüşmüştür."]] },

  { id: "ommatoiulus_sabulosus", latin: "Ommatoiulus sabulosus", tr: "Çizgili kırkayak", parent: "diplopoda", rank: "tür",
    tayin: ["Silindirik gövde, siyah zeminde turuncu-kırmızı sırt çizgisi.", "Çoğu segmentte iki çift bacak."],
    ipucu: [["Davranış", "Tehlikede spiral şeklinde kıvrılır."], ["Fizyoloji", "Yanlardaki bezlerden kinon içeren savunma sıvısı salgılar."], ["Morfoloji", "Diplosegmentlerde çift bacak ve silindirik gövde."]] },

  { id: "astacus_leptodactylus", latin: "Astacus leptodactylus", tr: "Tatlısu kerevidi", parent: "decapoda", rank: "tür",
    tayin: ["İnce, uzun kıskaçlar (adı da buradan gelir).", "Tatlı sularda yaşar."],
    ipucu: [["Davranış", "Gece aktiftir, yarıklara ve oyuklara saklanır."], ["Fizyoloji", "Kerevit vebası etkeni Aphanomyces astaci'ye karşı çok duyarlıdır."], ["Morfoloji", "Dar parmaklı kıskaçlar ve gri-kahve renkli kabuk."]] },

  { id: "callinectes_sapidus", latin: "Callinectes sapidus", tr: "Mavi yengeç", parent: "decapoda", rank: "tür",
    tayin: ["Kabuğun iki yanında uzun diken.", "Son bacak çifti kürek biçimli."],
    ipucu: [["Davranış", "Güçlü yüzücüdür; Akdeniz'de istilacı olarak yayılmıştır."], ["Fizyoloji", "Dişiler çiftleşme sonrası tuzlu sulara göç eder."], ["Morfoloji", "Mavi kıskaçlar ve kürek biçiminde yüzme bacakları."]] },

  { id: "armadillidium_vulgare", latin: "Armadillidium vulgare", tr: "Tespih böceği", parent: "isopoda", rank: "tür",
    tayin: ["Tehlikede tam bir top haline kıvrılabilir.", "7 çift benzer yürüme bacağı."],
    ipucu: [["Davranış", "Nemli yerleri sever; çürüyen bitki artıklarıyla beslenir."], ["Fizyoloji", "Karada yaşayan kabuklulardandır; solunum organları nem ister."], ["Morfoloji", "Üstten basık, kubbeli gri gövde ve kıvrılabilme (konglobasyon)."]] },

  { id: "daphnia_pulex", latin: "Daphnia pulex", tr: "Su piresi", parent: "branchiopoda", rank: "tür",
    tayin: ["Saydam, iki kapaklı kabuk; mikroskopta kalp atışı görülür.", "İkinci antenler büyük ve dallı."],
    ipucu: [["Davranış", "Sıçrar gibi yüzer; yosunla beslenir."], ["Fizyoloji", "Uygun koşulda partenogenezle üreyebilir."], ["Morfoloji", "Büyük dallı ikinci antenler ve tek, iri bileşik göz."]] },

  { id: "anax_imperator", latin: "Anax imperator", tr: "İmparator yusufçuk", parent: "odonata", rank: "tür",
    tayin: ["Göğüs yeşil, erkekte karın mavi ve ortada siyah çizgi.", "Gözler sırtta birbirine değer."],
    ipucu: [["Davranış", "Uçarak avlanır, bölgesini devriye gezerek korur."], ["Fizyoloji", "Larvası (nimf) suda yaşar."], ["Morfoloji", "Çok iri boy ve gözlerin üstte birleşmesi."]] },

  { id: "locusta_migratoria", latin: "Locusta migratoria", tr: "Göçmen çekirge", parent: "orthoptera", rank: "tür",
    tayin: ["Pronotumda belirgin orta sırt (karina).", "Arka bacaklar zıplamaya uygun."],
    ipucu: [["Davranış", "Yoğunluk artınca sürü halinde göç eder."], ["Fizyoloji", "Yalnız ve sürü fazları arasında geçiş yapar; serotonin rol oynar."], ["Morfoloji", "Kalın arka uyluk ve pronotumdaki sırt çıkıntısı."]] },

  { id: "mantis_religiosa", latin: "Mantis religiosa", tr: "Peygamberdevesi", parent: "mantodea", rank: "tür",
    tayin: ["Ön bacaklar yakalayıcı; üçgen, hareketli baş.", "Ön koksanın iç yüzünde siyah halkalı beyaz leke."],
    ipucu: [["Davranış", "Pusuya yatıp avını ani hamleyle yakalar."], ["Fizyoloji", "Yumurtalarını köpüksü bir kese (ooteka) içinde bırakır."], ["Morfoloji", "Ön koksada siyah çevreli beyaz leke bu türü ayırt ettirir."]] },

  { id: "cicada_orni", latin: "Cicada orni", tr: "Ağustosböceği", parent: "hemiptera", rank: "tür",
    tayin: ["Geniş baş, üç basit göz, saydam kanatlar.", "Erkekler yüksek sesle öter."],
    ipucu: [["Davranış", "Yaz sıcağında ağaç gövdelerinde öter."], ["Fizyoloji", "Ses, karında timbal adlı zar organıyla üretilir."], ["Morfoloji", "Başın önünde bükülmüş emici hortum (rostrum)."]] },

  { id: "halyomorpha_halys", latin: "Halyomorpha halys", tr: "Kahverengi kokarca", parent: "hemiptera", rank: "tür",
    tayin: ["Kalkan biçimli, kahverengi-benekli gövde.", "Antenlerde ve karın kenarında açık-koyu bantlar."],
    ipucu: [["Davranış", "Kışı evlerde ve çatlaklarda geçirir; fındık gibi ürünlere zarar verir."], ["Fizyoloji", "Rahatsız edilince koku bezlerinden kötü kokulu madde salar."], ["Morfoloji", "Antenlerin son iki segmentinde beyaz bant."]] },

  { id: "apis_mellifera", latin: "Apis mellifera", tr: "Bal arısı", parent: "hymenoptera", rank: "tür",
    tayin: ["Arka bacakta polen sepeti (korbikula).", "Gövde tüylü, tüyler dallanmış."],
    ipucu: [["Davranış", "Sallanma dansıyla besin kaynağının yerini bildirir."], ["Fizyoloji", "İğnenin kancalı olması nedeniyle sokunca işçi ölür."], ["Morfoloji", "Tüylü gözler ve arka tibiada polen sepeti."]] },

  { id: "vespa_orientalis", latin: "Vespa orientalis", tr: "Doğu eşek arısı", parent: "hymenoptera", rank: "tür",
    tayin: ["Kestane-kahve gövde, karında sarı kuşak.", "Büyük, güçlü bir yaban arısı."],
    ipucu: [["Davranış", "Genellikle toprak altındaki boşluklara yuva yapar."], ["Fizyoloji", "Gündüz, sıcak saatlerde en aktiftir; sarı kuşaktaki pigmentin güneş ışığını enerjiye çevirdiği ileri sürülmüştür."], ["Morfoloji", "Kahverengi zeminde keskin sarı karın bandı."]] },

  { id: "coccinella_septempunctata", latin: "Coccinella septempunctata", tr: "Yedi noktalı uğurböceği", parent: "coleoptera", rank: "tür",
    tayin: ["Kırmızı elitra üzerinde 7 siyah nokta.", "Skutellum yakınında ortak bir nokta."],
    ipucu: [["Davranış", "Yaprak bitlerini yiyen yırtıcıdır."], ["Fizyoloji", "Tehdit halinde eklem sıvısı (refleks kanama) çıkarır, acıdır."], ["Morfoloji", "Üç çift siyah nokta ve ortak yedinci nokta."]] },

  { id: "lucanus_cervus", latin: "Lucanus cervus", tr: "Geyik böceği", parent: "coleoptera", rank: "tür",
    tayin: ["Erkekte iri, geyik boynuzu gibi mandibüller.", "Antenler dirsekli ve tarak biçimli uçlu."],
    ipucu: [["Davranış", "Erkekler mandibülleriyle birbiriyle güreşir."], ["Fizyoloji", "Larva yıllarca çürüyen ağaçta gelişir."], ["Morfoloji", "Çok büyük mandibül ve kestane-siyah elitra."]] },

  { id: "vanessa_cardui", latin: "Vanessa cardui", tr: "Dikenli kelebek", parent: "lepidoptera", rank: "tür",
    tayin: ["Turuncu zemin, ön kanat ucu siyah ve beyaz benekli.", "Kıtalar arası göç yapar."],
    ipucu: [["Davranış", "Binlerce kilometrelik göç yapar."], ["Fizyoloji", "Larvalar devedikeni gibi dikenli otlarla beslenir."], ["Morfoloji", "Ön kanat ucunda siyah alan ve beyaz benekler."]] },

  { id: "bombyx_mori", latin: "Bombyx mori", tr: "İpek böceği", parent: "lepidoptera", rank: "tür",
    tayin: ["Erginler soluk beyaz, tüylü; uçamaz.", "Larva koza örer."],
    ipucu: [["Davranış", "Evcilleştirilmiştir; larva dut yaprağı yer."], ["Fizyoloji", "İpek, larvanın salgı bezlerinden gelen fibroin lifidir."], ["Morfoloji", "Larvada beyaz gövde ve sırt kuyruğunda küçük boynuzcuk."]] },

  { id: "culex_pipiens", latin: "Culex pipiens", tr: "Ev sivrisineği", parent: "culicidae", rank: "tür",
    tayin: ["Kanatlarda pullu damarlar, uzun hortum.", "Larva suda, solunum sifonuyla asılı durur."],
    ipucu: [["Davranış", "Dişi yumurtalarını su yüzeyine sal biçiminde bırakır."], ["Fizyoloji", "Yalnız dişi kan emer."], ["Morfoloji", "Uzun delici hortum ve kanatta pullu damarlar."]] },

  { id: "musca_domestica", latin: "Musca domestica", tr: "Ev sineği", parent: "muscidae", rank: "tür",
    tayin: ["Göğüs üzerinde 4 koyu uzunlamasına şerit.", "Süngerimsi hortum ucu (labellum)."],
    ipucu: [["Davranış", "İnsan yerleşimlerinde bulunur; larvaları çürüyen organik maddede gelişir."], ["Fizyoloji", "Katı gıdaya sıvı kusup onu çözerek emer."], ["Morfoloji", "Torakste dört koyu şerit ve kırmızımsı gözler."]] },

  { id: "drosophila_melanogaster", latin: "Drosophila melanogaster", tr: "Meyve sineği", parent: "drosophilidae", rank: "tür",
    tayin: ["2-3 mm, sarımsı-kahve, gözler kırmızı.", "Olgun meyvede çok görülür."],
    ipucu: [["Davranış", "Fermente olan meyvelere gelir."], ["Fizyoloji", "Genetik araştırmaların en önemli model canlılarından biridir."], ["Morfoloji", "Kırmızı gözler ve karında koyu bantlar."]] },

  { id: "eristalis_tenax", latin: "Eristalis tenax", tr: "Çiçek sineği", parent: "syrphidae", rank: "tür",
    tayin: ["Bal arısına benzer ama yalnızca bir çift kanadı vardır.", "Kanatta sahte damar (vena spuria) bulunur."],
    ipucu: [["Davranış", "Çiçekler üzerinde havada asılı kalır."], ["Fizyoloji", "Larvası kirli suda yaşar ve uzun solunum tüpü taşır."], ["Morfoloji", "Tek çift kanat ve kanatta sahte damar."]] }
];
