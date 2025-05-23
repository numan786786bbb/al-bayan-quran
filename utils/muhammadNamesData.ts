export interface MuhammadName {
  id: string;
  number: number;
  arabic: string;
  transliteration: string;
  englishMeaning: string;
  urduMeaning: string;
  benefits?: string;
  reference?: string;
}

// Array of the beautiful names of Prophet Muhammad ﷺ
const muhammadNamesData: MuhammadName[] = [
  {
    id: "muhammadName1",
    number: 1,
    arabic: "مُحَمَّد",
    transliteration: "Muhammad",
    englishMeaning: "The Praised One",
    urduMeaning: "محمد (صلی اللہ علیہ وسلم)",
    benefits: "This blessed name appears in the Holy Quran. Reciting this name brings blessings and increases love for the Prophet (ﷺ).",
    reference: "Quran 3:144, 33:40, 47:2, 48:29"
  },
  {
    id: "muhammadName2",
    number: 2,
    arabic: "أَحْمَد",
    transliteration: "Ahmad",
    englishMeaning: "The Most Praiseworthy",
    urduMeaning: "احمد (صلی اللہ علیہ وسلم)",
    benefits: "This blessed name appears in the Holy Quran. Reciting this name increases love for the Prophet (ﷺ) and brings spiritual elevation.",
    reference: "Quran 61:6"
  },
  {
    id: "muhammadName3",
    number: 3,
    arabic: "الْمُصْطَفَى",
    transliteration: "Al-Mustafa",
    englishMeaning: "The Chosen One",
    urduMeaning: "المصطفیٰ (صلی اللہ علیہ وسلم)",
    benefits: "Reciting this name brings closeness to Allah and His Beloved Prophet (ﷺ).",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName4",
    number: 4,
    arabic: "الْمُخْتَار",
    transliteration: "Al-Mukhtar",
    englishMeaning: "The Selected One",
    urduMeaning: "المختار (صلی اللہ علیہ وسلم)",
    benefits: "Remembering this name reminds us that the Prophet (ﷺ) was selected by Allah above all creation.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName5",
    number: 5,
    arabic: "الْحَبِيب",
    transliteration: "Al-Habib",
    englishMeaning: "The Beloved",
    urduMeaning: "الحبیب (صلی اللہ علیہ وسلم)",
    benefits: "Reciting this name increases love for the Prophet (ﷺ) in one's heart.",
    reference: "Widely used in Islamic tradition"
  },
  {
    id: "muhammadName6",
    number: 6,
    arabic: "الرَّسُول",
    transliteration: "Ar-Rasul",
    englishMeaning: "The Messenger",
    urduMeaning: "الرسول (صلی اللہ علیہ وسلم)",
    benefits: "This name appears frequently in the Quran. Reciting it reminds us of the Prophet's (ﷺ) mission as Allah's messenger.",
    reference: "Throughout the Quran"
  },
  {
    id: "muhammadName7",
    number: 7,
    arabic: "النَّبِي",
    transliteration: "An-Nabi",
    englishMeaning: "The Prophet",
    urduMeaning: "النبی (صلی اللہ علیہ وسلم)",
    benefits: "This name appears frequently in the Quran. It reminds us of his prophethood and divine guidance.",
    reference: "Throughout the Quran"
  },
  {
    id: "muhammadName8",
    number: 8,
    arabic: "الْأُمِّي",
    transliteration: "Al-Ummi",
    englishMeaning: "The Unlettered",
    urduMeaning: "الامی (صلی اللہ علیہ وسلم)",
    benefits: "Reminding ourselves of this name increases our faith, as it highlights the miracle of the Quran coming from someone who did not read or write.",
    reference: "Quran 7:157-158"
  },
  {
    id: "muhammadName9",
    number: 9,
    arabic: "خَاتَم النَّبِيِّين",
    transliteration: "Khatam an-Nabiyyin",
    englishMeaning: "Seal of the Prophets",
    urduMeaning: "خاتم النبیین (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that Prophet Muhammad (ﷺ) is the final messenger of Allah.",
    reference: "Quran 33:40"
  },
  {
    id: "muhammadName10",
    number: 10,
    arabic: "حَبِيبُ اللَّه",
    transliteration: "Habibullah",
    englishMeaning: "The Beloved of Allah",
    urduMeaning: "حبیب اللہ (صلی اللہ علیہ وسلم)",
    benefits: "Remembering this name increases our love and respect for the Prophet (ﷺ).",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName11",
    number: 11,
    arabic: "سَيِّدُ الْمُرْسَلِين",
    transliteration: "Sayyid al-Mursalin",
    englishMeaning: "Master of the Messengers",
    urduMeaning: "سید المرسلین (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) high rank among all messengers of Allah.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName12",
    number: 12,
    arabic: "سَيِّدُ وَلَدِ آدَم",
    transliteration: "Sayyid Walad Adam",
    englishMeaning: "Master of the Children of Adam",
    urduMeaning: "سید ولد آدم (صلی اللہ علیہ وسلم)",
    benefits: "This name highlights the Prophet's (ﷺ) status as the best of mankind.",
    reference: "Hadith in Tirmidhi"
  },
  {
    id: "muhammadName13",
    number: 13,
    arabic: "رَحْمَةٌ لِلْعَالَمِين",
    transliteration: "Rahmatul-lil-Alamin",
    englishMeaning: "Mercy for all Worlds",
    urduMeaning: "رحمۃ للعالمین (صلی اللہ علیہ وسلم)",
    benefits: "Remembering this name reminds us of the Prophet's (ﷺ) mercy and compassion for all creation.",
    reference: "Quran 21:107"
  },
  {
    id: "muhammadName14",
    number: 14,
    arabic: "الشَّفِيع",
    transliteration: "Ash-Shafi'",
    englishMeaning: "The Intercessor",
    urduMeaning: "الشفیع (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) will intercede for believers on the Day of Judgment.",
    reference: "Numerous Hadith"
  },
  {
    id: "muhammadName15",
    number: 15,
    arabic: "صَاحِبُ الشَّفَاعَة",
    transliteration: "Sahib ash-Shafa'ah",
    englishMeaning: "Possessor of Intercession",
    urduMeaning: "صاحب الشفاعۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) intercession on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName16",
    number: 16,
    arabic: "صَاحِبُ الْمَقَامِ الْمَحْمُود",
    transliteration: "Sahib al-Maqam al-Mahmud",
    englishMeaning: "Possessor of the Praised Station",
    urduMeaning: "صاحب المقام المحمود (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the special station of praise that Allah will grant the Prophet (ﷺ) on the Day of Judgment.",
    reference: "Quran 17:79, Hadith Literature"
  },
  {
    id: "muhammadName17",
    number: 17,
    arabic: "صَاحِبُ الْوَسِيلَة",
    transliteration: "Sahib al-Wasilah",
    englishMeaning: "Possessor of the Means of Approach",
    urduMeaning: "صاحب الوسیلۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the highest station in Paradise that will be granted to the Prophet (ﷺ).",
    reference: "Hadith in Sahih Muslim"
  },
  {
    id: "muhammadName18",
    number: 18,
    arabic: "صَاحِبُ التَّاج",
    transliteration: "Sahib at-Taj",
    englishMeaning: "Possessor of the Crown",
    urduMeaning: "صاحب التاج (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the high honor bestowed upon the Prophet (ﷺ).",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName19",
    number: 19,
    arabic: "صَاحِبُ الْبُرَاق",
    transliteration: "Sahib al-Buraq",
    englishMeaning: "Possessor of the Buraq",
    urduMeaning: "صاحب البراق (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the miraculous night journey (Isra) and ascension (Miraj) of the Prophet (ﷺ).",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName20",
    number: 20,
    arabic: "الهَادِي",
    transliteration: "Al-Hadi",
    englishMeaning: "The Guide",
    urduMeaning: "الہادی (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) guides humanity to the straight path.",
    reference: "Quran and Hadith"
  },
  {
    id: "muhammadName21",
    number: 21,
    arabic: "الْبَشِير",
    transliteration: "Al-Bashir",
    englishMeaning: "The Bearer of Good News",
    urduMeaning: "البشیر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) brought glad tidings to the believers.",
    reference: "Quran 33:45"
  },
  {
    id: "muhammadName22",
    number: 22,
    arabic: "النَّذِير",
    transliteration: "An-Nadhir",
    englishMeaning: "The Warner",
    urduMeaning: "النذیر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) warned humanity of the consequences of disbelief.",
    reference: "Quran 33:45"
  },
  {
    id: "muhammadName23",
    number: 23,
    arabic: "الدَّاعِي إِلَى اللَّه",
    transliteration: "Ad-Da'i ila Allah",
    englishMeaning: "The Caller to Allah",
    urduMeaning: "الداعی الی اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) mission to invite people to worship Allah alone.",
    reference: "Quran 33:46"
  },
  {
    id: "muhammadName24",
    number: 24,
    arabic: "السِّرَاجُ الْمُنِير",
    transliteration: "As-Siraj al-Munir",
    englishMeaning: "The Illuminating Lamp",
    urduMeaning: "السراج المنیر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) illuminated the path to Allah with his guidance.",
    reference: "Quran 33:46"
  },
  {
    id: "muhammadName25",
    number: 25,
    arabic: "الشَّاهِد",
    transliteration: "Ash-Shahid",
    englishMeaning: "The Witness",
    urduMeaning: "الشاھد (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) will be a witness over his community on the Day of Judgment.",
    reference: "Quran 33:45"
  },
  {
    id: "muhammadName26",
    number: 26,
    arabic: "الْمُبَشِّر",
    transliteration: "Al-Mubashshir",
    englishMeaning: "The Giver of Good Tidings",
    urduMeaning: "المبشر (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the Prophet's (ﷺ) role in bringing glad tidings to the believers.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName27",
    number: 27,
    arabic: "الْمُنْذِر",
    transliteration: "Al-Mundhir",
    englishMeaning: "The Admonisher",
    urduMeaning: "المنذر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) role in warning about the consequences of disobedience.",
    reference: "Quran 13:7"
  },
  {
    id: "muhammadName28",
    number: 28,
    arabic: "نَبِيُّ الرَّحْمَة",
    transliteration: "Nabi ar-Rahmah",
    englishMeaning: "The Prophet of Mercy",
    urduMeaning: "نبی الرحمۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the merciful character of the Prophet (ﷺ) towards all creation.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName29",
    number: 29,
    arabic: "نَبِيُّ التَّوْبَة",
    transliteration: "Nabi at-Tawbah",
    englishMeaning: "The Prophet of Repentance",
    urduMeaning: "نبی التوبۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that through the Prophet (ﷺ), Allah opened the doors of repentance for humanity.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName30",
    number: 30,
    arabic: "الأَمِين",
    transliteration: "Al-Amin",
    englishMeaning: "The Trustworthy",
    urduMeaning: "الامین (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) trustworthiness, which was acknowledged even before his prophethood.",
    reference: "Sirah Literature"
  },
  {
    id: "muhammadName31",
    number: 31,
    arabic: "الصَّادِق",
    transliteration: "As-Sadiq",
    englishMeaning: "The Truthful",
    urduMeaning: "الصادق (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the Prophet's (ﷺ) unwavering truthfulness in all matters.",
    reference: "Sirah Literature"
  },
  {
    id: "muhammadName32",
    number: 32,
    arabic: "المَصْدُوق",
    transliteration: "Al-Masduq",
    englishMeaning: "The Verified Truthful One",
    urduMeaning: "المصدوق (صلی اللہ علیہ وسلم)",
    benefits: "This name highlights that the Prophet's (ﷺ) truthfulness was verified by Allah.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName33",
    number: 33,
    arabic: "حَبِيب الرَّحْمَن",
    transliteration: "Habib ar-Rahman",
    englishMeaning: "The Beloved of the Most Merciful",
    urduMeaning: "حبیب الرحمن (صلی اللہ علیہ وسلم)",
    benefits: "Remembering this name increases our love for the Prophet (ﷺ) as Allah's beloved.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName34",
    number: 34,
    arabic: "سَيِّد الْبَشَر",
    transliteration: "Sayyid al-Bashar",
    englishMeaning: "Master of Humanity",
    urduMeaning: "سید البشر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) status as the best of mankind.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName35",
    number: 35,
    arabic: "سَيِّد الْكَوْنَيْن",
    transliteration: "Sayyid al-Kawnayn",
    englishMeaning: "Master of the Two Worlds",
    urduMeaning: "سید الکونین (صلی اللہ علیہ وسلم)",
    benefits: "This name highlights the Prophet's (ﷺ) elevated status in both this world and the hereafter.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName36",
    number: 36,
    arabic: "سَيِّد وَلَد آدَم يَوْمَ الْقِيَامَة",
    transliteration: "Sayyid Walad Adam Yawm al-Qiyamah",
    englishMeaning: "Master of the Children of Adam on the Day of Resurrection",
    urduMeaning: "سید ولد آدم یوم القیامۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the Prophet's (ﷺ) leadership on the Day of Judgment.",
    reference: "Hadith in Tirmidhi"
  },
  {
    id: "muhammadName37",
    number: 37,
    arabic: "صَاحِب الْحَوْض",
    transliteration: "Sahib al-Hawd",
    englishMeaning: "Possessor of the Pool (of Kawthar)",
    urduMeaning: "صاحب الحوض (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the blessed pool that will quench the thirst of believers on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName38",
    number: 38,
    arabic: "صَاحِب اللِّوَاء",
    transliteration: "Sahib al-Liwa'",
    englishMeaning: "Possessor of the Banner",
    urduMeaning: "صاحب اللواء (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet's (ﷺ) role as the bearer of the banner of praise on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName39",
    number: 39,
    arabic: "صَاحِب الْمِعْرَاج",
    transliteration: "Sahib al-Mi'raj",
    englishMeaning: "Possessor of Ascension",
    urduMeaning: "صاحب المعراج (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the miraculous night journey and ascension of the Prophet (ﷺ) to the heavens.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName40",
    number: 40,
    arabic: "إِمَام الْمُتَّقِين",
    transliteration: "Imam al-Muttaqin",
    englishMeaning: "Leader of the God-conscious",
    urduMeaning: "امام المتقین (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us to follow the Prophet's (ﷺ) example in righteousness and God-consciousness.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName41",
    number: 41,
    arabic: "قَائِد الْغُرّ الْمُحَجَّلِين",
    transliteration: "Qa'id al-Ghurr al-Muhajjalin",
    englishMeaning: "Leader of the Radiant Ones",
    urduMeaning: "قائد الغر المحجلین (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet's (ﷺ) leadership of his community, who will be known by their radiant faces on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName42",
    number: 42,
    arabic: "حَبِيب الْخَلْق",
    transliteration: "Habib al-Khalq",
    englishMeaning: "Beloved of Creation",
    urduMeaning: "حبیب الخلق (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us to love the Prophet (ﷺ) as he is beloved to all creation.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName43",
    number: 43,
    arabic: "رَسُول الثَّقَلَيْن",
    transliteration: "Rasul ath-Thaqalayn",
    englishMeaning: "Messenger to Humans and Jinn",
    urduMeaning: "رسول الثقلین (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet's (ﷺ) message was sent to both humans and jinn.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName44",
    number: 44,
    arabic: "شَفِيع الْمُذْنِبِين",
    transliteration: "Shafi' al-Mudhnibin",
    englishMeaning: "Intercessor for the Sinners",
    urduMeaning: "شفیع المذنبین (صلی اللہ علیہ وسلم)",
    benefits: "This name gives hope to sinners that the Prophet (ﷺ) will intercede for them on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName45",
    number: 45,
    arabic: "مُحِيّ السُّنَّة",
    transliteration: "Muhyi as-Sunnah",
    englishMeaning: "Reviver of the Tradition",
    urduMeaning: "محی السنۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us to follow the Prophet's (ﷺ) Sunnah and revive it in our lives.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName46",
    number: 46,
    arabic: "مُبَيِّن الْحَلال مِنَ الْحَرَام",
    transliteration: "Mubayyin al-Halal min al-Haram",
    englishMeaning: "Clarifier of the Lawful from the Prohibited",
    urduMeaning: "مبین الحلال من الحرام (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) clarified what is permissible and what is prohibited in Islam.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName47",
    number: 47,
    arabic: "نَبِيّ الْمَلْحَمَة",
    transliteration: "Nabi al-Malhamah",
    englishMeaning: "Prophet of Decisive Battles",
    urduMeaning: "نبی الملحمۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet's (ﷺ) role in establishing justice through decisive actions.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName48",
    number: 48,
    arabic: "مَاحِي الْكُفْر",
    transliteration: "Mahi al-Kufr",
    englishMeaning: "Eraser of Disbelief",
    urduMeaning: "ماحی الکفر (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet's (ﷺ) message eradicates disbelief and establishes faith.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName49",
    number: 49,
    arabic: "الْحَاشِر",
    transliteration: "Al-Hashir",
    englishMeaning: "The Gatherer",
    urduMeaning: "الحاشر (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet (ﷺ) being the one after whom people will be gathered on the Day of Judgment.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName50",
    number: 50,
    arabic: "الْعَاقِب",
    transliteration: "Al-'Aqib",
    englishMeaning: "The Last (of the Prophets)",
    urduMeaning: "العاقب (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes that the Prophet (ﷺ) is the final messenger after whom there is no prophet.",
    reference: "Hadith in Sahih Muslim"
  },
  {
    id: "muhammadName51",
    number: 51,
    arabic: "المُقَفِّي",
    transliteration: "Al-Muqaffi",
    englishMeaning: "The Follower (of previous prophets)",
    urduMeaning: "المقفی (صلی اللہ علیہ وسلم)",
    benefits: "This name indicates that the Prophet (ﷺ) followed and completed the mission of previous prophets.",
    reference: "Hadith in Sahih Muslim"
  },
  {
    id: "muhammadName52",
    number: 52,
    arabic: "نَبِيّ الْمَرْحَمَة",
    transliteration: "Nabi al-Marhamah",
    englishMeaning: "Prophet of Compassion",
    urduMeaning: "نبی المرحمۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us of the Prophet's (ﷺ) compassionate nature towards all creation.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName53",
    number: 53,
    arabic: "نَبِيّ التَّوْبَة",
    transliteration: "Nabi at-Tawbah",
    englishMeaning: "Prophet of Repentance",
    urduMeaning: "نبی التوبۃ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that through the Prophet (ﷺ), Allah opened the doors of repentance for humanity.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName54",
    number: 54,
    arabic: "الْمُقْتَفَى",
    transliteration: "Al-Muqtafa",
    englishMeaning: "The One Who is Followed",
    urduMeaning: "المقتفی (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us to follow the Prophet's (ﷺ) example in all aspects of life.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName55",
    number: 55,
    arabic: "الْمُصْطَفَى الْمُخْتَار",
    transliteration: "Al-Mustafa Al-Mukhtar",
    englishMeaning: "The Chosen Selected One",
    urduMeaning: "المصطفی المختار (صلی اللہ علیہ وسلم)",
    benefits: "This combination of names emphasizes the Prophet's (ﷺ) status as Allah's chosen and selected messenger.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName56",
    number: 56,
    arabic: "الْمُتَوَكِّل",
    transliteration: "Al-Mutawakkil",
    englishMeaning: "The One who Trusts in Allah",
    urduMeaning: "المتوکل (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us to follow the Prophet's (ﷺ) example in placing complete trust in Allah.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName57",
    number: 57,
    arabic: "الْفَاتِح",
    transliteration: "Al-Fatih",
    englishMeaning: "The Opener",
    urduMeaning: "الفاتح (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet (ﷺ) opening the doors of guidance and mercy for humanity.",
    reference: "Hadith Literature"
  },
  {
    id: "muhammadName58",
    number: 58,
    arabic: "الْخَاتِم",
    transliteration: "Al-Khatim",
    englishMeaning: "The Final One",
    urduMeaning: "الخاتم (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes that the Prophet (ﷺ) is the final messenger of Allah.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName59",
    number: 59,
    arabic: "الْمَاحِي",
    transliteration: "Al-Mahi",
    englishMeaning: "The Eraser (of disbelief)",
    urduMeaning: "الماحی (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet's (ﷺ) role in erasing disbelief and establishing monotheism.",
    reference: "Hadith in Sahih Muslim"
  },
  {
    id: "muhammadName60",
    number: 60,
    arabic: "طه",
    transliteration: "Taha",
    englishMeaning: "A name given by Allah",
    urduMeaning: "طہ (صلی اللہ علیہ وسلم)",
    benefits: "This name appears in the Quran as a title of honor for the Prophet (ﷺ).",
    reference: "Quran 20:1"
  },
  {
    id: "muhammadName61",
    number: 61,
    arabic: "يس",
    transliteration: "Yasin",
    englishMeaning: "A name given by Allah",
    urduMeaning: "یس (صلی اللہ علیہ وسلم)",
    benefits: "This name appears in the Quran and is considered a reference to the Prophet (ﷺ).",
    reference: "Quran 36:1"
  },
  {
    id: "muhammadName62",
    number: 62,
    arabic: "الْمُزَّمِّل",
    transliteration: "Al-Muzzammil",
    englishMeaning: "The Wrapped One",
    urduMeaning: "المزمل (صلی اللہ علیہ وسلم)",
    benefits: "This name appears in the Quran, referring to the Prophet (ﷺ) when he was wrapped in a garment.",
    reference: "Quran 73:1"
  },
  {
    id: "muhammadName63",
    number: 63,
    arabic: "الْمُدَّثِّر",
    transliteration: "Al-Muddathir",
    englishMeaning: "The Covered One",
    urduMeaning: "المدثر (صلی اللہ علیہ وسلم)",
    benefits: "This name appears in the Quran, referring to the Prophet (ﷺ) when he covered himself with a cloak.",
    reference: "Quran 74:1"
  },
  {
    id: "muhammadName64",
    number: 64,
    arabic: "عَبْد اللَّه",
    transliteration: "Abdullah",
    englishMeaning: "Servant of Allah",
    urduMeaning: "عبد اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name reminds us that the Prophet (ﷺ) was first and foremost a devoted servant of Allah.",
    reference: "Quran 72:19"
  },
  {
    id: "muhammadName65",
    number: 65,
    arabic: "حَبِيب اللَّه",
    transliteration: "Habibullah",
    englishMeaning: "Beloved of Allah",
    urduMeaning: "حبیب اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the love Allah has for His Prophet (ﷺ).",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName66",
    number: 66,
    arabic: "صَفِيّ اللَّه",
    transliteration: "Safiyullah",
    englishMeaning: "Chosen One of Allah",
    urduMeaning: "صفی اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name highlights the Prophet's (ﷺ) status as Allah's chosen one.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName67",
    number: 67,
    arabic: "كَلِيم اللَّه",
    transliteration: "Kalimullah",
    englishMeaning: "One who Converses with Allah",
    urduMeaning: "کلیم اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the Prophet's (ﷺ) conversation with Allah during the Mi'raj.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName68",
    number: 68,
    arabic: "نَجِيّ اللَّه",
    transliteration: "Najiyullah",
    englishMeaning: "Confidant of Allah",
    urduMeaning: "نجی اللہ (صلی اللہ علیہ وسلم)",
    benefits: "This name refers to the special relationship between the Prophet (ﷺ) and Allah.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName69",
    number: 69,
    arabic: "خَليل الرَّحْمَن",
    transliteration: "Khalil ar-Rahman",
    englishMeaning: "Friend of the Most Merciful",
    urduMeaning: "خلیل الرحمن (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the close relationship between the Prophet (ﷺ) and Allah.",
    reference: "Islamic Tradition"
  },
  {
    id: "muhammadName70",
    number: 70,
    arabic: "سَيِّد وَلَد آدَم",
    transliteration: "Sayyid Walad Adam",
    englishMeaning: "Master of the Children of Adam",
    urduMeaning: "سید ولد آدم (صلی اللہ علیہ وسلم)",
    benefits: "This name emphasizes the Prophet's (ﷺ) status as the best of mankind.",
    reference: "Hadith in Tirmidhi"
  }
];

export default muhammadNamesData;