const teachers = {
  "Vujosevic Dusan": 0,
  "Ilic Nemanja": 1,
  "Radosavljevic Nemanja": 2,
  "Vidakovic MIlan": 3,
  "Gavrilovic Vuk": 4,
  "Stankovic Ivana": 5,
  "Dimic Surla Bojana": 6,
  "Radovic Mihailo": 7,
  "Jovanovic Nikola": 8,
  "Tomic Milan": 9,
  "Vasiljevic Jelena": 10,
  "Ciganovic Igor": 11,
  "Zirojevic Nemanja": 12,
  "Kojadinovic Dragoljub": 13,
  "Jankovic Radomir": 14,
  "Babic Djorde": 15,
  "Bojovic Petar": 16,
  "Vukotic Selena": 17,
  "Vucic Desimir": 18,
  "Jovanovic Miljana": 19,
  "Jovanovic Milos": 20,
  "Martic Goran": 21,
  "Malesevic Nenad": 22,
  "Ognjanovic Ivana": 23,
  "Djuric Milan": 24,
  "Stetin Darko": 25,
  "Lale Sinisa": 26,
  "Jankovski Ivan": 27,
  "Zahorjanski Miroljub": 28,
  "Miletic Misa": 29,
  "Markovic Nemanja": 30,
  "Milosavljevic Milos": 31,
  "Milojkovic Branislav": 32,
  "Markovic Ana": 33,
  "Perisic Branko": 34,
  "Jovanovic Jelena": 35,
  "Milinkovic Stevan": 36,
  "Stambolovic Bogdana": 37,
};
const groups = {
  301: 0,
  302: 1,
  303: 2,
  304: 3,
  305: 4,
  306: 5,
  307: 6,
  308: 7,
  309: 8,
  313: 15,
  314: 12,
  319: 13,
  322: 14,
  323: 16,
  324: 17,
  401: 21,
  402: 22,
  405: 23,
  "309a": 9,
  "2s1": 10,
  "2s2": 11,
  "3d1": 18,
  "3s1": 19,
  "3s2": 20,
};
const classrooms = {
  0: { name: "Atelje", type: "a" },
  1: { name: "Kolarac", type: "k" },
  2: { name: "U1", type: "n" },
  3: { name: "U8", type: "n" },
  4: { name: "U3", type: "r" },
  5: { name: "U4", type: "r" },
  6: { name: "U5", type: "r" },
  7: { name: "U7", type: "r" },
  8: { name: "Studio", type: "s" },
};

