import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Parah } from '../utils/quranData';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Settings: undefined;
  PrayerTimes: undefined;
  Qibla: undefined;
  Quran: undefined;
  QuranTextView: { surah: any; initialAyah?: number };
  ParahTextView: { parah: Parah };
  Calendar: undefined;
  Duas: undefined;
  DuaDetail: { duaId: string };
  AllahNames: undefined;
  AllahNameDetail: { nameId: string };
  MuhammadNames: undefined;
  MuhammadNameDetail: { nameId: string };
  AudioQuran: undefined;
  AudioPlayer: { audioId: string };
  QuranBookmarks: undefined;
  Tasbih: undefined;
  YoutubeFeed: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 