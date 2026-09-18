'use strict';

/* ============================================================
   THE STEPPE — app logic
   Sections:
   1. Data (quiz question banks + essay topics, per week)
   2. Helpers
   3. State & DOM references
   4. Navigation
   5. Quiz flow
   6. Essay flow + heuristic "AI" evaluation
   7. Email sending (EmailJS)
   ============================================================ */

/* ------------------------------------------------------------
   1. DATA
   ------------------------------------------------------------ */

const QUIZ_BANKS = {
  1: [
    { questionText: "Archaeologists divide the Stone Age into three main periods; the Mesolithic period corresponds to:", variants: ["12 - 5 thousand years BC", "5 - 3 thousand years BC", "40 - 12 thousand years BC", "140 - 40 thousand years BC"], rightAnswerIndex: 0 },
    { questionText: "Gathering in the Neolithic era was replaced by:", variants: ["fishing", "agriculture", "hunting", "animal husbandry"], rightAnswerIndex: 1 },
    { questionText: "The first metal mastered by humans was:", variants: ["Tin", "Bronze", "Iron", "Copper"], rightAnswerIndex: 3 },
    { questionText: "Name the stage of the Stone Age when people learned to make bronze?", variants: ["Paleolithic", "Neolithic", "Eneolithic", "Mesolithic"], rightAnswerIndex: 2 },
    { questionText: "Find the INCORRECT statement:", variants: ["Tools in the Stone Age were made of iron.", "In the Stone Age, people hunted and gathered berries.", "The Paleolithic is the first stage of the Stone Age.", "People drew on rocks, and these drawings show us what they did."], rightAnswerIndex: 0 },
    { questionText: "Why did the Stone Age get its name?", variants: ["At that time, people lived exclusively in stone caves", "Stone was the main material for making tools and weapons", "Due to global cooling, the entire earth was covered with stone boulders", "During this period, only giant stone megaliths existed on Earth"], rightAnswerIndex: 1 },
    { questionText: "The first form of human association was:", variants: ["patriarchal clan", "matriarchal clan", "tribe", "primitive herd"], rightAnswerIndex: 3 },
    { questionText: "The bow and arrows were invented during the period of:", variants: ["Neolithic", "Mesolithic", "Eneolithic", "Paleolithic"], rightAnswerIndex: 1 },
    { questionText: "The first stone tool of ancient humans was:", variants: ["Chopper", "Microlith", "Point", "Burin"], rightAnswerIndex: 0 },
    { questionText: "One of the main features of the Mesolithic era is the invention of:", variants: ["the loom", "the bow and arrows", "the potter's wheel", "the sickle"], rightAnswerIndex: 1 },
    { questionText: "An important discovery that enabled early humans to separate themselves from the animal world:", variants: ["emergence of speech", "manufacture of microliths", "manufacture of ceramic vessels", "use of fire"], rightAnswerIndex: 3 },
    { questionText: "The first humans to enter the territory of Kazakhstan were contemporaries of:", variants: ["Cro-Magnon", "Pithecanthropus", "Sinanthropus", "Neanderthal"], rightAnswerIndex: 1 },
    { questionText: "The primary activity of the Mesolithic era becomes:", variants: ["fishing", "gathering", "hunting", "animal husbandry"], rightAnswerIndex: 0 },
    { questionText: "Ancient people passed on their knowledge using a form of writing known as:", variants: ["cave painting", "watercolor", "pictography", "petroglyphs"], rightAnswerIndex: 2 },
    { questionText: "Hunting, gathering, and fishing were forms of:", variants: ["appropriative economy", "market-oriented economy", "productive economy", "subsistence economy"], rightAnswerIndex: 0 },
    { questionText: "The first humans appeared in the territory of Kazakhstan during the:", variants: ["Neolithic period", "Middle Paleolithic period", "Late Paleolithic period", "Early Paleolithic period"], rightAnswerIndex: 3 },
    { questionText: "The Eneolithic Botai culture developed in the territory of:", variants: ["Eastern Kazakhstan", "Northern Kazakhstan", "Southern Kazakhstan", "Central Kazakhstan"], rightAnswerIndex: 1 },
    { questionText: "Microliths appeared during the period:", variants: ["Late Paleolithic", "Mesolithic", "Middle Paleolithic", "Neolithic"], rightAnswerIndex: 1 },
    { questionText: "One of the most important achievements of the Neolithic era was production of:", variants: ["Ceramic tableware", "Microliths", "Bow", "Arrows"], rightAnswerIndex: 0 },
    { questionText: "Which type of activity of early humans can be classified as a productive economy?", variants: ["Hunting", "Trade", "Agriculture", "Animal Husbandry"], rightAnswerIndex: 2 },
    { questionText: "The first dwellings of early humans:", variants: ["caves", "dugouts", "log cabin", "yurts"], rightAnswerIndex: 0 },
    { questionText: "The oldest Lower Paleolithic sites in Kazakhstan were found in:", variants: ["Issyk", "Karatau", "Chilikty", "Tamgaly"], rightAnswerIndex: 1 },
    { questionText: "Pithecanthropus and Sinanthropus are classified as belonging to the human species:", variants: ["Homo habilis", "Homo sapiens", "Homo erectus", "Anatomically modern human"], rightAnswerIndex: 2 },
    { questionText: "A chopper is:", variants: ["type of spear", "arrows", "pebble sharpened on one side", "pebble sharpened on both sides"], rightAnswerIndex: 2 },
    { questionText: "A sharp cooling of the Earth occurred:", variants: ["100,000 years ago", "7,000 years ago", "5,000 years ago", "10,000 years ago"], rightAnswerIndex: 0 },
    { questionText: "What was the primary source of food for ancient Stone Age people?", variants: ["Agriculture and grain cultivation", "Hunting wild animals and gathering wild plants", "Fishing as the sole source of food", "Livestock farming"], rightAnswerIndex: 1 },
    { questionText: "What helped ancient people preserve food?", variants: ["Freezing", "Freeze-drying", "Salting and drying", "None"], rightAnswerIndex: 2 },
    { questionText: "Early Paleolithic:", variants: ["2.6 million – 140,000 years ago", "140,000 – 40,000 years ago", "40,000 – 12,000 years ago", "12,000–5,000 BC"], rightAnswerIndex: 0 },
    { questionText: "\"Following the initial discovery, extensive research was conducted in the cave, resulting in the discovery of the bones of approximately 40 individuals over a period of 10 years.\" This information relates to research on:", variants: ["Cro-Magnon", "Sinanthropus", "Australopithecus", "Pithecanthropus"], rightAnswerIndex: 1 },
    { questionText: "The reconstruction of a person's physical appearance is carried out by the following science:", variants: ["archaeology", "palaeography", "ethnography", "anthropology"], rightAnswerIndex: 3 },
  ],
  2: [
    { questionText: "The Saka lived during which period?", variants: ["The Middle Ages", "The Early Iron Age", "The Stone Age", "The Modern Era"], rightAnswerIndex: 1 },
    { questionText: "In which millennium BC did the Saka inhabit a significant part of the territory of Kazakhstan?", variants: ["The 3rd millennium BC", "The 2nd millennium AD", "The 1st millennium BC", "The 4th millennium BC"], rightAnswerIndex: 2 },
    { questionText: "When did the widespread use of iron begin in Kazakhstan?", variants: ["The 5th–4th centuries BC", "The 8th–7th centuries BC", "The 12th–11th centuries BC", "The 2nd–1st centuries AD"], rightAnswerIndex: 1 },
    { questionText: "What were the Saka who wore pointed headdresses called?", variants: ["Saka-haomavarga", "Sarmatians", "Saka-paradaraya", "Saka-tigrahauda"], rightAnswerIndex: 3 },
    { questionText: "What does the name “Saka-tigrahauda” mean?", variants: ["Saka wearing pointed hats", "Saka from beyond the sea", "Saka who used haoma", "Saka who lived in river valleys"], rightAnswerIndex: 0 },
    { questionText: "What were the Saka associated with the use of haoma called?", variants: ["Sauromatians", "Saka-paradaraya", "Saka-haomavarga", "Saka-tigrahauda"], rightAnswerIndex: 2 },
    { questionText: "What were the Saka who lived “beyond the sea” called according to Persian sources?", variants: ["Massagetae", "Saka-paradaraya", "Saka-tigrahauda", "Saka-haomavarga"], rightAnswerIndex: 1 },
    { questionText: "What did the ancient Greek historian Herodotus call the Saka?", variants: ["Huns", "Turks", "Wusun", "Scythians"], rightAnswerIndex: 3 },
    { questionText: "What type of economy was characteristic of many Saka tribes?", variants: ["Maritime trade", "Nomadic and semi-nomadic pastoralism", "Plantation agriculture", "Sea fishing"], rightAnswerIndex: 1 },
    { questionText: "Which artistic style is especially characteristic of Saka culture?", variants: ["Romanesque style", "Baroque", "Animal style", "Gothic style"], rightAnswerIndex: 2 },
    { questionText: "Who was Tomyris?", variants: ["Queen of the Massagetae", "Ruler of the Wusun", "Queen of the Kangju", "Priestess of the Saka-tigrahauda"], rightAnswerIndex: 0 },
    { questionText: "Which Persian king is associated with the war of Tomyris?", variants: ["Xerxes I", "Cambyses II", "Darius III", "Cyrus II"], rightAnswerIndex: 3 },
    { questionText: "Who, according to ancient sources, performed a heroic deed during Darius I’s campaign against the Saka?", variants: ["Spitamenes", "Shyrak", "Attila", "Tomyris"], rightAnswerIndex: 1 },
    { questionText: "What did Shyrak do during the Saka resistance against the Persian army?", variants: ["Founded a new state", "Captured the Persian capital", "Led the Persian army into a waterless steppe", "Led a naval battle"], rightAnswerIndex: 2 },
    { questionText: "What is characteristic of the Saka “animal style”?", variants: ["Images of animals and scenes of animals fighting", "Images of medieval castles", "Images of ships", "Images of ancient temples"], rightAnswerIndex: 0 },
    { questionText: "Where was the famous “Golden Man” found?", variants: ["In the Otrar settlement", "At the Botai settlement", "In the Saraychik settlement", "In the Issyk burial mound"], rightAnswerIndex: 3 },
    { questionText: "In what year was the “Golden Man” from the Issyk burial mound discovered?", variants: ["In 1978", "In 1969", "In 1956", "In 1985"], rightAnswerIndex: 1 },
    { questionText: "Who led the archaeological excavations of the Issyk burial mound?", variants: ["Karl Baipakov", "Alkey Margulan", "Kemal Akishev", "Zeynolla Samashev"], rightAnswerIndex: 2 },
    { questionText: "What was found together with the burial of the “Golden Man”?", variants: ["Medieval manuscripts", "Paleolithic stone tools", "Coins of the Russian Empire", "Rich burial goods and gold ornaments"], rightAnswerIndex: 3 },
    { questionText: "What indicates social inequality among the Saka tribes?", variants: ["A complete absence of burial goods", "Differences in the size of burial mounds and the richness of burials", "Identical burials for all people", "No differences in weapons"], rightAnswerIndex: 1 },
    { questionText: "What social groups were distinguished in Saka society?", variants: ["Warriors, priests, and community members", "Merchants, sailors, and slaves", "Peasants, feudal lords, and artisans", "Emperors, senators, and slaves"], rightAnswerIndex: 0 },
    { questionText: "What were the large burial structures of the Saka elite called?", variants: ["Mausoleums", "Fortification towers", "Royal burial mounds", "Settlements"], rightAnswerIndex: 2 },
    { questionText: "Which archaeological site is especially famous for its Saka burial mounds?", variants: ["Saraychik", "Besshatyr", "Otrar", "Turkistan"], rightAnswerIndex: 1 },
    { questionText: "Where are the famous Besshatyr burial mounds located?", variants: ["In Northern Kazakhstan", "In Mangystau", "In Western Kazakhstan", "In Zhetysu"], rightAnswerIndex: 3 },
    { questionText: "What is characteristic of the Tasmola culture?", variants: ["Pyramids", "Burial mounds with “moustaches”", "Brick mausoleums", "Underground palaces"], rightAnswerIndex: 1 },
    { questionText: "In which part of Kazakhstan was the Tasmola culture widespread?", variants: ["In Mangystau", "In Southern Kazakhstan", "In Central Kazakhstan", "In the Caspian region"], rightAnswerIndex: 2 },
    { questionText: "What were the “burial mounds with moustaches”?", variants: ["Stone fortresses", "Underground dwellings", "Ancient irrigation canals", "Burial structures with stone ridges extending from the mound"], rightAnswerIndex: 3 },
    { questionText: "Which metal became widely used in Kazakhstan during the Early Iron Age?", variants: ["Silver", "Iron", "Aluminum", "Tin"], rightAnswerIndex: 1 },
    { questionText: "What weapons were widely used by nomadic warriors of the Early Iron Age?", variants: ["Bows, arrows, and swords", "Firearms", "Crossbows and cannons", "Machine guns and spears"], rightAnswerIndex: 0 },
    { questionText: "Why are archaeological burial mounds important for studying the Early Iron Age?", variants: ["They contain documents from the Russian Empire", "They contain medieval books", "They contain weapons, ornaments, household items, and other archaeological artifacts", "They contain complete chronicles of all Saka tribes"], rightAnswerIndex: 2 }
  ],
  3: [
    { questionText: "In what year was the Turkic Khaganate established?", variants: ["603 AD", "552 AD", "704 AD", "756 AD"], rightAnswerIndex: 1 },
    { questionText: "Who is considered the founder of the Turkic Khaganate?", variants: ["Bumin Khagan", "Ton-Yabghu", "Suluk Khagan", "Satuk Bogra Khan"], rightAnswerIndex: 0 },
    { questionText: "In what year did the Turkic Khaganate split into the Eastern and Western Turkic Khaganates?", variants: ["552 AD", "704 AD", "603 AD", "756 AD"], rightAnswerIndex: 2 },
    { questionText: "What was the ethno-political core of the Western Turkic Khaganate called?", variants: ["“Nine Tribes”", "“Ten Tribes”", "“Twenty Tribes”", "“Three Tribes”"], rightAnswerIndex: 1 },
    { questionText: "Which two groups were part of the “Ten Tribes” of the Western Turkic Khaganate?", variants: ["Kipchaks and Oghuz", "Karluks and Kimeks", "Dulu and Nushibi", "Turgesh and Kyrgyz"], rightAnswerIndex: 2 },
    { questionText: "Which city was the capital of the Western Turkic Khaganate?", variants: ["Suyab", "Taraz", "Otrar", "Balasagun"], rightAnswerIndex: 0 },
    { questionText: "In which years did the Turgesh Khaganate exist?", variants: ["603–704 AD", "756–940 AD", "704–756 AD", "942–1212 AD"], rightAnswerIndex: 2 },
    { questionText: "Who founded the Turgesh Khaganate?", variants: ["Bumin Khagan", "Ush-Elik", "Satuk Bogra Khan", "Bilge Khagan"], rightAnswerIndex: 1 },
    { questionText: "Which Turgesh khagan is particularly known for fighting against the Arab conquests?", variants: ["Mukan", "Ton-Yabghu", "Suluk", "Satuk Bogra Khan"], rightAnswerIndex: 2 },
    { questionText: "In what year did the Battle of Talas take place?", variants: ["704 AD", "751 AD", "756 AD", "840 AD"], rightAnswerIndex: 1 },
    { questionText: "Between which forces did the Battle of Talas in 751 take place?", variants: ["The Turks and the Avars", "The Karakhanids and the Kipchaks", "Arab forces and the forces of the Tang dynasty", "The Oghuz and the Kimeks"], rightAnswerIndex: 2 },
    { questionText: "What role did the Karluks play in the Battle of Talas?", variants: ["They switched to the Arab side", "They left the territory of Kazakhstan", "They supported the Chinese forces until the end", "They did not participate in the battle"], rightAnswerIndex: 0 },
    { questionText: "In what year did the Turgesh Khaganate fall?", variants: ["704 AD", "751 AD", "840 AD", "756 AD"], rightAnswerIndex: 3 },
    { questionText: "Who established power in Zhetysu after the fall of the Turgesh Khaganate?", variants: ["The Kipchaks", "The Karluks", "The Oghuz", "The Kimeks"], rightAnswerIndex: 1 },
    { questionText: "In what year did the entire territory of Zhetysu come under the rule of the Karluk yabghu?", variants: ["766 AD", "704 AD", "840 AD", "940 AD"], rightAnswerIndex: 0 },
    { questionText: "In which years did the Karluk state exist?", variants: ["704–756 AD", "840–940 AD", "756–940 AD", "942–1212 AD"], rightAnswerIndex: 2 },
    { questionText: "Which cities came under the rule of the Karluk yabghu in 766?", variants: ["Otrar and Sauran", "Taraz and Suyab", "Balasagun and Kashgar", "Isfijab and Yangikent"], rightAnswerIndex: 1 },
    { questionText: "In what year did the Karluk Khaganate cease to exist?", variants: ["840 AD", "940 AD", "960 AD", "999 AD"], rightAnswerIndex: 1 },
    { questionText: "Which city was the capital of the Oghuz State?", variants: ["Suyab", "Balasagun", "Yangikent", "Taraz"], rightAnswerIndex: 2 },
    { questionText: "What title did the supreme ruler of the Oghuz State have?", variants: ["Khagan", "Yabghu", "Shad", "Khan"], rightAnswerIndex: 1 },
    { questionText: "According to historical sources, how many tribes did the Oghuz consist of?", variants: ["10", "12", "24", "40"], rightAnswerIndex: 2 },
    { questionText: "Where was the main area of settlement of the Kimeks?", variants: ["Northeastern and Central Kazakhstan", "Only Southern Kazakhstan", "Western Zhetysu", "The Caspian Lowland"], rightAnswerIndex: 0 },
    { questionText: "What was the capital of the Kimek Khaganate called?", variants: ["Suyab", "Imakia", "Yangikent", "Balasagun"], rightAnswerIndex: 1 },
    { questionText: "How many appanages were there in the Kimek Khaganate?", variants: ["7", "10", "12", "24"], rightAnswerIndex: 2 },
    { questionText: "What title did the ruler of the Kimeks have?", variants: ["Yabghu, later khagan", "Only khan", "Sultan", "Bek"], rightAnswerIndex: 0 },
    { questionText: "In which years did the Karakhanid state exist according to E-history.kz?", variants: ["756–940 AD", "840–1040 AD", "942–1212 AD", "1128–1213 AD"], rightAnswerIndex: 2 },
    { questionText: "Which city was the capital of the Karakhanid state?", variants: ["Yangikent", "Balasagun", "Imakia", "Suyab"], rightAnswerIndex: 1 },
    { questionText: "In what year was Islam declared the state religion of the Karakhanid state?", variants: ["751 AD", "840 AD", "942 AD", "960 AD"], rightAnswerIndex: 3 },
    { questionText: "Who is the author of the work “Kutadgu Bilig” (“The Wisdom of Royal Glory”)?", variants: ["Mahmud al-Kashgari", "Yusuf Balasaguni", "Al-Farabi", "Ahmed Yugnaki"], rightAnswerIndex: 1 },
    { questionText: "What was the name of Mahmud al-Kashgari’s work devoted to Turkic languages and dialects?", variants: ["“Kutadgu Bilig”", "“Diwan-i Hikmet”", "“Dīwān Lughāt al-Turk”", "“Tarikh-i Rashidi”"], rightAnswerIndex: 2 }
  ],
};

