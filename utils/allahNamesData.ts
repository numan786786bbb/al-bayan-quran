export interface AllahName {
  id: string;
  number: number;
  arabic: string;
  transliteration: string;
  englishMeaning: string;
  urduMeaning: string;
  benefits?: string;
}

// Array of the 99 Names of Allah
const allahNamesData: AllahName[] = [
  {
    id: "allahName1",
    number: 1,
    arabic: "ٱللَّٰهُ",
    transliteration: "Allah",
    englishMeaning: "The God (The Greatest Name)",
    urduMeaning: "اللہ (سب سے بڑا نام)",
    benefits: "Mentioning this greatest name with sincerity brings one closer to Allah's mercy and blessing."
  },
  {
    id: "allahName2",
    number: 2,
    arabic: "ٱلرَّحْمَٰنُ",
    transliteration: "Ar-Rahman",
    englishMeaning: "The Most Compassionate",
    urduMeaning: "الرحمن (نہایت مہربان)",
    benefits: "Reciting this name brings mercy in difficult situations and soothes the heart."
  },
  {
    id: "allahName3",
    number: 3,
    arabic: "ٱلرَّحِيمُ",
    transliteration: "Ar-Rahim",
    englishMeaning: "The Most Merciful",
    urduMeaning: "الرحیم (بڑا رحم کرنے والا)",
    benefits: "Mentioning this name consistently leads to mercy in this world and the hereafter."
  },
  {
    id: "allahName4",
    number: 4,
    arabic: "ٱلْمَلِكُ",
    transliteration: "Al-Malik",
    englishMeaning: "The King, The Sovereign",
    urduMeaning: "الملک (بادشاہ)",
    benefits: "Reciting this name brings dignity and helps in leadership roles."
  },
  {
    id: "allahName5",
    number: 5,
    arabic: "ٱلْقُدُّوسُ",
    transliteration: "Al-Quddus",
    englishMeaning: "The Holy, The Pure",
    urduMeaning: "القدوس (پاک ذات)",
    benefits: "This name purifies the heart and soul from spiritual ailments."
  },
  {
    id: "allahName6",
    number: 6,
    arabic: "ٱلسَّلَامُ",
    transliteration: "As-Salam",
    englishMeaning: "The Source of Peace",
    urduMeaning: "السلام (سلامتی عطا کرنے والا)",
    benefits: "Reciting this name brings peace and tranquility to one's life."
  },
  {
    id: "allahName7",
    number: 7,
    arabic: "ٱلْمُؤْمِنُ",
    transliteration: "Al-Mu'min",
    englishMeaning: "The Guardian of Faith",
    urduMeaning: "المؤمن (امن دینے والا)",
    benefits: "This name strengthens faith and provides security from fears."
  },
  {
    id: "allahName8",
    number: 8,
    arabic: "ٱلْمُهَيْمِنُ",
    transliteration: "Al-Muhaymin",
    englishMeaning: "The Protector",
    urduMeaning: "المہیمن (نگہبان)",
    benefits: "Recitation brings divine protection in times of danger."
  },
  {
    id: "allahName9",
    number: 9,
    arabic: "ٱلْعَزِيزُ",
    transliteration: "Al-Aziz",
    englishMeaning: "The Mighty",
    urduMeaning: "العزیز (غالب)",
    benefits: "This name grants strength, honor and victory in difficult times."
  },
  {
    id: "allahName10",
    number: 10,
    arabic: "ٱلْجَبَّارُ",
    transliteration: "Al-Jabbar",
    englishMeaning: "The Compeller",
    urduMeaning: "الجبار (زبردست)",
    benefits: "Reciting this name helps in healing broken hearts and restoring balance."
  },
  {
    id: "allahName11",
    number: 11,
    arabic: "ٱلْمُتَكَبِّرُ",
    transliteration: "Al-Mutakabbir",
    englishMeaning: "The Greatest",
    urduMeaning: "المتکبر (بڑائی والا)",
    benefits: "This name protects from arrogance and instills humility."
  },
  {
    id: "allahName12",
    number: 12,
    arabic: "ٱلْخَالِقُ",
    transliteration: "Al-Khaliq",
    englishMeaning: "The Creator",
    urduMeaning: "الخالق (پیدا کرنے والا)",
    benefits: "Reciting this name helps in creative endeavors and planning."
  },
  {
    id: "allahName13",
    number: 13,
    arabic: "ٱلْبَارِئُ",
    transliteration: "Al-Bari'",
    englishMeaning: "The Maker",
    urduMeaning: "الباری (بنانے والا)",
    benefits: "This name brings harmony and proper execution to one's plans."
  },
  {
    id: "allahName14",
    number: 14,
    arabic: "ٱلْمُصَوِّرُ",
    transliteration: "Al-Musawwir",
    englishMeaning: "The Fashioner",
    urduMeaning: "المصور (صورتیں بنانے والا)",
    benefits: "Recitation aids in aesthetic matters and gives inner beauty."
  },
  {
    id: "allahName15",
    number: 15,
    arabic: "ٱلْغَفَّارُ",
    transliteration: "Al-Ghaffar",
    englishMeaning: "The All-Forgiving",
    urduMeaning: "الغفار (بخشنے والا)",
    benefits: "This name brings forgiveness for sins and relief from guilt."
  },
  {
    id: "allahName16",
    number: 16,
    arabic: "ٱلْقَهَّارُ",
    transliteration: "Al-Qahhar",
    englishMeaning: "The Subduer",
    urduMeaning: "القہار (قابو پانے والا)",
    benefits: "Recitation helps overcome enemies and obstacles."
  },
  {
    id: "allahName17",
    number: 17,
    arabic: "ٱلْوَهَّابُ",
    transliteration: "Al-Wahhab",
    englishMeaning: "The Bestower",
    urduMeaning: "الوہاب (عطا کرنے والا)",
    benefits: "This name attracts gifts and unexpected blessings."
  },
  {
    id: "allahName18",
    number: 18,
    arabic: "ٱلرَّزَّاقُ",
    transliteration: "Ar-Razzaq",
    englishMeaning: "The Provider",
    urduMeaning: "الرزاق (رزق دینے والا)",
    benefits: "Recitation brings sustenance and provision from unexpected sources."
  },
  {
    id: "allahName19",
    number: 19,
    arabic: "ٱلْفَتَّاحُ",
    transliteration: "Al-Fattah",
    englishMeaning: "The Opener",
    urduMeaning: "الفتاح (کھولنے والا)",
    benefits: "This name opens doors of opportunity and solutions to problems."
  },
  {
    id: "allahName20",
    number: 20,
    arabic: "ٱلْعَلِيمُ",
    transliteration: "Al-'Alim",
    englishMeaning: "The All-Knowing",
    urduMeaning: "العلیم (جاننے والا)",
    benefits: "Recitation increases knowledge and understanding."
  },
  {
    id: "allahName21",
    number: 21,
    arabic: "ٱلْقَابِضُ",
    transliteration: "Al-Qabid",
    englishMeaning: "The Withholder",
    urduMeaning: "القابض (روکنے والا)",
    benefits: "This name helps in controlling desires and handling losses."
  },
  {
    id: "allahName22",
    number: 22,
    arabic: "ٱلْبَاسِطُ",
    transliteration: "Al-Basit",
    englishMeaning: "The Extender",
    urduMeaning: "الباسط (کشادگی دینے والا)",
    benefits: "Recitation brings abundance and relief from hardship."
  },
  {
    id: "allahName23",
    number: 23,
    arabic: "ٱلْخَافِضُ",
    transliteration: "Al-Khafid",
    englishMeaning: "The Abaser",
    urduMeaning: "الخافض (پست کرنے والا)",
    benefits: "This name protects from arrogance and self-deception."
  },
  {
    id: "allahName24",
    number: 24,
    arabic: "ٱلرَّافِعُ",
    transliteration: "Ar-Rafi'",
    englishMeaning: "The Exalter",
    urduMeaning: "الرافع (بلند کرنے والا)",
    benefits: "Recitation raises one's status and spiritual rank."
  },
  {
    id: "allahName25",
    number: 25,
    arabic: "ٱلْمُعِزُّ",
    transliteration: "Al-Mu'izz",
    englishMeaning: "The Giver of Honor",
    urduMeaning: "المعز (عزت دینے والا)",
    benefits: "This name brings dignity and respect in society."
  },
  {
    id: "allahName26",
    number: 26,
    arabic: "ٱلْمُذِلُّ",
    transliteration: "Al-Mudhill",
    englishMeaning: "The Giver of Dishonor",
    urduMeaning: "المذل (ذلیل کرنے والا)",
    benefits: "This name teaches humility and reminds of the consequences of arrogance."
  },
  {
    id: "allahName27",
    number: 27,
    arabic: "ٱلسَّمِيعُ",
    transliteration: "As-Sami'",
    englishMeaning: "The All-Hearing",
    urduMeaning: "السمیع (سننے والا)",
    benefits: "Recitation ensures that one's prayers are heard and helps in being a better listener."
  },
  {
    id: "allahName28",
    number: 28,
    arabic: "ٱلْبَصِيرُ",
    transliteration: "Al-Basir",
    englishMeaning: "The All-Seeing",
    urduMeaning: "البصیر (دیکھنے والا)",
    benefits: "This name promotes awareness and mindfulness of one's actions."
  },
  {
    id: "allahName29",
    number: 29,
    arabic: "ٱلْحَكَمُ",
    transliteration: "Al-Hakam",
    englishMeaning: "The Judge",
    urduMeaning: "الحکم (فیصلہ کرنے والا)",
    benefits: "Recitation helps in making fair judgments and resolving disputes."
  },
  {
    id: "allahName30",
    number: 30,
    arabic: "ٱلْعَدْلُ",
    transliteration: "Al-'Adl",
    englishMeaning: "The Just",
    urduMeaning: "العدل (انصاف کرنے والا)",
    benefits: "This name promotes justice, fairness, and balanced decisions."
  },
  {
    id: "allahName31",
    number: 31,
    arabic: "ٱللَّطِيفُ",
    transliteration: "Al-Latif",
    englishMeaning: "The Subtle One",
    urduMeaning: "اللطیف (باریک بین)",
    benefits: "Recitation brings subtle kindness and blessing in difficult times."
  },
  {
    id: "allahName32",
    number: 32,
    arabic: "ٱلْخَبِيرُ",
    transliteration: "Al-Khabir",
    englishMeaning: "The All-Aware",
    urduMeaning: "الخبیر (خبر رکھنے والا)",
    benefits: "This name increases awareness and understanding of hidden realities."
  },
  {
    id: "allahName33",
    number: 33,
    arabic: "ٱلْحَلِيمُ",
    transliteration: "Al-Halim",
    englishMeaning: "The Forbearing",
    urduMeaning: "الحلیم (حلم والا)",
    benefits: "Recitation helps develop patience and restraint during anger."
  },
  {
    id: "allahName34",
    number: 34,
    arabic: "ٱلْعَظِيمُ",
    transliteration: "Al-'Azim",
    englishMeaning: "The Magnificent",
    urduMeaning: "العظیم (عظمت والا)",
    benefits: "This name inspires awe and reverence for divine greatness."
  },
  {
    id: "allahName35",
    number: 35,
    arabic: "ٱلْغَفُورُ",
    transliteration: "Al-Ghafur",
    englishMeaning: "The All-Forgiving",
    urduMeaning: "الغفور (بخشنے والا)",
    benefits: "Recitation brings forgiveness and relief from the burden of sins."
  },
  {
    id: "allahName36",
    number: 36,
    arabic: "ٱلشَّكُورُ",
    transliteration: "Ash-Shakur",
    englishMeaning: "The Appreciative",
    urduMeaning: "الشکور (قدردان)",
    benefits: "This name multiplies rewards for good deeds and increases gratitude."
  },
  {
    id: "allahName37",
    number: 37,
    arabic: "ٱلْعَلِيُّ",
    transliteration: "Al-'Ali",
    englishMeaning: "The Most High",
    urduMeaning: "العلی (بلند مرتبہ)",
    benefits: "Recitation elevates spiritual rank and helps overcome worldly attachments."
  },
  {
    id: "allahName38",
    number: 38,
    arabic: "ٱلْكَبِيرُ",
    transliteration: "Al-Kabir",
    englishMeaning: "The Great",
    urduMeaning: "الکبیر (بہت بڑا)",
    benefits: "This name helps put worldly matters into perspective and reduces anxiety."
  },
  {
    id: "allahName39",
    number: 39,
    arabic: "ٱلْحَفِيظُ",
    transliteration: "Al-Hafiz",
    englishMeaning: "The Preserver",
    urduMeaning: "الحفیظ (حفاظت کرنے والا)",
    benefits: "Recitation brings protection to one's family, property, and faith."
  },
  {
    id: "allahName40",
    number: 40,
    arabic: "ٱلْمُقِيتُ",
    transliteration: "Al-Muqit",
    englishMeaning: "The Nourisher",
    urduMeaning: "المقیت (قوت دینے والا)",
    benefits: "This name ensures nourishment and sustenance both physically and spiritually."
  },
  {
    id: "allahName41",
    number: 41,
    arabic: "ٱلْحَسِيبُ",
    transliteration: "Al-Hasib",
    englishMeaning: "The Reckoner",
    urduMeaning: "الحسیب (حساب لینے والا)",
    benefits: "Recitation promotes self-accountability and mindfulness."
  },
  {
    id: "allahName42",
    number: 42,
    arabic: "ٱلْجَلِيلُ",
    transliteration: "Al-Jalil",
    englishMeaning: "The Majestic",
    urduMeaning: "الجلیل (جلال والا)",
    benefits: "This name instills reverence and awe for divine majesty."
  },
  {
    id: "allahName43",
    number: 43,
    arabic: "ٱلْكَرِيمُ",
    transliteration: "Al-Karim",
    englishMeaning: "The Generous",
    urduMeaning: "الکریم (کرم کرنے والا)",
    benefits: "Recitation attracts divine generosity and inspires generosity in oneself."
  },
  {
    id: "allahName44",
    number: 44,
    arabic: "ٱلرَّقِيبُ",
    transliteration: "Ar-Raqib",
    englishMeaning: "The Watchful",
    urduMeaning: "الرقیب (نگرانی کرنے والا)",
    benefits: "This name increases awareness of divine observation, leading to better conduct."
  },
  {
    id: "allahName45",
    number: 45,
    arabic: "ٱلْمُجِيبُ",
    transliteration: "Al-Mujib",
    englishMeaning: "The Responsive",
    urduMeaning: "المجیب (دعا قبول کرنے والا)",
    benefits: "Recitation brings quick response to prayers and supplications."
  },
  {
    id: "allahName46",
    number: 46,
    arabic: "ٱلْوَاسِعُ",
    transliteration: "Al-Wasi'",
    englishMeaning: "The All-Encompassing",
    urduMeaning: "الواسع (کشادگی والا)",
    benefits: "This name brings abundance and expansion in knowledge and sustenance."
  },
  {
    id: "allahName47",
    number: 47,
    arabic: "ٱلْحَكِيمُ",
    transliteration: "Al-Hakim",
    englishMeaning: "The Wise",
    urduMeaning: "الحکیم (حکمت والا)",
    benefits: "Recitation increases wisdom and helps make better decisions."
  },
  {
    id: "allahName48",
    number: 48,
    arabic: "ٱلْوَدُودُ",
    transliteration: "Al-Wadud",
    englishMeaning: "The Loving",
    urduMeaning: "الودود (محبت کرنے والا)",
    benefits: "This name cultivates love and affection in relationships."
  },
  {
    id: "allahName49",
    number: 49,
    arabic: "ٱلْمَجِيدُ",
    transliteration: "Al-Majid",
    englishMeaning: "The Glorious",
    urduMeaning: "المجید (بزرگی والا)",
    benefits: "Recitation brings honor and elevation in rank."
  },
  {
    id: "allahName50",
    number: 50,
    arabic: "ٱلْبَاعِثُ",
    transliteration: "Al-Ba'ith",
    englishMeaning: "The Resurrector",
    urduMeaning: "الباعث (اٹھانے والا)",
    benefits: "This name revives hope and energy in difficult situations."
  },
  {
    id: "allahName51",
    number: 51,
    arabic: "ٱلشَّهِيدُ",
    transliteration: "Ash-Shahid",
    englishMeaning: "The Witness",
    urduMeaning: "الشہید (گواہ)",
    benefits: "Recitation brings mindfulness and awareness of divine observation."
  },
  {
    id: "allahName52",
    number: 52,
    arabic: "ٱلْحَقُّ",
    transliteration: "Al-Haqq",
    englishMeaning: "The Truth",
    urduMeaning: "الحق (سچا)",
    benefits: "This name brings clarity in understanding reality and truth."
  },
  {
    id: "allahName53",
    number: 53,
    arabic: "ٱلْوَكِيلُ",
    transliteration: "Al-Wakil",
    englishMeaning: "The Trustee",
    urduMeaning: "الوکیل (کارساز)",
    benefits: "Recitation strengthens trust in divine support during challenges."
  },
  {
    id: "allahName54",
    number: 54,
    arabic: "ٱلْقَوِيُّ",
    transliteration: "Al-Qawiyy",
    englishMeaning: "The Strong",
    urduMeaning: "القوی (قوت والا)",
    benefits: "This name provides strength and resilience in times of weakness."
  },
  {
    id: "allahName55",
    number: 55,
    arabic: "ٱلْمَتِينُ",
    transliteration: "Al-Matin",
    englishMeaning: "The Firm",
    urduMeaning: "المتین (مضبوط)",
    benefits: "Recitation brings firmness and stability in one's faith and affairs."
  },
  {
    id: "allahName56",
    number: 56,
    arabic: "ٱلْوَلِيُّ",
    transliteration: "Al-Waliyy",
    englishMeaning: "The Protecting Friend",
    urduMeaning: "الولی (دوست)",
    benefits: "This name brings divine friendship and protection in all matters."
  },
  {
    id: "allahName57",
    number: 57,
    arabic: "ٱلْحَمِيدُ",
    transliteration: "Al-Hamid",
    englishMeaning: "The Praiseworthy",
    urduMeaning: "الحمید (تعریف کے لائق)",
    benefits: "Recitation increases gratitude and recognition of divine blessings."
  },
  {
    id: "allahName58",
    number: 58,
    arabic: "ٱلْمُحْصِي",
    transliteration: "Al-Muhsi",
    englishMeaning: "The Counter",
    urduMeaning: "المحصی (شمار کرنے والا)",
    benefits: "This name helps in being organized and accountable for one's deeds."
  },
  {
    id: "allahName59",
    number: 59,
    arabic: "ٱلْمُبْدِئُ",
    transliteration: "Al-Mubdi'",
    englishMeaning: "The Originator",
    urduMeaning: "المبدی (پہلی بار پیدا کرنے والا)",
    benefits: "Recitation inspires creativity and new beginnings."
  },
  {
    id: "allahName60",
    number: 60,
    arabic: "ٱلْمُعِيدُ",
    transliteration: "Al-Mu'id",
    englishMeaning: "The Restorer",
    urduMeaning: "المعید (دوبارہ پیدا کرنے والا)",
    benefits: "This name helps in restoring what was lost and reviving hope."
  },
  {
    id: "allahName61",
    number: 61,
    arabic: "ٱلْمُحْيِى",
    transliteration: "Al-Muhyi",
    englishMeaning: "The Giver of Life",
    urduMeaning: "المحیی (زندہ کرنے والا)",
    benefits: "Recitation brings vitality and energy to one's physical and spiritual life."
  },
  {
    id: "allahName62",
    number: 62,
    arabic: "ٱلْمُمِيتُ",
    transliteration: "Al-Mumit",
    englishMeaning: "The Causer of Death",
    urduMeaning: "الممیت (موت دینے والا)",
    benefits: "This name reminds of the transient nature of life and importance of preparation."
  },
  {
    id: "allahName63",
    number: 63,
    arabic: "ٱلْحَيُّ",
    transliteration: "Al-Hayy",
    englishMeaning: "The Ever-Living",
    urduMeaning: "الحی (زندہ)",
    benefits: "Recitation brings eternal vigor and spiritual life to the heart."
  },
  {
    id: "allahName64",
    number: 64,
    arabic: "ٱلْقَيُّومُ",
    transliteration: "Al-Qayyum",
    englishMeaning: "The Self-Subsisting",
    urduMeaning: "القیوم (قائم رہنے والا)",
    benefits: "This name brings stability and independence in one's affairs."
  },
  {
    id: "allahName65",
    number: 65,
    arabic: "ٱلْوَاجِدُ",
    transliteration: "Al-Wajid",
    englishMeaning: "The Finder",
    urduMeaning: "الواجد (پانے والا)",
    benefits: "Recitation helps in finding solutions and resources when needed."
  },
  {
    id: "allahName66",
    number: 66,
    arabic: "ٱلْمَاجِدُ",
    transliteration: "Al-Majid",
    englishMeaning: "The Noble",
    urduMeaning: "الماجد (بزرگی والا)",
    benefits: "This name instills nobility and dignity in one's character."
  },
  {
    id: "allahName67",
    number: 67,
    arabic: "ٱلْوَاحِدُ",
    transliteration: "Al-Wahid",
    englishMeaning: "The One",
    urduMeaning: "الواحد (اکیلا)",
    benefits: "Recitation strengthens monotheistic faith and focuses one's devotion."
  },
  {
    id: "allahName68",
    number: 68,
    arabic: "ٱلْأَحَد",
    transliteration: "Al-Ahad",
    englishMeaning: "The Unique",
    urduMeaning: "الاحد (یکتا)",
    benefits: "This name purifies one's faith from all forms of polytheism."
  },
  {
    id: "allahName69",
    number: 69,
    arabic: "ٱلصَّمَدُ",
    transliteration: "As-Samad",
    englishMeaning: "The Eternal",
    urduMeaning: "الصمد (بے نیاز)",
    benefits: "Recitation fulfills needs and provides self-sufficiency."
  },
  {
    id: "allahName70",
    number: 70,
    arabic: "ٱلْقَادِرُ",
    transliteration: "Al-Qadir",
    englishMeaning: "The Able",
    urduMeaning: "القادر (قدرت والا)",
    benefits: "This name empowers one to accomplish difficult tasks."
  },
  {
    id: "allahName71",
    number: 71,
    arabic: "ٱلْمُقْتَدِرُ",
    transliteration: "Al-Muqtadir",
    englishMeaning: "The Powerful",
    urduMeaning: "المقتدر (قوت والا)",
    benefits: "Recitation brings divine power to overcome challenges."
  },
  {
    id: "allahName72",
    number: 72,
    arabic: "ٱلْمُقَدِّمُ",
    transliteration: "Al-Muqaddim",
    englishMeaning: "The Expediter",
    urduMeaning: "المقدم (آگے کرنے والا)",
    benefits: "This name helps in advancing and succeeding in righteous endeavors."
  },
  {
    id: "allahName73",
    number: 73,
    arabic: "ٱلْمُؤَخِّرُ",
    transliteration: "Al-Mu'akhkhir",
    englishMeaning: "The Delayer",
    urduMeaning: "المؤخر (پیچھے کرنے والا)",
    benefits: "Recitation helps in accepting divine timing with patience."
  },
  {
    id: "allahName74",
    number: 74,
    arabic: "ٱلْأَوَّلُ",
    transliteration: "Al-Awwal",
    englishMeaning: "The First",
    urduMeaning: "الاول (پہلا)",
    benefits: "This name helps understand the primordial nature of divine existence."
  },
  {
    id: "allahName75",
    number: 75,
    arabic: "ٱلْآخِرُ",
    transliteration: "Al-Akhir",
    englishMeaning: "The Last",
    urduMeaning: "الآخر (آخری)",
    benefits: "Recitation reminds of the eternal nature of Allah after all perishes."
  },
  {
    id: "allahName76",
    number: 76,
    arabic: "ٱلظَّاهِرُ",
    transliteration: "Az-Zahir",
    englishMeaning: "The Manifest",
    urduMeaning: "الظاہر (ظاہر)",
    benefits: "This name opens eyes to divine signs manifest in creation."
  },
  {
    id: "allahName77",
    number: 77,
    arabic: "ٱلْبَاطِنُ",
    transliteration: "Al-Batin",
    englishMeaning: "The Hidden",
    urduMeaning: "الباطن (پوشیدہ)",
    benefits: "Recitation deepens spiritual insights into hidden realities."
  },
  {
    id: "allahName78",
    number: 78,
    arabic: "ٱلْوَالِي",
    transliteration: "Al-Wali",
    englishMeaning: "The Governor",
    urduMeaning: "الوالی (حکمران)",
    benefits: "This name brings divine guidance in managing one's affairs."
  },
  {
    id: "allahName79",
    number: 79,
    arabic: "ٱلْمُتَعَالِي",
    transliteration: "Al-Muta'ali",
    englishMeaning: "The Most Exalted",
    urduMeaning: "المتعالی (بلند مرتبہ)",
    benefits: "Recitation elevates spiritual rank and detaches from worldliness."
  },
  {
    id: "allahName80",
    number: 80,
    arabic: "ٱلْبَرُّ",
    transliteration: "Al-Barr",
    englishMeaning: "The Source of Goodness",
    urduMeaning: "البر (نیکی کرنے والا)",
    benefits: "This name attracts divine goodness and blessings in life."
  },
  {
    id: "allahName81",
    number: 81,
    arabic: "ٱلتَّوَّابُ",
    transliteration: "At-Tawwab",
    englishMeaning: "The Acceptor of Repentance",
    urduMeaning: "التواب (توبہ قبول کرنے والا)",
    benefits: "Recitation facilitates repentance and returning to the right path."
  },
  {
    id: "allahName82",
    number: 82,
    arabic: "ٱلْمُنْتَقِمُ",
    transliteration: "Al-Muntaqim",
    englishMeaning: "The Avenger",
    urduMeaning: "المنتقم (انتقام لینے والا)",
    benefits: "This name establishes justice and deters from wrongdoing."
  },
  {
    id: "allahName83",
    number: 83,
    arabic: "ٱلْعَفُوُّ",
    transliteration: "Al-'Afuww",
    englishMeaning: "The Pardoner",
    urduMeaning: "العفو (معاف کرنے والا)",
    benefits: "Recitation brings forgiveness and pardon for sins."
  },
  {
    id: "allahName84",
    number: 84,
    arabic: "ٱلرَّءُوفُ",
    transliteration: "Ar-Ra'uf",
    englishMeaning: "The Compassionate",
    urduMeaning: "الرؤوف (نرمی کرنے والا)",
    benefits: "This name cultivates compassion and kindness in one's heart."
  },
  {
    id: "allahName85",
    number: 85,
    arabic: "مَالِكُ ٱلْمُلْكِ",
    transliteration: "Malik-ul-Mulk",
    englishMeaning: "Owner of Sovereignty",
    urduMeaning: "مالک الملک (بادشاہت کا مالک)",
    benefits: "Recitation establishes divine authority and sovereignty in affairs."
  },
  {
    id: "allahName86",
    number: 86,
    arabic: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ",
    transliteration: "Dhul-Jalali wal-Ikram",
    englishMeaning: "Possessor of Majesty and Honor",
    urduMeaning: "ذوالجلال والاکرام (عظمت و بزرگی والا)",
    benefits: "This name brings honor, respect, and glory to the one who recites it."
  },
  {
    id: "allahName87",
    number: 87,
    arabic: "ٱلْمُقْسِطُ",
    transliteration: "Al-Muqsit",
    englishMeaning: "The Equitable",
    urduMeaning: "المقسط (انصاف کرنے والا)",
    benefits: "Recitation helps establish justice and fairness in dealings."
  },
  {
    id: "allahName88",
    number: 88,
    arabic: "ٱلْجَامِعُ",
    transliteration: "Al-Jami'",
    englishMeaning: "The Gatherer",
    urduMeaning: "الجامع (جمع کرنے والا)",
    benefits: "This name helps in bringing together people and resources for good."
  },
  {
    id: "allahName89",
    number: 89,
    arabic: "ٱلْغَنِيُّ",
    transliteration: "Al-Ghani",
    englishMeaning: "The Self-Sufficient",
    urduMeaning: "الغنی (بے نیاز)",
    benefits: "Recitation brings contentment and freedom from worldly attachments."
  },
  {
    id: "allahName90",
    number: 90,
    arabic: "ٱلْمُغْنِي",
    transliteration: "Al-Mughni",
    englishMeaning: "The Enricher",
    urduMeaning: "المغنی (غنی کرنے والا)",
    benefits: "This name attracts richness in spiritual and material wealth."
  },
  {
    id: "allahName91",
    number: 91,
    arabic: "ٱلْمَانِعُ",
    transliteration: "Al-Mani'",
    englishMeaning: "The Preventer",
    urduMeaning: "المانع (روکنے والا)",
    benefits: "Recitation protects from harm and prevents what is not beneficial."
  },
  {
    id: "allahName92",
    number: 92,
    arabic: "ٱلضَّارُّ",
    transliteration: "Ad-Darr",
    englishMeaning: "The Distresser",
    urduMeaning: "الضار (نقصان پہنچانے والا)",
    benefits: "This name reminds of divine wisdom in allowing hardship for higher purpose."
  },
  {
    id: "allahName93",
    number: 93,
    arabic: "ٱلنَّافِعُ",
    transliteration: "An-Nafi'",
    englishMeaning: "The Benefactor",
    urduMeaning: "النافع (فائدہ پہنچانے والا)",
    benefits: "Recitation brings beneficial outcomes and wards off harm."
  },
  {
    id: "allahName94",
    number: 94,
    arabic: "ٱلنُّورُ",
    transliteration: "An-Nur",
    englishMeaning: "The Light",
    urduMeaning: "النور (روشنی)",
    benefits: "This name brings spiritual illumination and guidance."
  },
  {
    id: "allahName95",
    number: 95,
    arabic: "ٱلْهَادِي",
    transliteration: "Al-Hadi",
    englishMeaning: "The Guide",
    urduMeaning: "الہادی (ہدایت دینے والا)",
    benefits: "Recitation brings guidance in confused situations and life decisions."
  },
  {
    id: "allahName96",
    number: 96,
    arabic: "ٱلْبَدِيعُ",
    transliteration: "Al-Badi'",
    englishMeaning: "The Originator",
    urduMeaning: "البدیع (نئی چیز بنانے والا)",
    benefits: "This name inspires creativity and innovation in all endeavors."
  },
  {
    id: "allahName97",
    number: 97,
    arabic: "ٱلْبَاقِي",
    transliteration: "Al-Baqi",
    englishMeaning: "The Everlasting",
    urduMeaning: "الباقی (ہمیشہ رہنے والا)",
    benefits: "Recitation brings lasting impact to good deeds and enduring rewards."
  },
  {
    id: "allahName98",
    number: 98,
    arabic: "ٱلْوَارِثُ",
    transliteration: "Al-Warith",
    englishMeaning: "The Inheritor",
    urduMeaning: "الوارث (وارث)",
    benefits: "This name reminds that all ultimately returns to Allah."
  },
  {
    id: "allahName99",
    number: 99,
    arabic: "ٱلرَّشِيدُ",
    transliteration: "Ar-Rashid",
    englishMeaning: "The Guide to the Right Path",
    urduMeaning: "الرشید (راہ دکھانے والا)",
    benefits: "Recitation brings wise guidance and direction in affairs."
  }
];

export default allahNamesData;