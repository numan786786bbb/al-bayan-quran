// This is a simplified mock of Quran data with just a few Surahs
// In a production app, you would use a complete Quran dataset

export interface Verse {
  number: number;
  arabic: string;
  translation: string;
  urduTranslation: string;
  pageNumber?: number;
  juzNumber?: number;
  sajda?: boolean;
  tafsir?: {
    short?: string;
    urdu?: string;
  };
  englishTransliteration?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  verses: Verse[];
}

export interface Parah {
  number: number;
  name: string;
  arabicName: string;
  versesRange: string;
  surahs: string[];
  verseCount: number;
  rukuCount: string;
}

export interface Verse {
  number: number;
  arabic: string;
  translation: string;
  urduTranslation: string;
  pageNumber?: number;
  juzNumber?: number;
  sajda?: boolean;
  tafsir?: {
    short?: string;
    urdu?: string;
  };
  englishTransliteration?: string;
}

// Define the 30 Parahs (Juz) of the Quran
export const PARAH_DATA: Parah[] = [
  {
    number: 1,
    name: "Alif Lām Mīm",
    arabicName: "الم",
    versesRange: "Al-Baqarah 1-141",
    surahs: ["Al-Baqarah 1-141"],
    verseCount: 141,
    rukuCount: "16"
  },
  {
    number: 2,
    name: "Sayaqūl",
    arabicName: "سیقول",
    versesRange: "Al-Baqarah 142-252",
    surahs: ["Al-Baqarah 142-252"],
    verseCount: 111,
    rukuCount: "17"
  },
  {
    number: 3,
    name: "Tilka 'r-Rusul",
    arabicName: "تلک الرسل",
    versesRange: "Al-Baqarah 253 - Al-Imran 92",
    surahs: ["Al-Baqarah 253-286", "Al-Imran 1-92"],
    verseCount: 126,
    rukuCount: "17"
  },
  {
    number: 4,
    name: "Lan Tana Lu",
    arabicName: "لن تنالوا",
    versesRange: "Al-Imran 93-200, An-Nisa 1-23",
    surahs: ["Al-Imran 93-200", "An-Nisa 1-23"],
    verseCount: 131,
    rukuCount: "14"
  },
  {
    number: 5,
    name: "Wal Muhsanat",
    arabicName: "والمحصنات",
    versesRange: "An-Nisa 24-147",
    surahs: ["An-Nisa 24-147"],
    verseCount: 124,
    rukuCount: "17"
  },
  {
    number: 6,
    name: "La Yuhibbu 'l-lah",
    arabicName: "لا یحب اللہ",
    versesRange: "An-Nisa 148-176, Al-Ma'idah 1-81",
    surahs: ["An-Nisa 148-176", "Al-Ma'idah 1-81"],
    verseCount: 110,
    rukuCount: "14"
  },
  {
    number: 7,
    name: "Wa Idha Sami'u",
    arabicName: "واذا سمعوا",
    versesRange: "Al-Ma'idah 82-120, Al-An'am 1-110",
    surahs: ["Al-Ma'idah 82-120", "Al-An'am 1-110"],
    verseCount: 149,
    rukuCount: "19"
  },
  {
    number: 8,
    name: "Wa Law Annana",
    arabicName: "ولو اننا",
    versesRange: "Al-An'am 111-165, Al-A'raf 1-87",
    surahs: ["Al-An'am 111-165", "Al-A'raf 1-87"],
    verseCount: 142,
    rukuCount: "17"
  },
  {
    number: 9,
    name: "Qal al-Mala'u",
    arabicName: "قال الملا",
    versesRange: "Al-A'raf 88-206, Al-Anfal 1-40",
    surahs: ["Al-A'raf 88-206", "Al-Anfal 1-40"],
    verseCount: 159,
    rukuCount: "19"
  },
  {
    number: 10,
    name: "Wa A'lamu",
    arabicName: "واعلموا",
    versesRange: "Al-Anfal 41-75, At-Tawbah 1-92",
    surahs: ["Al-Anfal 41-75", "At-Tawbah 1-92"],
    verseCount: 127,
    rukuCount: "19"
  },
  {
    number: 11,
    name: "Ya'tadhirūna",
    arabicName: "یعتذرون",
    versesRange: "At-Tawbah 93-129, Yunus 1-109, Hud 1-5",
    surahs: ["At-Tawbah 93-129", "Yunus 1-109", "Hud 1-5"],
    verseCount: 151,
    rukuCount: "19"
  },
  {
    number: 12,
    name: "Wa ma min Dabbah",
    arabicName: "وما من دابۃ",
    versesRange: "Hud 6-123, Yusuf 1-52",
    surahs: ["Hud 6-123", "Yusuf 1-52"],
    verseCount: 170,
    rukuCount: "17"
  },
  {
    number: 13,
    name: "Wa Ma Ubri'u",
    arabicName: "وما ابرئ",
    versesRange: "Yusuf 53-111, Ar-Ra'd 1-43, Ibrahim 1-52",
    surahs: ["Yusuf 53-111", "Ar-Ra'd 1-43", "Ibrahim 1-52"],
    verseCount: 154,
    rukuCount: "16"
  },
  {
    number: 14,
    name: "Rubama",
    arabicName: "ربما",
    versesRange: "Al-Hijr 1-99, An-Nahl 1-128",
    surahs: ["Al-Hijr 1-99", "An-Nahl 1-128"],
    verseCount: 227,
    rukuCount: "15"
  },
  {
    number: 15,
    name: "Subhana 'lladhi",
    arabicName: "سبحٰن الذی",
    versesRange: "Al-Isra 1-111, Al-Kahf 1-74",
    surahs: ["Al-Isra 1-111", "Al-Kahf 1-74"],
    verseCount: 185,
    rukuCount: "18"
  },
  {
    number: 16,
    name: "Qal 'Alam",
    arabicName: "قال الم",
    versesRange: "Al-Kahf 75-110, Maryam 1-98, Ta-Ha 1-135",
    surahs: ["Al-Kahf 75-110", "Maryam 1-98", "Ta-Ha 1-135"],
    verseCount: 269,
    rukuCount: "16"
  },
  {
    number: 17,
    name: "Iqtaraba li'n-Nas",
    arabicName: "اقترب للناس",
    versesRange: "Al-Anbiya 1-112, Al-Hajj 1-78",
    surahs: ["Al-Anbiya 1-112", "Al-Hajj 1-78"],
    verseCount: 190,
    rukuCount: "17"
  },
  {
    number: 18,
    name: "Qad Aflaha",
    arabicName: "قد افلح",
    versesRange: "Al-Mu'minun 1-118, An-Nur 1-64",
    surahs: ["Al-Mu'minun 1-118", "An-Nur 1-64"],
    verseCount: 182,
    rukuCount: "15"
  },
  {
    number: 19,
    name: "Wa Qal alladhina",
    arabicName: "وقال الذین",
    versesRange: "Al-Furqan 1-77, Ash-Shu'ara 1-227, An-Naml 1-55",
    surahs: ["Al-Furqan 1-77", "Ash-Shu'ara 1-227", "An-Naml 1-55"],
    verseCount: 359,
    rukuCount: "24"
  },
  {
    number: 20,
    name: "A'man Khalaqa",
    arabicName: "امن خلق",
    versesRange: "An-Naml 56-93, Al-Qasas 1-88, Al-Ankabut 1-45",
    surahs: ["An-Naml 56-93", "Al-Qasas 1-88", "Al-Ankabut 1-45"],
    verseCount: 171,
    rukuCount: "20"
  },
  {
    number: 21,
    name: "Utlu Ma Uhiya",
    arabicName: "اتل مااوحی",
    versesRange: "Al-Ankabut 46-69, Ar-Rum 1-60, Luqman 1-34, As-Sajdah 1-30",
    surahs: ["Al-Ankabut 46-69", "Ar-Rum 1-60", "Luqman 1-34", "As-Sajdah 1-30"],
    verseCount: 119,
    rukuCount: "18"
  },
  {
    number: 22,
    name: "Wa Man Yaqnut",
    arabicName: "ومن یقنت",
    versesRange: "Al-Ahzab 1-73, Saba 1-54, Fatir 1-45, Ya-Sin 1-27",
    surahs: ["Al-Ahzab 1-73", "Saba 1-54", "Fatir 1-45", "Ya-Sin 1-27"],
    verseCount: 199,
    rukuCount: "25"
  },
  {
    number: 23,
    name: "Wa Ma Liya",
    arabicName: "ومالی",
    versesRange: "Ya-Sin 28-83, As-Saffat 1-182, Sad 1-88, Az-Zumar 1-31",
    surahs: ["Ya-Sin 28-83", "As-Saffat 1-182", "Sad 1-88", "Az-Zumar 1-31"],
    verseCount: 357,
    rukuCount: "23"
  },
  {
    number: 24,
    name: "Fa Man Azlamu",
    arabicName: "فمن اظلم",
    versesRange: "Az-Zumar 32-75, Ghafir 1-85, Fussilat 1-46",
    surahs: ["Az-Zumar 32-75", "Ghafir 1-85", "Fussilat 1-46"],
    verseCount: 175,
    rukuCount: "20"
  },
  {
    number: 25,
    name: "Ilayhi Yuraddu",
    arabicName: "الیہ یرد",
    versesRange: "Fussilat 47-54, Ash-Shura 1-53, Az-Zukhruf 1-89, Ad-Dukhan 1-59, Al-Jathiyah 1-37",
    surahs: ["Fussilat 47-54", "Ash-Shura 1-53", "Az-Zukhruf 1-89", "Ad-Dukhan 1-59", "Al-Jathiyah 1-37"],
    verseCount: 246,
    rukuCount: "19"
  },
  {
    number: 26,
    name: "Ha Mim",
    arabicName: "حٰمٓ",
    versesRange: "Al-Ahqaf 1-35, Muhammad 1-38, Al-Fath 1-29, Al-Hujurat 1-18, Qaf 1-45, Adh-Dhariyat 1-30",
    surahs: ["Al-Ahqaf 1-35", "Muhammad 1-38", "Al-Fath 1-29", "Al-Hujurat 1-18", "Qaf 1-45", "Adh-Dhariyat 1-30"],
    verseCount: 195,
    rukuCount: "17"
  },
  {
    number: 27,
    name: "Qala Fama Khatbukum",
    arabicName: "قال فما خطبکم",
    versesRange: "Adh-Dhariyat 31-60, At-Tur 1-49, An-Najm 1-62, Al-Qamar 1-55, Ar-Rahman 1-78, Al-Waqi'ah 1-96, Al-Hadid 1-29",
    surahs: ["Adh-Dhariyat 31-60", "At-Tur 1-49", "An-Najm 1-62", "Al-Qamar 1-55", "Ar-Rahman 1-78", "Al-Waqi'ah 1-96", "Al-Hadid 1-29"],
    verseCount: 399,
    rukuCount: "26"
  },
  {
    number: 28,
    name: "Qad Sami Allahu",
    arabicName: "قد سمع اللہ",
    versesRange: "Al-Mujadilah 1-22, Al-Hashr 1-24, Al-Mumtahinah 1-13, As-Saff 1-14, Al-Jumu'ah 1-11, Al-Munafiqun 1-11, At-Taghabun 1-18, At-Talaq 1-12, At-Tahrim 1-12",
    surahs: ["Al-Mujadilah 1-22", "Al-Hashr 1-24", "Al-Mumtahinah 1-13", "As-Saff 1-14", "Al-Jumu'ah 1-11", "Al-Munafiqun 1-11", "At-Taghabun 1-18", "At-Talaq 1-12", "At-Tahrim 1-12"],
    verseCount: 137,
    rukuCount: "20"
  },
  {
    number: 29,
    name: "Tabaraka 'lladhi",
    arabicName: "تبٰرک الذی",
    versesRange: "Al-Mulk 1-30, Al-Qalam 1-52, Al-Haqqah 1-52, Al-Ma'arij 1-44, Nuh 1-28, Al-Jinn 1-28, Al-Muzzammil 1-20, Al-Muddathir 1-56, Al-Qiyamah 1-40, Al-Insan 1-31, Al-Mursalat 1-50",
    surahs: ["Al-Mulk 1-30", "Al-Qalam 1-52", "Al-Haqqah 1-52", "Al-Ma'arij 1-44", "Nuh 1-28", "Al-Jinn 1-28", "Al-Muzzammil 1-20", "Al-Muddathir 1-56", "Al-Qiyamah 1-40", "Al-Insan 1-31", "Al-Mursalat 1-50"],
    verseCount: 431,
    rukuCount: "30"
  },
  {
    number: 30,
    name: "Amma",
    arabicName: "عمَّ",
    versesRange: "An-Naba 1-40, An-Nazi'at 1-46, Abasa 1-42, At-Takwir 1-29, Al-Infitar 1-19, Al-Mutaffifin 1-36, Al-Inshiqaq 1-25, Al-Buruj 1-22, At-Tariq 1-17, Al-A'la 1-19, Al-Ghashiyah 1-26, Al-Fajr 1-30, Al-Balad 1-20, Ash-Shams 1-15, Al-Layl 1-21, Ad-Duha 1-11, Ash-Sharh 1-8, At-Tin 1-8, Al-Alaq 1-19, Al-Qadr 1-5, Al-Bayyinah 1-8, Az-Zalzalah 1-8, Al-Adiyat 1-11, Al-Qari'ah 1-11, At-Takathur 1-8, Al-Asr 1-3, Al-Humazah 1-9, Al-Fil 1-5, Quraysh 1-4, Al-Ma'un 1-7, Al-Kawthar 1-3, Al-Kafirun 1-6, An-Nasr 1-3, Al-Masad 1-5, Al-Ikhlas 1-4, Al-Falaq 1-5, An-Nas 1-6",
    surahs: ["An-Naba 1-40", "An-Nazi'at 1-46", "Abasa 1-42", "At-Takwir 1-29", "Al-Infitar 1-19", "Al-Mutaffifin 1-36", "Al-Inshiqaq 1-25", "Al-Buruj 1-22", "At-Tariq 1-17", "Al-A'la 1-19", "Al-Ghashiyah 1-26", "Al-Fajr 1-30", "Al-Balad 1-20", "Ash-Shams 1-15", "Al-Layl 1-21", "Ad-Duha 1-11", "Ash-Sharh 1-8", "At-Tin 1-8", "Al-Alaq 1-19", "Al-Qadr 1-5", "Al-Bayyinah 1-8", "Az-Zalzalah 1-8", "Al-Adiyat 1-11", "Al-Qari'ah 1-11", "At-Takathur 1-8", "Al-Asr 1-3", "Al-Humazah 1-9", "Al-Fil 1-5", "Quraysh 1-4", "Al-Ma'un 1-7", "Al-Kawthar 1-3", "Al-Kafirun 1-6", "An-Nasr 1-3", "Al-Masad 1-5", "Al-Ikhlas 1-4", "Al-Falaq 1-5", "An-Nas 1-6"],
    verseCount: 564,
    rukuCount: "37"
  }
];