const ESSAY_TOPICS = {
  1: [
    { text: "1. Introduction to the course \u201cHistory of Kazakhstan\u201d: goals, objectives, and significance.", minChars: 1000, keywords: ["history", "Kazakhstan", "course", "sources", "significance", "methodology"] },
    { text: "2. Periodization of the history of Kazakhstan.", minChars: 1200, keywords: ["periodization", "Stone Age", "Bronze Age", "Iron Age", "chronology", "epoch"] },
    { text: "3. Stone Age in Kazakhstan: Paleolithic, Mesolithic, Neolithic, Eneolithic.", minChars: 1800, keywords: ["Paleolithic", "Mesolithic", "Neolithic", "Eneolithic", "tools", "hunting", "gathering"] },
    { text: "4. Neolithic Revolution and its global and local importance.", minChars: 1569, keywords: ["agriculture", "animal husbandry", "domestication", "productive economy", "revolution"] },
    { text: "5. Botai culture and the domestication of the horse.", minChars: 1567, keywords: ["Botai", "horse", "domestication", "Northern Kazakhstan", "Eneolithic"] },
    { text: "6. Bronze Age in Kazakhstan: Andronovo and Begazy\u2013Dandybai cultures.", minChars: 1788, keywords: ["Andronovo", "Begazy-Dandybai", "bronze", "metallurgy", "culture"] },
    { text: "7. Origins of nomadic civilization in the steppe.", minChars: 1679, keywords: ["nomad", "nomadic", "steppe", "pastoralism", "mobility", "herding"] },
  ],
  2: [
    { text: "1. The socio-political history of the Saka tribes: territory, economy, and governance.", minChars: 1400, keywords: ["Saka", "territory", "economy", "governance", "tribal", "political"] },
    { text: "2. The culture of the Saks: animal style art, burial traditions, and spiritual beliefs.", minChars: 1400, keywords: ["Saka", "animal style", "burial", "kurgan", "spiritual", "art"] },
    { text: "3. The political history of the Hun Empire in Central Asia.", minChars: 1400, keywords: ["Hun", "Xiongnu", "empire", "Central Asia", "political", "confederation"] },
    { text: "4. The socio-political history of the Usuns, Kangly, and Sarmatians: role in regional dynamics and ethnogenesis.", minChars: 1500, keywords: ["Usun", "Wusun", "Kangly", "Kangju", "Sarmatians", "ethnogenesis"] },
    { text: "5. The Early Iron Age as the foundation of the nomadic civilization in Kazakhstan.", minChars: 1400, keywords: ["Iron Age", "nomadic", "civilization", "Kazakhstan", "foundation"] },
  ],
  3: [
    { text: "1. The establishment of the Great Turkic Khaganate: origins, rise, and consolidation of power.", minChars: 1500, keywords: ["Turkic Khaganate", "origins", "khagan", "6th century", "power"] },
    { text: "2. External relations of the Turkic Khaganates: Byzantium, Iran, and China.", minChars: 1500, keywords: ["Byzantium", "Iran", "China", "diplomacy", "Turkic Khaganate"] },
    {
      minChars: 1550,
      // One topic, several possible angles — a random one is assigned, same as the source list.
      subtopics: [
        { text: "3. The political history of the Western Turkic Khaganate (On-Ok, \u201cTen Arrows\u201d).", keywords: ["Western Turkic Khaganate", "On-Ok", "Ten Arrows"] },
        { text: "3. The political history of the Turgesh Khaganate and the Battle of Talas (751).", keywords: ["Turgesh", "Battle of Talas", "751", "Tang", "Abbasid"] },
        { text: "3. The political history of the Karakhanid dynasty (Islamization, urban development).", keywords: ["Karakhanid", "Islamization", "urban development", "dynasty"] },
        { text: "3. The political history of the Kipchak Khanate (Desht-i Kipchak, role in Eurasian politics).", keywords: ["Kipchak", "Desht-i Kipchak", "Eurasian politics", "khanate"] },
      ],
    },
    { text: "4. The Great Silk Road: its role in economy, urbanization, and cultural exchange.", minChars: 1500, keywords: ["Silk Road", "economy", "urbanization", "cultural exchange", "trade"] },
    { text: "5. The Muslim Renaissance in Central Asia and outstanding Turkic scholars.", minChars: 1500, keywords: ["Muslim Renaissance", "Central Asia", "scholars", "al-Farabi", "science"] },
  ],
};

