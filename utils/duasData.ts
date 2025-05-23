export interface Dua {
  id: string;
  name: string;
  category: string;
  arabicText: string;
  translation_en: string;
  translation_ur: string;
  source?: string;
  favorite?: boolean;
}

export interface DuaCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const DUA_CATEGORIES: DuaCategory[] = [
  {
    id: 'morning_evening',
    name: 'Morning & Evening',
    icon: 'weather-sunset',
    description: 'Duas for starting and ending the day'
  },
  {
    id: 'daily',
    name: 'Daily Activities',
    icon: 'coffee',
    description: 'Duas for everyday activities like eating, drinking, etc.'
  },
  {
    id: 'salah',
    name: 'Prayer (Salah)',
    icon: 'prayer',
    description: 'Duas related to prayer'
  },
  {
    id: 'protection',
    name: 'Protection & Healing',
    icon: 'shield-check',
    description: 'Duas for seeking protection and healing'
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness',
    icon: 'hand-heart',
    description: 'Duas for seeking forgiveness'
  },
  {
    id: 'quran',
    name: 'From Quran',
    icon: 'book-open-variant',
    description: 'Duas mentioned in the Holy Quran'
  }
];

const duasData: Dua[] = [
  {
    id: "dua1",
    name: "Morning Supplication",
    category: "morning_evening",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    translation_en: "We have reached the morning and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this day, its triumphs and its victories, its light and its blessings, and its guidance. I seek refuge in You from the evil of this day and the evil that follows it.",
    translation_ur: "ہم نے صبح کی اور اللہ کی بادشاہی نے بھی صبح کی، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، وہ ہر چیز پر قادر ہے۔ اے رب! میں تجھ سے اس دن کی بھلائی اور اس کے بعد آنے والی بھلائی کا سوال کرتا ہوں، اور میں اس دن کے شر اور اس کے بعد آنے والے شر سے تیری پناہ چاہتا ہوں، اے رب! میں تجھ سے سستی اور بڑھاپے کی برائی سے پناہ مانگتا ہوں، اے رب! میں تجھ سے آگ کے عذاب اور قبر کے عذاب سے پناہ مانگتا ہوں۔",
    source: "Muslim"
  },
  {
    id: "dua2",
    name: "Evening Supplication",
    category: "morning_evening",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُبِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُبِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُبِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    translation_en: "We have reached the evening and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this night, its triumphs and its victories, its light and its blessings, and its guidance. I seek refuge in You from the evil of this night and the evil that follows it.",
    translation_ur: "ہم نے شام کی اور اللہ کی بادشاہی نے بھی شام کی، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، وہ ہر چیز پر قادر ہے۔ اے رب! میں تجھ سے اس رات کی بھلائی اور اس کے بعد آنے والی بھلائی کا سوال کرتا ہوں، اور میں اس رات کے شر اور اس کے بعد آنے والے شر سے تیری پناہ چاہتا ہوں، اے رب! میں تجھ سے سستی اور بڑھاپے کی برائی سے پناہ مانگتا ہوں، اے رب! میں تجھ سے آگ کے عذاب اور قبر کے عذاب سے پناہ مانگتا ہوں۔",
    source: "Muslim"
  },
  {
    id: "dua3",
    name: "Before Eating",
    category: "daily",
    arabicText: "بِسْمِ اللَّهِ",
    translation_en: "In the name of Allah",
    translation_ur: "اللہ کے نام سے",
    source: "Abu Dawud"
  },
  {
    id: "dua4",
    name: "After Eating",
    category: "daily",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    translation_en: "Praise be to Allah who has given me this food and provided it for me, with no strength and no power on my part",
    translation_ur: "تمام تعریف اللہ کے لیے ہے جس نے مجھے یہ کھانا کھلایا اور مجھے یہ رزق دیا، میری طرف سے کوئی طاقت اور قوت کے بغیر",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "dua5",
    name: "Before Entering Toilet",
    category: "daily",
    arabicText: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
    translation_en: "In the name of Allah. O Allah, I seek refuge with You from the male and female devils",
    translation_ur: "اللہ کے نام سے۔ اے اللہ! میں خبیث جنوں اور خبیث جنات سے تیری پناہ چاہتا ہوں",
    source: "Bukhari, Muslim"
  },
  {
    id: "dua6",
    name: "After Leaving Toilet",
    category: "daily",
    arabicText: "غُفْرَانَكَ",
    translation_en: "I ask You (Allah) for forgiveness",
    translation_ur: "اے اللہ تیری بخشش چاہتا ہوں",
    source: "Abu Dawud, Tirmidhi, Ibn Majah"
  },
  {
    id: "dua7",
    name: "Before Sleep",
    category: "daily",
    arabicText: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translation_en: "In Your name, O Allah, I die and I live",
    translation_ur: "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا ہوں اور جیتا ہوں",
    source: "Bukhari"
  },
  {
    id: "dua8",
    name: "Upon Waking Up",
    category: "daily",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translation_en: "Praise is to Allah Who gives us life after He has caused us to die and to Him is the return",
    translation_ur: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں موت دینے کے بعد زندگی دی اور اسی کی طرف لوٹنا ہے",
    source: "Bukhari"
  },
  {
    id: "dua9",
    name: "Opening of Prayer (Istiftah)",
    category: "salah",
    arabicText: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلاَ إِلَهَ غَيْرُكَ",
    translation_en: "Glory be to You, O Allah, and praise. Blessed is Your name and exalted is Your majesty. There is no god but You",
    translation_ur: "اے اللہ! تو پاک ہے اور تیری تعریف کے ساتھ، تیرا نام برکت والا ہے، تیری شان بلند ہے، تیرے سوا کوئی معبود نہیں",
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "dua10",
    name: "During Ruku (Bowing)",
    category: "salah",
    arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    translation_en: "Glory be to my Lord, the Magnificent",
    translation_ur: "میرا عظیم رب پاک ہے",
    source: "Muslim"
  },
  {
    id: "dua11",
    name: "Rising from Ruku",
    category: "salah",
    arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
    translation_en: "Allah hears those who praise Him. Our Lord, praise be to You",
    translation_ur: "اللہ نے اس کی سن لی جس نے اس کی تعریف کی، اے ہمارے رب! تیرے لیے ہی تمام تعریف ہے",
    source: "Bukhari"
  },
  {
    id: "dua12",
    name: "During Sujood (Prostration)",
    category: "salah",
    arabicText: "سُبْحَانَ رَبِّيَ الأَعْلَى",
    translation_en: "Glory be to my Lord, the Most High",
    translation_ur: "میرا بلند و بالا رب پاک ہے",
    source: "Muslim"
  },
  {
    id: "dua13",
    name: "For Protection",
    category: "protection",
    arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    translation_en: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by other men",
    translation_ur: "اے اللہ! میں فکر و غم، عاجزی و سستی، بخل و بزدلی، قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ چاہتا ہوں",
    source: "Bukhari"
  },
  {
    id: "dua14",
    name: "For Seeking Forgiveness",
    category: "forgiveness",
    arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
    translation_en: "O Allah, You are my Lord, there is no god but You. You created me and I am Your slave. I keep my covenant with You and my pledge to You as much as I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me, and I acknowledge my sins. Forgive me, for there is none who forgives sins but You",
    translation_ur: "اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں، میں اپنے کیے ہوئے اعمال کے شر سے تیری پناہ چاہتا ہوں، میں تیری نعمتوں کا اعتراف کرتا ہوں جو تو نے مجھ پر کی ہیں، اور میں اپنے گناہوں کا بھی اعتراف کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو بخشنے والا نہیں",
    source: "Bukhari"
  },
  {
    id: "dua15",
    name: "For Anxiety and Sorrow",
    category: "protection",
    arabicText: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
    translation_en: "O Allah, I am Your slave, son of Your slave, son of Your maidservant, my forelock is in Your hand, Your command over me is forever executed and Your decree over me is just. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or You taught to any of Your creation, or You have preserved in the knowledge of the unseen with You, that You make the Quran the life of my heart and the light of my chest, and a departure for my sorrow and a release for my anxiety",
    translation_ur: "اے اللہ! میں تیرا غلام ہوں، تیرے غلام کا بیٹا، تیری لونڈی کا بیٹا، میری پیشانی تیرے ہاتھ میں ہے، تیرا حکم مجھ پر نافذ ہے، تیرا فیصلہ میرے حق میں عدل ہے، میں تجھ سے تیرے ہر اس نام کے واسطے سے سوال کرتا ہوں جو تیرا ہے، جس سے تو نے اپنے آپ کو موسوم کیا، یا جسے تو نے اپنی کتاب میں نازل کیا، یا جسے تو نے اپنی مخلوق میں سے کسی کو سکھایا، یا جسے تو نے غیب کے علم میں اپنے پاس چن لیا، یہ کہ تو قرآن کو میرے دل کی بہار، میرے سینے کی روشنی، میرے غم کا برطرف کرنے والا اور میری پریشانی کو دور کرنے والا بنا دے",
    source: "Ahmad"
  },
  {
    id: "dua16",
    name: "Prophet's Prayer For Guidance",
    category: "quran",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation_en: "Our Lord! Grant us good in this world and good in the Hereafter, and save us from the torment of the Fire",
    translation_ur: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی، اور ہمیں آگ کے عذاب سے بچا",
    source: "Quran 2:201"
  },
  {
    id: "dua17",
    name: "Dua for Parents",
    category: "quran",
    arabicText: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    translation_en: "My Lord, have mercy upon them as they brought me up when I was small",
    translation_ur: "اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا",
    source: "Quran 17:24"
  },
  {
    id: "dua18",
    name: "For Strength and Patience",
    category: "quran",
    arabicText: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    translation_en: "Our Lord! Pour forth on us patience and make us victorious over the disbelieving people",
    translation_ur: "اے ہمارے رب! ہم پر صبر نازل فرما اور ہمارے قدم جما دے اور کافر قوم پر ہماری مدد فرما",
    source: "Quran 2:250"
  },
  {
    id: "dua19",
    name: "For Beneficial Knowledge",
    category: "protection",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    translation_en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds",
    translation_ur: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتا ہوں",
    source: "Ibn Majah"
  },
  {
    id: "dua20",
    name: "When Entering Home",
    category: "daily",
    arabicText: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    translation_en: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend",
    translation_ur: "اللہ کے نام سے ہم داخل ہوئے، اللہ کے نام سے ہم نکلے، اور ہم نے اپنے رب پر بھروسہ کیا",
    source: "Abu Dawud"
  }
];

export default duasData;