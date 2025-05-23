export interface IslamicEvent {
  id: string;
  name: string;
  hijriMonth: number;
  hijriDay: number;
  description: string;
  type: 'holiday' | 'event' | 'night';
}

const islamicEvents: IslamicEvent[] = [
  {
    id: '1',
    name: 'Islamic New Year',
    hijriMonth: 1, // Muharram
    hijriDay: 1,
    description: 'The beginning of the Islamic calendar year.',
    type: 'holiday'
  },
  {
    id: '2',
    name: 'Day of Ashura',
    hijriMonth: 1,
    hijriDay: 10,
    description: 'A day of historical significance and optional fasting.',
    type: 'event'
  },
  {
    id: '3',
    name: 'Mawlid al-Nabi',
    hijriMonth: 3,
    hijriDay: 12,
    description: 'Celebration of the birth of Prophet Muhammad ﷺ.',
    type: 'holiday'
  },
  {
    id: '4',
    name: 'Laylat al-Miraj',
    hijriMonth: 7,
    hijriDay: 27,
    description: 'The Night Journey of Prophet Muhammad ﷺ.',
    type: 'night'
  },
  {
    id: '5',
    name: 'Shab-e-Barat',
    hijriMonth: 8,
    hijriDay: 15,
    description: 'The Night of Fortune and Forgiveness.',
    type: 'night'
  },
  {
    id: '6',
    name: 'Beginning of Ramadan',
    hijriMonth: 9,
    hijriDay: 1,
    description: 'The start of the blessed month of fasting.',
    type: 'holiday'
  },
  {
    id: '7',
    name: 'Laylat al-Qadr',
    hijriMonth: 9,
    hijriDay: 27,
    description: 'The Night of Power, better than a thousand months.',
    type: 'night'
  },
  {
    id: '8',
    name: 'Eid al-Fitr',
    hijriMonth: 10,
    hijriDay: 1,
    description: 'Festival of Breaking the Fast.',
    type: 'holiday'
  },
  {
    id: '9',
    name: 'Day of Arafah',
    hijriMonth: 12,
    hijriDay: 9,
    description: 'The most important day of Hajj.',
    type: 'event'
  },
  {
    id: '10',
    name: 'Eid al-Adha',
    hijriMonth: 12,
    hijriDay: 10,
    description: 'Festival of Sacrifice.',
    type: 'holiday'
  }
];

export default islamicEvents;