function resolveEssayTopic(rawTopic) {
  if (rawTopic.subtopics) {
    const sub = pickRandom(rawTopic.subtopics);
    return { text: sub.text, minChars: rawTopic.minChars, keywords: sub.keywords };
  }
  return rawTopic;
}

const QUIZ_QUESTIONS_PER_SESSION = 10;
const QUESTION_TIME_SECONDS = 30;
const FEEDBACK_DELAY_MS = 1300;
const ESSAY_TOTAL_MINUTES = 30;

/* ------------------------------------------------------------
   2. HELPERS
   ------------------------------------------------------------ */

function $(id) {
  return document.getElementById(id);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clampNum(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function starString(score0to100) {
  const stars = clampNum(Math.round(score0to100 / 20), 1, 5);
  return '\u2605'.repeat(stars) + '\u2606'.repeat(5 - stars);
}

/* ------------------------------------------------------------
   3. STATE & DOM
   ------------------------------------------------------------ */

const state = {
  mode: null,        // 'quiz' | 'essay'
  week: null,        // 1 | 2 | 3
  userName: '',
  history: ['home'], // simple navigation stack of screen keys
};

const screens = {
  home: $('mainbox-home-screen'),
  weekSelect: $('mainbox-week-screen'),
  nameEntry: $('mainbox-start-screen'),
  info: $('mainbox-info-screen'),
  essayWrite: $('mainbox-essey-test-screen'),
  essayResult: $('mainbox-essay-result-screen'),
  quiz: $('mainbox-questions-screen'),
  quizResult: $('mainbox-result-answer-screen'),
};

const headerBackBtn = $('button-back');
const headerInfoBtn = $('button-info2');
const headerExitBtn = $('button-exit');
const topicTimerBox = $('div-topic-timer');

const homeButtons = document.querySelectorAll('.button-home');
const weekButtons = document.querySelectorAll('.button-week');
const weekTitle = $('week-select-title');
const weekSubtitle = $('week-select-subtitle');

const nameLabel = $('p-YN');
const nameInput = $('input-user-name');
const startButton = $('button-start');

/* ------------------------------------------------------------
   4. NAVIGATION
   ------------------------------------------------------------ */

function fitScreen(el) {
  if (!el) return;
  requestAnimationFrame(() => {
    const tooTall = el.scrollHeight > window.innerHeight;
    el.classList.toggle('tall-content', tooTall);
  });
}

function showScreen(key, { pushHistory = true } = {}) {
  Object.values(screens).forEach((el) => {
    if (el) el.style.display = 'none';
  });

  const target = screens[key];
  if (target) {
    target.style.display = 'grid';
    fitScreen(target);
  }

  // Header buttons
  headerBackBtn.style.display = key === 'home' ? 'none' : 'flex';
  headerInfoBtn.style.display = key === 'home' ? 'flex' : 'none';
  headerExitBtn.style.display = (key === 'quiz' || key === 'essayWrite') ? 'flex' : 'none';
  topicTimerBox.style.display = key === 'essayWrite' ? 'flex' : 'none';

  if (pushHistory) {
    state.history.push(key);
  }
}

function goHome() {
  stopQuizTimer();
  stopEssayTimer();
  resetQuizState();
  resetEssayState();
  state.mode = null;
  state.week = null;
  state.history = ['home'];
  showScreen('home', { pushHistory: false });
}

function goBack() {
  // From active tests, "back" behaves like a soft exit (with reset), since
  // resuming mid-test isn't meaningful.
  const current = state.history[state.history.length - 1];
  if (current === 'quiz' || current === 'essayWrite') {
    goHome();
    return;
  }

  state.history.pop();
  const prev = state.history[state.history.length - 1] || 'home';
  if (prev === 'home') {
    goHome();
  } else {
    showScreen(prev, { pushHistory: false });
  }
}

headerBackBtn.addEventListener('click', goBack);
headerExitBtn.addEventListener('click', goHome);

headerInfoBtn.addEventListener('click', () => {
  showScreen('info');
});

homeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.mode = btn.dataset.mode; // 'quiz' | 'essay'
    weekTitle.textContent = state.mode === 'quiz' ? 'Choose a quiz week' : 'Choose an essay week';
    weekSubtitle.textContent = state.mode === 'quiz'
      ? 'Each week draws random questions from a themed bank.'
      : 'Each week assigns a random topic from that week\u2019s list.';
    showScreen('weekSelect');
  });
});

weekButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.week = Number(btn.dataset.week);
    nameLabel.textContent = 'Your name';
    nameInput.value = '';
    nameInput.placeholder = 'Please enter your name...';
    nameInput.style.borderColor = '';
    showScreen('nameEntry');
  });
});

nameInput.addEventListener('input', () => {
  nameInput.style.borderColor = '';
  nameInput.placeholder = 'Please enter your name...';
});

startButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.value = '';
    nameInput.placeholder = 'NO! Your name?';
    nameInput.style.borderColor = '#e74c3c';
    return;
  }
  state.userName = name;

  if (state.mode === 'quiz') {
    startQuiz();
  } else {
    startEssay();
  }
});

/* ------------------------------------------------------------
   5. QUIZ FLOW
   ------------------------------------------------------------ */

const quizTitleBox = $('div-title-question');
const questionCurrentEl = $('q-current');
const questionTotalEl = $('q-total');
const timerAnswersEl = $('timer-answers');
const liveScoreEl = $('live-score');
const questionTitleEl = $('text-question');
const answersContainer = $('div-options-answers');
const feedbackEl = $('quiz-feedback');

const totalScoreText = $('p-result-answers');
const mistakesBox = $('div-incorrect-answers');
const quizRatingBox = $('quiz-rating');

let quizSessionQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizTimeLeft = QUESTION_TIME_SECONDS;
let quizTimerId = null;
let quizAllAnswers = [];
let quizLocked = false;

function resetQuizState() {
  clearInterval(quizTimerId);
  quizTimerId = null;
  quizSessionQuestions = [];
  quizIndex = 0;
  quizScore = 0;
  quizTimeLeft = QUESTION_TIME_SECONDS;
  quizAllAnswers = [];
  quizLocked = false;
  if (feedbackEl) {
    feedbackEl.className = '';
    feedbackEl.textContent = '';
  }
}

function startQuiz() {
  resetQuizState();
  const bank = QUIZ_BANKS[state.week] || [];
  const count = Math.min(QUIZ_QUESTIONS_PER_SESSION, bank.length);
  quizSessionQuestions = shuffle(bank).slice(0, count).map((q) => {
    const order = shuffle(q.variants.map((text, i) => ({ text, isCorrect: i === q.rightAnswerIndex })));
    return { questionText: q.questionText, options: order };
  });

  questionTotalEl.textContent = String(quizSessionQuestions.length);
  liveScoreEl.textContent = '0';

  showScreen('quiz');
  loadQuizQuestion();
}

function stopQuizTimer() {
  clearInterval(quizTimerId);
  quizTimerId = null;
}