const quranData: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    verses: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        urduTranslation: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے"
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of the worlds.",
        urduTranslation: "سب تعریف اللہ کے لیے ہے جو تمام جہانوں کا پالنے والا ہے"
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful,",
        urduTranslation: "بڑا مہربان نہایت رحم والا"
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        urduTranslation: "روزِ جزا کا مالک"
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        urduTranslation: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں"
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path -",
        urduTranslation: "ہمیں سیدھے راستے کی ہدایت فرما"
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        urduTranslation: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا"
      }
    ]
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "Sincerity",
    numberOfAyahs: 4,
    verses: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translation: "Say, \"He is Allah, [who is] One,\"",
        urduTranslation: "کہہ دیجیے کہ وہ اللہ ایک ہے"
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        translation: "Allah, the Eternal Refuge.",
        urduTranslation: "اللہ بےنیاز ہے"
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        translation: "He neither begets nor is born,",
        urduTranslation: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے"
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        translation: "Nor is there to Him any equivalent.\"",
        urduTranslation: "اور اس کے برابر کوئی نہیں"
      }
    ]
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    verses: [
      {
        number: 1,
        arabic: "الم",
        translation: "Alif, Lam, Meem."
      },
      {
        number: 2,
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah."
      },
      {
        number: 3,
        arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
        translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them."
      },
      {
        number: 4,
        arabic: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
        translation: "And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain."
      },
      {
        number: 5,
        arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
        translation: "Those are upon [right] guidance from their Lord, and it is those who are the successful."
      }
      // Note: Al-Baqarah has 286 verses, but we're only showing the first 5 for brevity
    ]
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "Sincerity",
    numberOfAyahs: 4,
    verses: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translation: "Say, \"He is Allah, [who is] One,"
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        translation: "Allah, the Eternal Refuge."
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        translation: "He neither begets nor is born,"
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        translation: "Nor is there to Him any equivalent.\""
      }
    ]
  }
];

export default quranData;