const classes = [
  {
    subject: "Programski prevodioci",
    tip: "P",
    teacher: "Vujosevic Dusan",
    groups: [
      "301",
      "302",
      "303",
      "304",
      "305",
      "306",
      "307",
      "308",
      "309",
      "309a",
    ],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Interakcija covek racunar",
    tip: "P",
    teacher: "Vujosevic Dusan",
    groups: [
      "301",
      "302",
      "303",
      "304",
      "305",
      "306",
      "307",
      "308",
      "309",
      "309a",
      "2s1",
      "2s2",
    ],
    classrooms: ["U10"],
    duration: "2",
  },
  {
    subject: "Masinsko ucenje",
    tip: "P",
    teacher: "Ilic Nemanja",
    groups: ["301", "302", "306", "308"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Interakcija covek racunar",
    tip: "V",
    teacher: "Radosavljevic Nemanja",
    groups: ["301", "303", "304", "305"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "WEB programiranje",
    tip: "P",
    teacher: "Vidakovic MIlan",
    groups: ["301", "303", "304", "307", "308", "309", "314", "319", "322"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "WEB programiranje",
    tip: "V",
    teacher: "Gavrilovic Vuk",
    groups: ["301", "303", "304", "307", "322"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Programski prevodioci",
    tip: "V",
    teacher: "Stankovic Ivana",
    groups: ["301", "305", "308"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Softverske komponente",
    tip: "P",
    teacher: "Dimic Surla Bojana",
    groups: ["301", "307", "309a"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Softverske komponente",
    tip: "V",
    teacher: "Radovic Mihailo",
    groups: ["301", "307", "309a"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Masinsko ucenje",
    tip: "V",
    teacher: "Jovanovic Nikola",
    groups: ["301", "308", "302", "306"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Genetski algoritmi",
    tip: "V",
    teacher: "Tomic Milan",
    groups: ["302", "303"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Programski prevodioci",
    tip: "V",
    teacher: "Stankovic Ivana",
    groups: ["302", "303", "304"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Genetski algoritmi",
    tip: "P",
    teacher: "Vasiljevic Jelena",
    groups: ["302", "303", "305", "306", "309", "309a"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Funkcionalno programiranje",
    tip: "P",
    teacher: "Dimic Surla Bojana",
    groups: ["302", "304", "309"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Funkcionalno programiranje",
    tip: "V",
    teacher: "Ciganovic Igor",
    groups: ["302", "304", "309"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Interakcija covek racunar",
    tip: "V",
    teacher: "Radosavljevic Nemanja",
    groups: ["302", "307", "306"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Razvoj mobilnih aplikacija",
    tip: "P",
    teacher: "Zirojevic Nemanja",
    groups: ["303", "304", "305", "306", "307", "308", "313", "314"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Razvoj mobilnih aplikacija",
    tip: "V",
    teacher: "Kojadinovic Dragoljub",
    groups: ["303", "304", "305", "306", "307", "308", "313", "314"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  {
    subject: "Modelovanje i simulacija",
    tip: "P",
    teacher: "Jankovic Radomir",
    groups: ["305", "319", "323", "309a", "324"],
    classrooms: ["U1", "U8"],
    duration: "2",
  },
  {
    subject: "Programski prevodioci",
    tip: "V",
    teacher: "Stankovic Ivana",
    groups: ["306", "307", "309", "309a"],
    classrooms: ["U3", "U4", "U5", "U7"],
    duration: "2",
  },
  // {
  //   subject: "Interakcija covek racunar",
  //   tip: "V",
  //   teacher: "Radosavljevic Nemanja",
  //   groups: ["308", "309", "309a"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "WEB programiranje",
  //   tip: "V",
  //   teacher: "Gavrilovic Vuk",
  //   groups: ["308", "309", "314", "319"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Genetski algoritmi",
  //   tip: "V",
  //   teacher: "Tomic Milan",
  //   groups: ["309", "309a", "305", "306"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Modelovanje i simulacija",
  //   tip: "V",
  //   teacher: "Jankovic Radomir",
  //   groups: ["309a", "324", "305"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Bezbednost mreza",
  //   tip: "P",
  //   teacher: "Babic Djorde",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Bezbednost mreza",
  //   tip: "V",
  //   teacher: "Bojovic Petar",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Kompresija podataka",
  //   tip: "P",
  //   teacher: "Vukotic Selena",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Kompresija podataka",
  //   tip: "V",
  //   teacher: "Vukotic Selena",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Kodovanje i teorija informacija",
  //   tip: "P",
  //   teacher: "Vucic Desimir",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Kodovanje i teorija informacija",
  //   tip: "V",
  //   teacher: "Jovanovic Miljana",
  //   groups: ["313", "314", "319", "323", "324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Uvod u robotiku",
  //   tip: "P",
  //   teacher: "Jovanovic Milos",
  //   groups: ["313", "323"],
  //   classrooms: ["U1", "U8"],
  //   duration: "2",
  // },
  // {
  //   subject: "Uvod u robotiku",
  //   tip: "V",
  //   teacher: "Jovanovic Miljana",
  //   groups: ["313", "323"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Modelovanje i simulacija",
  //   tip: "V",
  //   teacher: "Jankovic Radomir",
  //   groups: ["319", "323"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Data centar infrastruktura",
  //   tip: "P",
  //   teacher: "Martic Goran",
  //   groups: ["324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Data centar infrastruktura",
  //   tip: "V",
  //   teacher: "Martic Goran",
  //   groups: ["324", "322"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "2",
  // },
  // {
  //   subject: "Graficki dizajn 2",
  //   tip: "P",
  //   teacher: "Malesevic Nenad",
  //   groups: ["3d1"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Graficki dizajn 2",
  //   tip: "V",
  //   teacher: "Malesevic Nenad",
  //   groups: ["3d1"],
  //   classrooms: ["U9"],
  //   duration: "3",
  // },
  // {
  //   subject: "Muzicka produkcija 3",
  //   tip: "P",
  //   teacher: "Ognjanovic Ivana",
  //   groups: ["3d1"],
  //   classrooms: ["Studio"],
  //   duration: "3",
  // },
  // {
  //   subject: "Muzicka produkcija 3",
  //   tip: "V",
  //   teacher: "Ognjanovic Ivana",
  //   groups: ["3d1"],
  //   classrooms: ["Studio"],
  //   duration: "3",
  // },
  // {
  //   subject: "Racunarska animacija",
  //   tip: "P",
  //   teacher: "Djuric Milan",
  //   groups: ["3d1"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Racunarska animacija",
  //   tip: "V",
  //   teacher: "Djuric Milan",
  //   groups: ["3d1"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Scenario i knjiga snimanja",
  //   tip: "P",
  //   teacher: "Stetin Darko",
  //   groups: ["3d1"],
  //   classrooms: ["U9"],
  //   duration: "3",
  // },
  // {
  //   subject: "Scenario i knjiga snimanja",
  //   tip: "V",
  //   teacher: "Stetin Darko",
  //   groups: ["3d1"],
  //   classrooms: ["U1", "U8"],
  //   duration: "2",
  // },
  // {
  //   subject: "Upravljanje i odrzavanje Windows Server okruzenja",
  //   tip: "P",
  //   teacher: "Lale Sinisa",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Upravljanje i odrzavanje Windows Server okruzenja",
  //   tip: "P",
  //   teacher: "Lale Sinisa",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Implementiranje Microsoft ISA servera",
  //   tip: "P",
  //   teacher: "Lale Sinisa",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Implementiranje Microsoft ISA servera",
  //   tip: "P",
  //   teacher: "Lale Sinisa",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Prakticne tehnike zastite u IP mrezama",
  //   tip: "P",
  //   teacher: "Bojovic Petar",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Prakticne tehnike zastite u IP mrezama",
  //   tip: "V",
  //   teacher: "Jankovski Ivan",
  //   groups: ["3s1"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Istorija racunarstva",
  //   tip: "P",
  //   teacher: "Zahorjanski Miroljub",
  //   groups: ["3s1", "3s2"],
  //   classrooms: ["U1", "U8"],
  //   duration: "2",
  // },
  // {
  //   subject: "Razvoj infrastrukture i servisa u oblaku",
  //   tip: "P",
  //   teacher: "Miletic Misa",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Razvoj infrastrukture i servisa u oblaku",
  //   tip: "V",
  //   teacher: "Miletic Misa",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Razvoj web aplikacija i servisa",
  //   tip: "P",
  //   teacher: "Markovic Nemanja",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Razvoj web aplikacija i servisa",
  //   tip: "P",
  //   teacher: "Markovic Nemanja",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Microsoft tehnologije za pristup podacima",
  //   tip: "P",
  //   teacher: "Milosavljevic Milos",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Microsoft tehnologije za pristup podacima",
  //   tip: "P",
  //   teacher: "Milosavljevic Milos",
  //   groups: ["3s2"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Konkurentni i distribuirani sistemi",
  //   tip: "V",
  //   teacher: "Milojkovic Branislav",
  //   groups: ["401"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Softversko inzenjerstvo",
  //   tip: "V",
  //   teacher: "Markovic Ana",
  //   groups: ["401"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "4",
  // },
  // {
  //   subject: "Softversko inzenjerstvo",
  //   tip: "P",
  //   teacher: "Perisic Branko",
  //   groups: ["401", "402"],
  //   classrooms: ["U1", "U8"],
  //   duration: "4",
  // },
  // {
  //   subject: "Teorija algoritama, automata i jezika",
  //   tip: "P",
  //   teacher: "Jovanovic Jelena",
  //   groups: ["401", "402"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Teorija algoritama, automata i jezika",
  //   tip: "V",
  //   teacher: "Tomic Milan",
  //   groups: ["401", "402"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Konkurentni i distribuirani sistemi",
  //   tip: "P",
  //   teacher: "Milinkovic Stevan",
  //   groups: ["401", "402", "405"],
  //   classrooms: ["U1", "U8"],
  //   duration: "3",
  // },
  // {
  //   subject: "Konkurentni i distribuirani sistemi",
  //   tip: "V",
  //   teacher: "Milojkovic Branislav",
  //   groups: ["402"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Softversko inzenjerstvo",
  //   tip: "V",
  //   teacher: "Markovic Ana",
  //   groups: ["402"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "4",
  // },
  // {
  //   subject: "Konkurentni i distribuirani sistemi",
  //   tip: "V",
  //   teacher: "Milojkovic Branislav",
  //   groups: ["405"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Digitalna obrada signala",
  //   tip: "P",
  //   teacher: "Babic Djorde",
  //   groups: ["405"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Digitalna obrada signala",
  //   tip: "V",
  //   teacher: "Jovanovic Miljana",
  //   groups: ["405"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Namenski racunarski sistemi",
  //   tip: "P",
  //   teacher: "Jovanovic Milos",
  //   groups: ["405"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
  // {
  //   subject: "Namenski racunarski sistemi",
  //   tip: "V",
  //   teacher: "Stambolovic Bogdana",
  //   groups: ["405"],
  //   classrooms: ["U3", "U4", "U5", "U7"],
  //   duration: "3",
  // },
];

module.exports = { teachers, groups, classrooms, classes };