function loadQuizQuestion() {
  if (quizIndex >= quizSessionQuestions.length) {
    showQuizResults();
    return;
  }

  quizLocked = false;
  feedbackEl.className = '';
  feedbackEl.textContent = '';

  stopQuizTimer();
  quizTimeLeft = QUESTION_TIME_SECONDS;
  timerAnswersEl.textContent = String(quizTimeLeft);
  startQuizTimer();

  const q = quizSessionQuestions[quizIndex];
  questionCurrentEl.textContent = String(quizIndex + 1);
  questionTitleEl.textContent = q.questionText;

  answersContainer.innerHTML = '';
  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opt.text;
    btn.classList.add('button-quiz');
    btn.addEventListener('click', () => handleQuizAnswer(opt, btn));
    answersContainer.appendChild(btn);
  });
}

function startQuizTimer() {
  quizTimerId = setInterval(() => {
    quizTimeLeft--;
    timerAnswersEl.textContent = String(quizTimeLeft);
    if (quizTimeLeft <= 0) {
      stopQuizTimer();
      handleQuizAnswer(null, null);
    }
  }, 1000);
}

function handleQuizAnswer(chosenOption, chosenBtn) {
  if (quizLocked) return;
  quizLocked = true;
  stopQuizTimer();

  const q = quizSessionQuestions[quizIndex];
  const correctOption = q.options.find((o) => o.isCorrect);
  const isCorrect = !!chosenOption && chosenOption.isCorrect;

  // Disable & visually mark all buttons
  Array.from(answersContainer.children).forEach((btn) => {
    btn.disabled = true;
    const matchesText = btn.textContent === correctOption.text;
    if (matchesText) {
      btn.classList.add('answer-correct');
    }
    if (chosenBtn && btn === chosenBtn && !isCorrect) {
      btn.classList.add('answer-incorrect');
    }
  });

  if (isCorrect) {
    quizScore++;
    liveScoreEl.textContent = String(quizScore);
    feedbackEl.textContent = 'Correct! +1 point';
    feedbackEl.className = 'show correct';
  } else {
    feedbackEl.textContent = chosenOption
      ? `Incorrect. Correct answer: ${correctOption.text}`
      : `Time's up! Correct answer: ${correctOption.text}`;
    feedbackEl.className = 'show incorrect';
  }

  quizAllAnswers.push({
    question: q.questionText,
    userAnswerText: chosenOption ? chosenOption.text : "Time's up",
    correctAnswerText: correctOption.text,
    isUserRight: isCorrect,
  });

  quizIndex++;
  setTimeout(loadQuizQuestion, FEEDBACK_DELAY_MS);
}

function showQuizResults() {
  showScreen('quizResult');

  totalScoreText.textContent = `${quizScore} / ${quizSessionQuestions.length}`;

  const percent = quizSessionQuestions.length
    ? Math.round((quizScore / quizSessionQuestions.length) * 100)
    : 0;

  quizRatingBox.innerHTML = `
    <div class="rating-box">
      <div class="rating-stars">${starString(percent)}</div>
      <div class="rating-label">${percent}% correct</div>
    </div>
  `;

  mistakesBox.innerHTML = '';
  const errorList = quizAllAnswers.filter((item) => !item.isUserRight);

  if (errorList.length === 0) {
    mistakesBox.innerHTML = '<p class="incorrect-answers-list">Perfect! Not a single mistake.</p>';
  } else {
    errorList.forEach((err) => {
      const card = document.createElement('div');
      card.classList.add('incorrect-answers-list');
      card.innerHTML = `
        <p><b>${err.question}</b></p>
        <p class="answer-red">Your answer: ${err.userAnswerText}</p>
        <p class="answer-green">Correct answer: ${err.correctAnswerText}</p>
      `;
      mistakesBox.appendChild(card);
    });
  }

  fitScreen(screens.quizResult);
  sendQuizResultsByEmail(percent);
}

/* ------------------------------------------------------------
   6. ESSAY FLOW + heuristic "AI" evaluation
   ------------------------------------------------------------ */

const topicTimerText = $('p-topic-timer');
const topicTextEl = $('p-topic-text');
const essayInput = $('input-topic-input');
const essaySaveButton = $('button-save-and-exit');
const charCounterEl = $('essay-char-counter');
const langWarningEl = $('lang-warning');

let isWrongLanguage = false;

