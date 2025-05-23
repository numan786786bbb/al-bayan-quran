export interface Surah {
  id: string;
  number: string;
  arabicName: string;
  englishName: string;
  rukuCount: string;
  verseCount: string;
  // To differentiate between Kaaba and Book icon
  revelationType: 'Meccan' | 'Medinan';
}

const surahListData: Surah[] = [
  {
    id: "surah1",
    number: "01",
    arabicName: "الْفَاتِحَة",
    englishName: "Al-Fatiha",
    rukuCount: "01",
    verseCount: "07",
    revelationType: "Meccan"
  },
  {
    id: "surah2",
    number: "02",
    arabicName: "الْبَقَرَة",
    englishName: "Al-Baqara",
    rukuCount: "40",
    verseCount: "286",
    revelationType: "Medinan"
  },
  {
    id: "surah3",
    number: "03",
    arabicName: "الِ عِمْرَان",
    englishName: "Ali 'Imran",
    rukuCount: "20",
    verseCount: "200",
    revelationType: "Medinan"
  },
  {
    id: "surah4",
    number: "04",
    arabicName: "النّساء",
    englishName: "An-Nisa",
    rukuCount: "24",
    verseCount: "176",
    revelationType: "Medinan"
  },
  {
    id: "surah5",
    number: "05",
    arabicName: "الْمَائِدَة",
    englishName: "Al-Ma'idah",
    rukuCount: "16",
    verseCount: "120",
    revelationType: "Medinan"
  },
  {
    id: "surah6",
    number: "06",
    arabicName: "الْأَنْعَام",
    englishName: "Al-An'am",
    rukuCount: "20",
    verseCount: "165",
    revelationType: "Meccan"
  },
  {
    id: "surah7",
    number: "07",
    arabicName: "الْأَعْرَاف",
    englishName: "Al-A'raf",
    rukuCount: "24",
    verseCount: "206",
    revelationType: "Meccan"
  },
  {
    id: "surah8",
    number: "08",
    arabicName: "الْأَنْفَال",
    englishName: "Al-Anfal",
    rukuCount: "10",
    verseCount: "75",
    revelationType: "Medinan"
  },
  {
    id: "surah9",
    number: "09",
    arabicName: "التَّوْبَة",
    englishName: "At-Tawbah",
    rukuCount: "16",
    verseCount: "129",
    revelationType: "Medinan"
  },
  {
    id: "surah10",
    number: "10",
    arabicName: "يُونُس",
    englishName: "Yunus",
    rukuCount: "11",
    verseCount: "109",
    revelationType: "Meccan"
  },
  {
    id: "surah11",
    number: "11",
    arabicName: "هُود",
    englishName: "Hud",
    rukuCount: "10",
    verseCount: "123",
    revelationType: "Meccan"
  },
  {
    id: "surah12",
    number: "12",
    arabicName: "يُوسُف",
    englishName: "Yusuf",
    rukuCount: "12",
    verseCount: "111",
    revelationType: "Meccan"
  },
  {
    id: "surah13",
    number: "13",
    arabicName: "الرَّعْد",
    englishName: "Ar-Ra'd",
    rukuCount: "06",
    verseCount: "43",
    revelationType: "Medinan"
  },
  {
    id: "surah14",
    number: "14",
    arabicName: "إِبْرَاهِيم",
    englishName: "Ibrahim",
    rukuCount: "07",
    verseCount: "52",
    revelationType: "Meccan"
  },
  {
    id: "surah15",
    number: "15",
    arabicName: "الْحِجْر",
    englishName: "Al-Hijr",
    rukuCount: "06",
    verseCount: "99",
    revelationType: "Meccan"
  },
  {
    id: "surah16",
    number: "16",
    arabicName: "النَّحْل",
    englishName: "An-Nahl",
    rukuCount: "16",
    verseCount: "128",
    revelationType: "Meccan"
  },
  {
    id: "surah17",
    number: "17",
    arabicName: "الْإِسْرَاء",
    englishName: "Al-Isra",
    rukuCount: "12",
    verseCount: "111",
    revelationType: "Meccan"
  },
  {
    id: "surah18",
    number: "18",
    arabicName: "الْكَهْف",
    englishName: "Al-Kahf",
    rukuCount: "12",
    verseCount: "110",
    revelationType: "Meccan"
  },
  {
    id: "surah19",
    number: "19",
    arabicName: "مَرْيَم",
    englishName: "Maryam",
    rukuCount: "06",
    verseCount: "98",
    revelationType: "Meccan"
  },
  {
    id: "surah20",
    number: "20",
    arabicName: "طٰهٰ",
    englishName: "Ta-Ha",
    rukuCount: "08",
    verseCount: "135",
    revelationType: "Meccan"
  },
  {
    id: "surah21",
    number: "21",
    arabicName: "الْأَنْبِيَاء",
    englishName: "Al-Anbiya",
    rukuCount: "07",
    verseCount: "112",
    revelationType: "Meccan"
  },
  {
    id: "surah22",
    number: "22",
    arabicName: "الْحَجّ",
    englishName: "Al-Hajj",
    rukuCount: "10",
    verseCount: "78",
    revelationType: "Medinan"
  },
  {
    id: "surah23",
    number: "23",
    arabicName: "الْمُؤْمِنُون",
    englishName: "Al-Mu'minun",
    rukuCount: "06",
    verseCount: "118",
    revelationType: "Meccan"
  },
  {
    id: "surah24",
    number: "24",
    arabicName: "النُّور",
    englishName: "An-Nur",
    rukuCount: "09",
    verseCount: "64",
    revelationType: "Medinan"
  },
  {
    id: "surah25",
    number: "25",
    arabicName: "الْفُرْقَان",
    englishName: "Al-Furqan",
    rukuCount: "06",
    verseCount: "77",
    revelationType: "Meccan"
  },
  {
    id: "surah26",
    number: "26",
    arabicName: "الشُّعَرَاء",
    englishName: "Ash-Shu'ara",
    rukuCount: "11",
    verseCount: "227",
    revelationType: "Meccan"
  },
  {
    id: "surah27",
    number: "27",
    arabicName: "النَّمْل",
    englishName: "An-Naml",
    rukuCount: "07",
    verseCount: "93",
    revelationType: "Meccan"
  },
  {
    id: "surah28",
    number: "28",
    arabicName: "الْقَصَص",
    englishName: "Al-Qasas",
    rukuCount: "09",
    verseCount: "88",
    revelationType: "Meccan"
  },
  {
    id: "surah29",
    number: "29",
    arabicName: "الْعَنْكَبُوت",
    englishName: "Al-Ankabut",
    rukuCount: "07",
    verseCount: "69",
    revelationType: "Meccan"
  },
  {
    id: "surah30",
    number: "30",
    arabicName: "الرُّوم",
    englishName: "Ar-Rum",
    rukuCount: "06",
    verseCount: "60",
    revelationType: "Meccan"
  },
  {
    id: "surah31",
    number: "31",
    arabicName: "لُقْمَان",
    englishName: "Luqman",
    rukuCount: "04",
    verseCount: "34",
    revelationType: "Meccan"
  },
  {
    id: "surah32",
    number: "32",
    arabicName: "السَّجْدَة",
    englishName: "As-Sajdah",
    rukuCount: "03",
    verseCount: "30",
    revelationType: "Meccan"
  },
  {
    id: "surah33",
    number: "33",
    arabicName: "الْأَحْزَاب",
    englishName: "Al-Ahzab",
    rukuCount: "09",
    verseCount: "73",
    revelationType: "Medinan"
  },
  {
    id: "surah34",
    number: "34",
    arabicName: "سَبَأ",
    englishName: "Saba",
    rukuCount: "06",
    verseCount: "54",
    revelationType: "Meccan"
  },
  {
    id: "surah35",
    number: "35",
    arabicName: "فَاطِر",
    englishName: "Fatir",
    rukuCount: "05",
    verseCount: "45",
    revelationType: "Meccan"
  },
  {
    id: "surah36",
    number: "36",
    arabicName: "يٰس",
    englishName: "Ya-Sin",
    rukuCount: "05",
    verseCount: "83",
    revelationType: "Meccan"
  },
  {
    id: "surah37",
    number: "37",
    arabicName: "الصَّافَّات",
    englishName: "As-Saffat",
    rukuCount: "05",
    verseCount: "182",
    revelationType: "Meccan"
  },
  {
    id: "surah38",
    number: "38",
    arabicName: "ص",
    englishName: "Sad",
    rukuCount: "05",
    verseCount: "88",
    revelationType: "Meccan"
  },
  {
    id: "surah39",
    number: "39",
    arabicName: "الزُّمَر",
    englishName: "Az-Zumar",
    rukuCount: "08",
    verseCount: "75",
    revelationType: "Meccan"
  },
  {
    id: "surah40",
    number: "40",
    arabicName: "غَافِر",
    englishName: "Ghafir",
    rukuCount: "09",
    verseCount: "85",
    revelationType: "Meccan"
  },
  {
    id: "surah41",
    number: "41",
    arabicName: "فُصِّلَت",
    englishName: "Fussilat",
    rukuCount: "06",
    verseCount: "54",
    revelationType: "Meccan"
  },
  {
    id: "surah42",
    number: "42",
    arabicName: "الشُّورىٰ",
    englishName: "Ash-Shura",
    rukuCount: "05",
    verseCount: "53",
    revelationType: "Meccan"
  },
  {
    id: "surah43",
    number: "43",
    arabicName: "الزُّخْرُف",
    englishName: "Az-Zukhruf",
    rukuCount: "07",
    verseCount: "89",
    revelationType: "Meccan"
  },
  {
    id: "surah44",
    number: "44",
    arabicName: "الدُّخَان",
    englishName: "Ad-Dukhan",
    rukuCount: "03",
    verseCount: "59",
    revelationType: "Meccan"
  },
  {
    id: "surah45",
    number: "45",
    arabicName: "الْجَاثِيَة",
    englishName: "Al-Jathiyah",
    rukuCount: "04",
    verseCount: "37",
    revelationType: "Meccan"
  },
  {
    id: "surah46",
    number: "46",
    arabicName: "الْأَحْقَاف",
    englishName: "Al-Ahqaf",
    rukuCount: "04",
    verseCount: "35",
    revelationType: "Meccan"
  },
  {
    id: "surah47",
    number: "47",
    arabicName: "مُحَمَّد",
    englishName: "Muhammad",
    rukuCount: "04",
    verseCount: "38",
    revelationType: "Medinan"
  },
  {
    id: "surah48",
    number: "48",
    arabicName: "الْفَتْح",
    englishName: "Al-Fath",
    rukuCount: "04",
    verseCount: "29",
    revelationType: "Medinan"
  },
  {
    id: "surah49",
    number: "49",
    arabicName: "الْحُجُرَات",
    englishName: "Al-Hujurat",
    rukuCount: "02",
    verseCount: "18",
    revelationType: "Medinan"
  },
  {
    id: "surah50",
    number: "50",
    arabicName: "ق",
    englishName: "Qaf",
    rukuCount: "03",
    verseCount: "45",
    revelationType: "Meccan"
  },
  {
    id: "surah51",
    number: "51",
    arabicName: "الذَّارِيَات",
    englishName: "Adh-Dhariyat",
    rukuCount: "03",
    verseCount: "60",
    revelationType: "Meccan"
  },
  {
    id: "surah52",
    number: "52",
    arabicName: "الطُّور",
    englishName: "At-Tur",
    rukuCount: "02",
    verseCount: "49",
    revelationType: "Meccan"
  },
  {
    id: "surah53",
    number: "53",
    arabicName: "النَّجْم",
    englishName: "An-Najm",
    rukuCount: "03",
    verseCount: "62",
    revelationType: "Meccan"
  },
  {
    id: "surah54",
    number: "54",
    arabicName: "الْقَمَر",
    englishName: "Al-Qamar",
    rukuCount: "03",
    verseCount: "55",
    revelationType: "Meccan"
  },
  {
    id: "surah55",
    number: "55",
    arabicName: "الرَّحْمَٰن",
    englishName: "Ar-Rahman",
    rukuCount: "03",
    verseCount: "78",
    revelationType: "Medinan"
  },
  {
    id: "surah56",
    number: "56",
    arabicName: "الْوَاقِعَة",
    englishName: "Al-Waqi'ah",
    rukuCount: "03",
    verseCount: "96",
    revelationType: "Meccan"
  },
  {
    id: "surah57",
    number: "57",
    arabicName: "الْحَدِيد",
    englishName: "Al-Hadid",
    rukuCount: "04",
    verseCount: "29",
    revelationType: "Medinan"
  },
  {
    id: "surah58",
    number: "58",
    arabicName: "الْمُجَادِلَة",
    englishName: "Al-Mujadilah",
    rukuCount: "03",
    verseCount: "22",
    revelationType: "Medinan"
  },
  {
    id: "surah59",
    number: "59",
    arabicName: "الْحَشْر",
    englishName: "Al-Hashr",
    rukuCount: "03",
    verseCount: "24",
    revelationType: "Medinan"
  },
  {
    id: "surah60",
    number: "60",
    arabicName: "الْمُمْتَحَنَة",
    englishName: "Al-Mumtahanah",
    rukuCount: "02",
    verseCount: "13",
    revelationType: "Medinan"
  },
  {
    id: "surah61",
    number: "61",
    arabicName: "الصَّفّ",
    englishName: "As-Saff",
    rukuCount: "02",
    verseCount: "14",
    revelationType: "Medinan"
  },
  {
    id: "surah62",
    number: "62",
    arabicName: "الْجُمُعَة",
    englishName: "Al-Jumu'ah",
    rukuCount: "02",
    verseCount: "11",
    revelationType: "Medinan"
  },
  {
    id: "surah63",
    number: "63",
    arabicName: "الْمُنَافِقُون",
    englishName: "Al-Munafiqun",
    rukuCount: "02",
    verseCount: "11",
    revelationType: "Medinan"
  },
  {
    id: "surah64",
    number: "64",
    arabicName: "التَّغَابُن",
    englishName: "At-Taghabun",
    rukuCount: "02",
    verseCount: "18",
    revelationType: "Medinan"
  },
  {
    id: "surah65",
    number: "65",
    arabicName: "الطَّلَاق",
    englishName: "At-Talaq",
    rukuCount: "02",
    verseCount: "12",
    revelationType: "Medinan"
  },
  {
    id: "surah66",
    number: "66",
    arabicName: "التَّحْرِيم",
    englishName: "At-Tahrim",
    rukuCount: "02",
    verseCount: "12",
    revelationType: "Medinan"
  },
  {
    id: "surah67",
    number: "67",
    arabicName: "الْمُلْك",
    englishName: "Al-Mulk",
    rukuCount: "02",
    verseCount: "30",
    revelationType: "Meccan"
  },
  {
    id: "surah68",
    number: "68",
    arabicName: "الْقَلَم",
    englishName: "Al-Qalam",
    rukuCount: "02",
    verseCount: "52",
    revelationType: "Meccan"
  },
  {
    id: "surah69",
    number: "69",
    arabicName: "الْحَاقَّة",
    englishName: "Al-Haqqah",
    rukuCount: "02",
    verseCount: "52",
    revelationType: "Meccan"
  },
  {
    id: "surah70",
    number: "70",
    arabicName: "الْمَعَارِج",
    englishName: "Al-Ma'arij",
    rukuCount: "02",
    verseCount: "44",
    revelationType: "Meccan"
  },
  {
    id: "surah71",
    number: "71",
    arabicName: "نُوح",
    englishName: "Nuh",
    rukuCount: "02",
    verseCount: "28",
    revelationType: "Meccan"
  },
  {
    id: "surah72",
    number: "72",
    arabicName: "الْجِنّ",
    englishName: "Al-Jinn",
    rukuCount: "02",
    verseCount: "28",
    revelationType: "Meccan"
  },
  {
    id: "surah73",
    number: "73",
    arabicName: "الْمُزَّمِّل",
    englishName: "Al-Muzzammil",
    rukuCount: "02",
    verseCount: "20",
    revelationType: "Meccan"
  },
  {
    id: "surah74",
    number: "74",
    arabicName: "الْمُدَّثِّر",
    englishName: "Al-Muddathir",
    rukuCount: "02",
    verseCount: "56",
    revelationType: "Meccan"
  },
  {
    id: "surah75",
    number: "75",
    arabicName: "الْقِيَامَة",
    englishName: "Al-Qiyamah",
    rukuCount: "02",
    verseCount: "40",
    revelationType: "Meccan"
  },
  {
    id: "surah76",
    number: "76",
    arabicName: "الْإِنْسَان",
    englishName: "Al-Insan",
    rukuCount: "02",
    verseCount: "31",
    revelationType: "Medinan"
  },
  {
    id: "surah77",
    number: "77",
    arabicName: "الْمُرْسَلَات",
    englishName: "Al-Mursalat",
    rukuCount: "02",
    verseCount: "50",
    revelationType: "Meccan"
  },
  {
    id: "surah78",
    number: "78",
    arabicName: "النَّبَأ",
    englishName: "An-Naba",
    rukuCount: "02",
    verseCount: "40",
    revelationType: "Meccan"
  },
  {
    id: "surah79",
    number: "79",
    arabicName: "النَّازِعَات",
    englishName: "An-Nazi'at",
    rukuCount: "02",
    verseCount: "46",
    revelationType: "Meccan"
  },
  {
    id: "surah80",
    number: "80",
    arabicName: "عَبَسَ",
    englishName: "Abasa",
    rukuCount: "01",
    verseCount: "42",
    revelationType: "Meccan"
  },
  {
    id: "surah81",
    number: "81",
    arabicName: "التَّكْوِير",
    englishName: "At-Takwir",
    rukuCount: "01",
    verseCount: "29",
    revelationType: "Meccan"
  },
  {
    id: "surah82",
    number: "82",
    arabicName: "الْإِنْفِطَار",
    englishName: "Al-Infitar",
    rukuCount: "01",
    verseCount: "19",
    revelationType: "Meccan"
  },
  {
    id: "surah83",
    number: "83",
    arabicName: "الْمُطَفِّفِين",
    englishName: "Al-Mutaffifin",
    rukuCount: "01",
    verseCount: "36",
    revelationType: "Meccan"
  },
  {
    id: "surah84",
    number: "84",
    arabicName: "الْإِنْشِقَاق",
    englishName: "Al-Inshiqaq",
    rukuCount: "01",
    verseCount: "25",
    revelationType: "Meccan"
  },
  {
    id: "surah85",
    number: "85",
    arabicName: "الْبُرُوج",
    englishName: "Al-Buruj",
    rukuCount: "01",
    verseCount: "22",
    revelationType: "Meccan"
  },
  {
    id: "surah86",
    number: "86",
    arabicName: "الطَّارِق",
    englishName: "At-Tariq",
    rukuCount: "01",
    verseCount: "17",
    revelationType: "Meccan"
  },
  {
    id: "surah87",
    number: "87",
    arabicName: "الْأَعْلَىٰ",
    englishName: "Al-A'la",
    rukuCount: "01",
    verseCount: "19",
    revelationType: "Meccan"
  },
  {
    id: "surah88",
    number: "88",
    arabicName: "الْغَاشِيَة",
    englishName: "Al-Ghashiyah",
    rukuCount: "01",
    verseCount: "26",
    revelationType: "Meccan"
  },
  {
    id: "surah89",
    number: "89",
    arabicName: "الْفَجْر",
    englishName: "Al-Fajr",
    rukuCount: "01",
    verseCount: "30",
    revelationType: "Meccan"
  },
  {
    id: "surah90",
    number: "90",
    arabicName: "الْبَلَد",
    englishName: "Al-Balad",
    rukuCount: "01",
    verseCount: "20",
    revelationType: "Meccan"
  },
  {
    id: "surah91",
    number: "91",
    arabicName: "الشَّمْس",
    englishName: "Ash-Shams",
    rukuCount: "01",
    verseCount: "15",
    revelationType: "Meccan"
  },
  {
    id: "surah92",
    number: "92",
    arabicName: "اللَّيْل",
    englishName: "Al-Layl",
    rukuCount: "01",
    verseCount: "21",
    revelationType: "Meccan"
  },
  {
    id: "surah93",
    number: "93",
    arabicName: "الضُّحَىٰ",
    englishName: "Ad-Duha",
    rukuCount: "01",
    verseCount: "11",
    revelationType: "Meccan"
  },
  {
    id: "surah94",
    number: "94",
    arabicName: "الشَّرْح",
    englishName: "Ash-Sharh",
    rukuCount: "01",
    verseCount: "08",
    revelationType: "Meccan"
  },
  {
    id: "surah95",
    number: "95",
    arabicName: "التِّين",
    englishName: "At-Tin",
    rukuCount: "01",
    verseCount: "08",
    revelationType: "Meccan"
  },
  {
    id: "surah96",
    number: "96",
    arabicName: "الْعَلَق",
    englishName: "Al-Alaq",
    rukuCount: "01",
    verseCount: "19",
    revelationType: "Meccan"
  },
  {
    id: "surah97",
    number: "97",
    arabicName: "الْقَدْر",
    englishName: "Al-Qadr",
    rukuCount: "01",
    verseCount: "05",
    revelationType: "Meccan"
  },
  {
    id: "surah98",
    number: "98",
    arabicName: "الْبَيِّنَة",
    englishName: "Al-Bayyinah",
    rukuCount: "01",
    verseCount: "08",
    revelationType: "Medinan"
  },
  {
    id: "surah99",
    number: "99",
    arabicName: "الزَّلْزَلَة",
    englishName: "Az-Zalzalah",
    rukuCount: "01",
    verseCount: "08",
    revelationType: "Medinan"
  },
  {
    id: "surah100",
    number: "100",
    arabicName: "الْعَادِيَات",
    englishName: "Al-Adiyat",
    rukuCount: "01",
    verseCount: "11",
    revelationType: "Meccan"
  },
  {
    id: "surah101",
    number: "101",
    arabicName: "الْقَارِعَة",
    englishName: "Al-Qari'ah",
    rukuCount: "01",
    verseCount: "11",
    revelationType: "Meccan"
  },
  {
    id: "surah102",
    number: "102",
    arabicName: "التَّكَاثُر",
    englishName: "At-Takathur",
    rukuCount: "01",
    verseCount: "08",
    revelationType: "Meccan"
  },
  {
    id: "surah103",
    number: "103",
    arabicName: "الْعَصْر",
    englishName: "Al-Asr",
    rukuCount: "01",
    verseCount: "03",
    revelationType: "Meccan"
  },
  {
    id: "surah104",
    number: "104",
    arabicName: "الْهُمَزَة",
    englishName: "Al-Humazah",
    rukuCount: "01",
    verseCount: "09",
    revelationType: "Meccan"
  },
  {
    id: "surah105",
    number: "105",
    arabicName: "الْفِيل",
    englishName: "Al-Fil",
    rukuCount: "01",
    verseCount: "05",
    revelationType: "Meccan"
  },
  {
    id: "surah106",
    number: "106",
    arabicName: "قُرَيْش",
    englishName: "Quraysh",
    rukuCount: "01",
    verseCount: "04",
    revelationType: "Meccan"
  },
  {
    id: "surah107",
    number: "107",
    arabicName: "الْمَاعُون",
    englishName: "Al-Ma'un",
    rukuCount: "01",
    verseCount: "07",
    revelationType: "Meccan"
  },
  {
    id: "surah108",
    number: "108",
    arabicName: "الْكَوْثَر",
    englishName: "Al-Kawthar",
    rukuCount: "01",
    verseCount: "03",
    revelationType: "Meccan"
  },
  {
    id: "surah109",
    number: "109",
    arabicName: "الْكَافِرُون",
    englishName: "Al-Kafirun",
    rukuCount: "01",
    verseCount: "06",
    revelationType: "Meccan"
  },
  {
    id: "surah110",
    number: "110",
    arabicName: "النَّصْر",
    englishName: "An-Nasr",
    rukuCount: "01",
    verseCount: "03",
    revelationType: "Medinan"
  },
  {
    id: "surah111",
    number: "111",
    arabicName: "الْمَسَد",
    englishName: "Al-Masad",
    rukuCount: "01",
    verseCount: "05",
    revelationType: "Meccan"
  },
  {
    id: "surah112",
    number: "112",
    arabicName: "الْإِخْلَاص",
    englishName: "Al-Ikhlas",
    rukuCount: "01",
    verseCount: "04",
    revelationType: "Meccan"
  },
  {
    id: "surah113",
    number: "113",
    arabicName: "الْفَلَق",
    englishName: "Al-Falaq",
    rukuCount: "01",
    verseCount: "05",
    revelationType: "Meccan"
  },
  {
    id: "surah114",
    number: "114",
    arabicName: "النَّاس",
    englishName: "An-Nas",
    rukuCount: "01",
    verseCount: "06",
    revelationType: "Meccan"
  }
];

export default surahListData;