function checkEssayLanguage() {
  const text = essayInput.value;
  const cyrillicCount = (text.match(/[\u0400-\u04FF]/g) || []).length;
  const latinCount = (text.match(/[A-Za-z]/g) || []).length;
  const totalLetters = cyrillicCount + latinCount;

  // Only judge once there's enough text to be meaningful; ignore a couple of stray characters.
  if (totalLetters < 8) {
    isWrongLanguage = false;
  } else {
    const cyrillicRatio = cyrillicCount / totalLetters;
    isWrongLanguage = cyrillicRatio > 0.15;
  }

  langWarningEl.style.display = isWrongLanguage ? 'block' : 'none';
  essaySaveButton.disabled = isWrongLanguage;
}

let essayTopic = null;
let essaySecondsLeft = ESSAY_TOTAL_MINUTES * 60;
let essayTimerId = null;
let essayErrorShown = false;

function resetEssayState() {
  clearInterval(essayTimerId);
  essayTimerId = null;
  essayTopic = null;
  essaySecondsLeft = ESSAY_TOTAL_MINUTES * 60;
  essayErrorShown = false;
  isWrongLanguage = false;
  if (essayInput) essayInput.value = '';
  if (charCounterEl) {
    charCounterEl.textContent = '';
    charCounterEl.style.color = '';
  }
  if (langWarningEl) langWarningEl.style.display = 'none';
  if (essaySaveButton) essaySaveButton.disabled = false;
  if (topicTimerText) topicTimerText.textContent = '';
}

function startEssay() {
  resetEssayState();
  const topics = ESSAY_TOPICS[state.week] || [];
  essayTopic = resolveEssayTopic(pickRandom(topics));

  topicTextEl.textContent = essayTopic.text;
  updateCharCounter();
  updateEssayClock();

  showScreen('essayWrite');

  essayTimerId = setInterval(() => {
    essaySecondsLeft--;
    if (essaySecondsLeft <= 0) {
      clearInterval(essayTimerId);
      finishEssay(true);
    } else {
      updateEssayClock();
    }
  }, 1000);
}

function stopEssayTimer() {
  clearInterval(essayTimerId);
  essayTimerId = null;
}

function updateEssayClock() {
  const mins = Math.floor(essaySecondsLeft / 60);
  const secs = essaySecondsLeft % 60;
  topicTimerText.textContent = `${mins}:${String(secs).padStart(2, '0')} left`;
}

function updateCharCounter() {
  if (!essayInput || essayErrorShown) return;
  const len = essayInput.value.length;
  const min = essayTopic ? essayTopic.minChars : 0;
  charCounterEl.textContent = `Characters: ${len} / min ${min}`;
  charCounterEl.style.color = len < min ? '#e74c3c' : '#2ecc71';
}

essayInput.addEventListener('input', () => {
  essayErrorShown = false;
  updateCharCounter();
  checkEssayLanguage();
});

essaySaveButton.addEventListener('click', () => {
  if (isWrongLanguage) return;
  const text = essayInput.value.trim();
  if (essayTopic && text.length < essayTopic.minChars) {
    essayErrorShown = true;
    charCounterEl.textContent = `Text is too short! Minimum ${essayTopic.minChars} characters required.`;
    charCounterEl.style.color = '#ff0000';
    return;
  }
  stopEssayTimer();
  finishEssay(false);
});

function analyzeEssay(text, topic) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length || 1;

  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const meanLen = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
  const variance = sentenceLengths.reduce((a, l) => a + Math.pow(l - meanLen, 2), 0) / (sentenceLengths.length || 1);
  const burstiness = Math.sqrt(variance) / (meanLen || 1);

  const personalMarkers = (text.match(/\b(i think|in my opinion|i believe|for example|however|moreover|therefore|because|personally|arguably)\b/gi) || []).length;

  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^\wа-яё]/gi, ''))).size;
  const diversityRatio = uniqueWords / wordCount;

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).length || 1;

  const textLower = text.toLowerCase();
  const keywordHits = topic.keywords.filter((k) => textLower.includes(k.toLowerCase())).length;
  const keywordRatio = keywordHits / topic.keywords.length;
  const numberHits = (text.match(/\b\d{1,4}\b/g) || []).length;

  const humanity = clampNum(40 + burstiness * 35 + Math.min(personalMarkers, 6) * 4, 5, 100);
  const relevance = clampNum(keywordRatio * 70 + Math.min(wordCount / 200, 1) * 30, 5, 100);
  const factCheck = clampNum(keywordRatio * 60 + Math.min(numberHits, 10) * 4, 5, 100);
  const depth = clampNum(
    Math.min(wordCount / (topic.minChars / 5.5), 1) * 55 + diversityRatio * 100 * 0.3 + Math.min(paragraphs, 5) * 3,
    5, 100
  );

  const overall = Math.round((humanity + relevance + factCheck + depth) / 4);

  return {
    humanity: Math.round(humanity),
    relevance: Math.round(relevance),
    factCheck: Math.round(factCheck),
    depth: Math.round(depth),
    overall,
  };
}

function metricRow(label, value) {
  return `
    <div class="metric-row">
      <div class="metric-top"><span>${label}</span><span>${value}/100</span></div>
      <div class="metric-bar"><div class="metric-fill" style="width:${value}%"></div></div>
    </div>
  `;
}

let essayEvaluation = null;

function finishEssay(isTimeout) {
  const text = essayInput.value.trim();
  essayEvaluation = analyzeEssay(text || ' ', essayTopic);

  const totalSecSpent = (ESSAY_TOTAL_MINUTES * 60) - essaySecondsLeft;
  const minSpent = Math.floor(totalSecSpent / 60);
  const secSpent = totalSecSpent % 60;

  showScreen('essayResult');

  screens.essayResult.innerHTML = `
    <div class="essay-result-card card">
      <h2>${isTimeout ? "Time's up!" : 'Essay submitted!'}</h2>
      <p class="status-line" style="color:${isTimeout ? '#c0392b' : '#219150'}">
        ${isTimeout ? 'Your text was auto-submitted.' : 'Sent for review.'}
      </p>
      <p>Time spent: ${minSpent} min ${secSpent} sec of ${ESSAY_TOTAL_MINUTES} min.</p>

      <div class="rating-box">
        <div class="rating-stars">${starString(essayEvaluation.overall)}</div>
        <div class="rating-label">Automated estimate: ${essayEvaluation.overall}/100</div>
      </div>

      <div class="essay-metrics">
        ${metricRow('Humanity (natural writing style)', essayEvaluation.humanity)}
        ${metricRow('Fact density', essayEvaluation.factCheck)}
        ${metricRow('Relevance to topic', essayEvaluation.relevance)}
        ${metricRow('Depth of analysis', essayEvaluation.depth)}
      </div>

      <p class="ai-disclaimer">
        These scores are computed locally with automated heuristics (keyword coverage,
        vocabulary variety, sentence rhythm, length vs. topic requirement) — they are
        an approximate guide, not a verified fact-check, and don't replace review by
        your instructor. Your essay has also been sent by email for full evaluation.
      </p>
    </div>
  `;

  fitScreen(screens.essayResult);
  sendEssayByEmail(isTimeout, minSpent, secSpent, text);
}

/* ------------------------------------------------------------
   7. EMAIL SENDING (EmailJS)
   ------------------------------------------------------------ */

const EMAILJS_PUBLIC_KEY = 'DW-Jj4ycqGVNavWjm';
const EMAILJS_SERVICE_ID = 'service_85hg4vd';
const EMAILJS_ESSAY_TEMPLATE = 'template_kaq9ryn';
const EMAILJS_QUIZ_TEMPLATE = 'template_2kl6bzf';
const NOTIFY_EMAIL = 'karpukhin.adam@gmail.com';

function emailAvailable() {
  return typeof emailjs !== 'undefined';
}

function sendEssayByEmail(isTimeoutFlag, minSpent, secSpent, essayText) {
  if (!emailAvailable()) return;

  const htmlEssayDetails = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fdfdfd;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #27ae60; padding-bottom: 8px; margin-top: 0;">Essay Submission Report</h2>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Student Name:</strong> <span style="color: #2980b9;">${state.userName}</span></p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Week:</strong> ${state.week}</p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Essay Topic:</strong> <em>"${essayTopic.text}"</em></p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Time Spent:</strong> ${minSpent} min ${secSpent}s of ${ESSAY_TOTAL_MINUTES} min</p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Status:</strong> <span style="color: ${isTimeoutFlag ? '#e74c3c' : '#27ae60'}; font-weight: bold;">${isTimeoutFlag ? "Time's up" : 'Submitted'}</span></p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Automated estimate:</strong> ${essayEvaluation.overall}/100
        (Humanity ${essayEvaluation.humanity}, Fact density ${essayEvaluation.factCheck}, Relevance ${essayEvaluation.relevance}, Depth ${essayEvaluation.depth})</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <h3 style="color: #34495e; margin-bottom: 8px;">Submitted Text:</h3>
      <div style="background-color: #f9f9f9; border-left: 4px solid #3498db; padding: 15px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #555; white-space: pre-wrap;">${essayText || 'No text was entered.'}</div>
    </div>
  `;

  const mailParams = {
    to_email: NOTIFY_EMAIL,
    user_name: state.userName,
    topic: essayTopic.text,
    essay_text: htmlEssayDetails,
    time_spent: `${minSpent} min ${secSpent}s of ${ESSAY_TOTAL_MINUTES}`,
    status: isTimeoutFlag ? "Time's up" : 'Submitted',
  };

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ESSAY_TEMPLATE, mailParams)
      .then(() => console.log('Essay email sent.'))
      .catch((err) => console.log('Essay email error:', err));
  } catch (err) {
    console.log('Essay email error:', err);
  }
}

function sendQuizResultsByEmail(percent) {
  if (!emailAvailable()) return;

  let htmlDetails = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">`;
  htmlDetails += `<h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">Quiz Report</h2>`;
  htmlDetails += `<p style="font-size: 16px;"><strong>Player Name:</strong> ${state.userName}</p>`;
  htmlDetails += `<p style="font-size: 16px;"><strong>Week:</strong> ${state.week}</p>`;
  htmlDetails += `<p style="font-size: 16px;"><strong>Total Score:</strong> <span style="color: #2980b9; font-weight: bold;">${quizScore} / ${quizSessionQuestions.length} (${percent}%)</span></p>`;
  htmlDetails += `<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">`;

  quizAllAnswers.forEach((item, index) => {
    const color = item.isUserRight ? '#27ae60' : '#c0392b';
    const bg = item.isUserRight ? '#e8f8f5' : '#f9ebea';
    const status = item.isUserRight ? 'Correct' : 'Incorrect';
    htmlDetails += `
      <div style="background-color: ${bg}; border-left: 5px solid ${color}; padding: 12px 15px; margin-bottom: 15px; border-radius: 4px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #7f8c8d;"><strong>Question ${index + 1}</strong></p>
        <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: bold; color: #2c3e50;">${item.question}</p>
        <p style="margin: 0 0 5px 0; font-size: 14px;">
          <strong>User's Answer:</strong>
          <span style="color: ${color}; font-weight: bold;">${item.userAnswerText} (${status})</span>
        </p>
        ${!item.isUserRight ? `<p style="margin: 0; font-size: 14px; color: #27ae60;"><strong>Correct Answer:</strong> ${item.correctAnswerText}</p>` : ''}
      </div>
    `;
  });
  htmlDetails += `</div>`;

  const quizMailParams = {
    to_email: NOTIFY_EMAIL,
    user_name: state.userName,
    total_score: `${quizScore} / ${quizSessionQuestions.length} (${percent}%)`,
    quiz_details: htmlDetails,
    status: 'Quiz Completed',
  };

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_QUIZ_TEMPLATE, quizMailParams)
      .then(() => console.log('Quiz email sent.'))
      .catch((err) => console.log('Quiz email error:', err));
  } catch (err) {
    console.log('Quiz email error:', err);
  }
}

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */

window.addEventListener('resize', () => {
  const currentKey = state.history[state.history.length - 1] || 'home';
  fitScreen(screens[currentKey]);
});

showScreen('home', { pushHistory: false });
