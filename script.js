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
  // Week 4 — "The Great Steppe and the Golden Horde"
  4: [
    { questionText: "Who founded the Golden Horde?", variants: ["Genghis Khan", "Batu Khan", "Timur", "Abulkhair Khan"], rightAnswerIndex: 1 },
    { questionText: "In which century was the Golden Horde established?", variants: ["11th century", "12th century", "13th century", "15th century"], rightAnswerIndex: 2 },
    { questionText: "Who was Batu Khan?", variants: ["Son of Genghis Khan", "Grandson of Genghis Khan", "Brother of Timur", "Ruler of the Karakhanid state"], rightAnswerIndex: 1 },
    { questionText: "What was the original name of the Golden Horde?", variants: ["Ulus of Jochi", "Chagatai Khanate", "Ilkhanate", "Turkic Khaganate"], rightAnswerIndex: 0 },
    { questionText: "Which son of Genghis Khan inherited the western part of the Mongol Empire?", variants: ["Chagatai", "Ogedei", "Jochi", "Tolui"], rightAnswerIndex: 2 },
    { questionText: "What was the main territory of the Golden Horde?", variants: ["Western Europe", "Eastern Asia", "The Great Steppe and Eastern Europe", "India and Persia"], rightAnswerIndex: 2 },
    { questionText: "What was the capital of the Golden Horde under Batu Khan?", variants: ["Sarai-Batu", "Samarkand", "Otrar", "Turkistan"], rightAnswerIndex: 0 },
    { questionText: "Where was Sarai-Batu located?", variants: ["Near the Volga River", "Near the Irtysh River", "Near the Amu Darya", "Near Lake Balkhash"], rightAnswerIndex: 0 },
    { questionText: "Which river became an important economic and political center of the Golden Horde?", variants: ["Irtysh", "Volga", "Syr Darya", "Chu"], rightAnswerIndex: 1 },
    { questionText: "What was the main economic activity of the steppe population?", variants: ["Maritime trade", "Nomadic pastoralism", "Mining", "Fishing"], rightAnswerIndex: 1 },
    { questionText: "Which city became the second major capital of the Golden Horde?", variants: ["Sarai-Batu", "Sarai-Berke", "Balasagun", "Taraz"], rightAnswerIndex: 1 },
    { questionText: "Which khan is associated with the strengthening and Islamization of the Golden Horde?", variants: ["Batu Khan", "Berke Khan", "Uzbek Khan", "Tokhtamysh"], rightAnswerIndex: 2 },
    { questionText: "Which religion became dominant in the Golden Horde during the reign of Uzbek Khan?", variants: ["Christianity", "Buddhism", "Islam", "Zoroastrianism"], rightAnswerIndex: 2 },
    { questionText: "Which khan was one of the first rulers of the Golden Horde to convert to Islam?", variants: ["Berke Khan", "Batu Khan", "Mongke", "Jochi"], rightAnswerIndex: 0 },
    { questionText: "What was the main purpose of the yam system?", variants: ["Collecting taxes", "Organizing postal and communication routes", "Training soldiers", "Building fortresses"], rightAnswerIndex: 1 },
    { questionText: "What was the term for a tax or tribute collected by Mongol authorities?", variants: ["Iqta", "Yasak", "Tamga", "Dinar"], rightAnswerIndex: 1 },
    { questionText: "Which battle in 1240 marked the capture of Kyiv by Batu's forces?", variants: ["Battle of Talas", "Siege of Kyiv", "Battle of Kulikovo", "Battle of Ankara"], rightAnswerIndex: 1 },
    { questionText: "What was the main political system of the Golden Horde based on?", variants: ["Democracy", "Tribal and military administration", "Parliamentary monarchy", "City-states"], rightAnswerIndex: 1 },
    { questionText: "What was a \u201culus\u201d?", variants: ["A religious building", "A military weapon", "A territory or domain belonging to a member of the Genghisid dynasty", "A type of tax"], rightAnswerIndex: 2 },
    { questionText: "Which language increasingly spread among the population of the Golden Horde?", variants: ["Latin", "Old Russian", "Kipchak Turkic", "Chinese"], rightAnswerIndex: 2 },
    { questionText: "What was one important consequence of Mongol rule for the Great Steppe?", variants: ["Complete disappearance of trade", "Development of long-distance trade routes", "End of nomadic culture", "Isolation from Europe"], rightAnswerIndex: 1 },
    { questionText: "Which trade route connected the Golden Horde with Central Asia, China and Europe?", variants: ["Spice Route", "Great Silk Road", "Amber Road", "Royal Road"], rightAnswerIndex: 1 },
    { questionText: "Which city was an important trade center in the eastern part of the Golden Horde?", variants: ["Sarai", "Otrar", "Venice", "Constantinople"], rightAnswerIndex: 1 },
    { questionText: "What was the relationship between the Golden Horde and Russian principalities?", variants: ["Complete independence from the beginning", "Russian princes often paid tribute to the khan", "Russia ruled the Golden Horde", "They had no contact"], rightAnswerIndex: 1 },
    { questionText: "Which battle in 1380 became an important victory for the Russian forces against the Golden Horde?", variants: ["Battle of Kulikovo", "Battle of Talas", "Battle of Kalka", "Battle of Ankara"], rightAnswerIndex: 0 },
    { questionText: "Who was the Golden Horde khan during the Battle of Kulikovo?", variants: ["Batu Khan", "Uzbek Khan", "Mamai", "Berke Khan"], rightAnswerIndex: 2 },
    { questionText: "Who reunited much of the Golden Horde and invaded Moscow in 1382?", variants: ["Tokhtamysh", "Mamai", "Uzbek Khan", "Edigu"], rightAnswerIndex: 0 },
    { questionText: "Which Central Asian ruler defeated Tokhtamysh?", variants: ["Babur", "Timur", "Shah Ismail", "Nizam al-Mulk"], rightAnswerIndex: 1 },
    { questionText: "What was one major reason for the decline of the Golden Horde in the 15th century?", variants: ["Internal political conflicts and fragmentation", "Lack of access to horses", "Disappearance of the Great Steppe", "Complete destruction of trade"], rightAnswerIndex: 0 },
    { questionText: "Which states emerged from the fragmentation of the Golden Horde?", variants: ["Kazakh Khanate, Crimean Khanate and Kazan Khanate", "Roman Empire and Byzantine Empire", "Seljuk and Ottoman Empires", "Western and Eastern Roman Empires"], rightAnswerIndex: 0 },
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
  // Week 4 — the Mongol Empire, the Golden Horde, and its successor states
  4: [
    { text: "1. The creation of the Mongol Empire and its invasions in Central Asia and Kazakhstan.", minChars: 1500, keywords: ["Mongol Empire", "Genghis Khan", "invasion", "Central Asia"] },
    { text: "2. The Golden Horde (Juchi Ulus): political history, economy, and cultural development.", minChars: 1500, keywords: ["Golden Horde", "Juchi Ulus", "economy", "culture"] },
    { text: "3. The White Horde (Ak-Orda): role in the formation of Kazakh statehood.", minChars: 1500, keywords: ["White Horde", "Ak-Orda", "Kazakh statehood"] },
    { text: "4. The Chagatai Ulus and its influence on Central Asia.", minChars: 1500, keywords: ["Chagatai Ulus", "Central Asia", "influence"] },
    { text: "5. The Nogai Horde: tribal confederation and political role.", minChars: 1500, keywords: ["Nogai Horde", "tribal confederation", "political role"] },
    { text: "6. The State of Moghulistan: rulers, territory, and foreign policy.", minChars: 1500, keywords: ["Moghulistan", "rulers", "territory", "foreign policy"] },
    { text: "7. The State of the Nomadic Uzbeks (Khanate of Abulkhair, 1428\u20131468) and its ethnopolitical processes.", minChars: 1500, keywords: ["Nomadic Uzbeks", "Abulkhair", "khanate", "ethnopolitical"] },
  ],
};

function resolveEssayTopic(rawTopic) {
  if (rawTopic.subtopics) {
    const sub = pickRandom(rawTopic.subtopics);
    return { text: sub.text, minChars: rawTopic.minChars, keywords: sub.keywords };
  }
  return rawTopic;
}

/* ------------------------------------------------------------
   1b. QUIZ PREP ARTICLES ("prepare" section in the sidebar)
   Full, book-style write-ups of each week's overall topic, so
   people can actually study on the site before taking the quiz.
   ------------------------------------------------------------ */

const QUIZ_WEEK_ARTICLES = {
  1: {
    title: 'week 1 \u2014 the stone age in kazakhstan',
    body: `
      <p>Archaeologists divide Kazakhstan's Stone Age into the Paleolithic, Mesolithic, Neolithic, and Eneolithic. The Early Paleolithic stretches from roughly 2.6 million to 140,000 years ago and is represented by some of the oldest known sites in the region, including the Karatau range, where the first traces of early humans on this territory were found; the people who reached Kazakhstan at this time were contemporaries of Pithecanthropus, classified today as Homo erectus. The Middle Paleolithic runs to about 40,000 years ago and the Late Paleolithic to roughly 12,000 years ago, followed by the Mesolithic (12,000\u20135,000 BC).</p>
      <p>Each stage is marked by a leap in tool technology. The earliest tool was the chopper, a pebble sharpened on one side; later industries produced microliths, small refined blades that are considered a hallmark of the Mesolithic, alongside the invention of the bow and arrow. The mastery of fire is regarded as the key discovery that separated early humans from the rest of the animal world, and pictography \u2014 drawing and carving on rock \u2014 became an early way of recording and passing on knowledge.</p>
      <p>The Neolithic brought the most consequential change: the so-called Neolithic Revolution, in which an appropriating economy based on hunting, gathering, and fishing gave way to a productive economy built on agriculture and animal husbandry. Ceramic tableware appears as one of the era's signature achievements. This transition culminates locally in the Eneolithic Botai culture of Northern Kazakhstan, famous as one of the earliest sites in the world associated with horse domestication \u2014 a development that would shape the steppe's nomadic future for millennia.</p>
      <p>Knowing which achievement belongs to which stage \u2014 and roughly when each stage falls \u2014 is the core of this week's material.</p>
    `,
  },
  2: {
    title: 'week 2 \u2014 the saka and the early iron age',
    body: `
      <p>The Early Iron Age in Kazakhstan begins around the 8th\u20137th centuries BC, when iron tools and weapons spread widely across the steppe, and is dominated by the Saka \u2014 nomadic and semi-nomadic pastoralist tribes who occupied much of the territory of Kazakhstan through the first millennium BC. Ancient Greek sources, most famously Herodotus, referred to them collectively as Scythians. The Saka were not one uniform group: Persian sources distinguish the Saka-tigrahauda ("wearing pointed hats"), the Saka-haomavarga (associated with the ritual drink haoma), and the Saka-paradaraya ("beyond the sea").</p>
      <p>Saka society was stratified into warriors, priests, and ordinary community members, and this inequality shows up archaeologically in the differing size and richness of burial mounds (kurgans). The elite were buried in large royal kurgans; the Tasmola culture of Central Kazakhstan is distinguished by unusual "kurgans with moustaches" \u2014 burial mounds with long stone ridges extending from them. The most celebrated find is the "Golden Man," discovered in 1969 at the Issyk kurgan by archaeologist Kemal Akishev, whose rich gold ornaments testify to the wealth and craftsmanship of the Saka elite. The Besshatyr kurgans in Zhetysu are another major site tied to Saka burial architecture.</p>
      <p>Saka art is defined by the "animal style" \u2014 dynamic, stylized images of animals and animal combat rendered in gold and bronze. Politically and militarily the Saka are remembered through figures such as Queen Tomyris of the Massagetae, who defeated and killed the Persian king Cyrus II, and the shepherd Shyrak, celebrated for leading Darius I's invading army into a waterless stretch of steppe during the Persian campaign against the Saka. Their economy rested on nomadic and semi-nomadic pastoralism.</p>
    `,
  },
  3: {
    title: 'week 3 \u2014 turkic khaganates and medieval states',
    body: `
      <p>The Turkic Khaganate, the first great Turkic state, was founded in 552 AD by Bumin Khagan. By 603 it had split into an Eastern and a Western Khaganate, the latter centered on Zhetysu with its capital at Suyab. The Western Khaganate's political core was known as the "Ten Tribes" (On Ok), made up of the Dulu and Nushibi tribal groups.</p>
      <p>After the Western Khaganate's decline, the Turgesh Khaganate rose in its place, existing from 704 to 756 AD. It was founded by Ush-Elik, but its most famous ruler is Suluk Khagan, remembered for resisting the Arab conquests advancing from the south. This confrontation culminated in the Battle of Talas in 751 AD, fought between Arab (Abbasid) forces allied with the Karluks on one side and Tang Chinese forces on the other \u2014 the Karluks switched sides to join the Arabs during the battle. Following the Turgesh Khaganate's fall in 756, the Karluks established their own state in Zhetysu, lasting until 940 and controlling cities such as Taraz and Suyab by 766.</p>
      <p>Elsewhere on the steppe, the Oghuz formed a state with its capital at Yangikent, ruled by a yabghu and said to have consisted of twenty-four tribes; the Kimeks built a khaganate across northeastern and Central Kazakhstan with its capital at Imakia, organized into twelve appanages and ruled first by a yabghu and later by a khagan.</p>
      <p>The era closes with the Karakhanid state (942\u20131212), the first Turkic dynasty to formally adopt Islam as its state religion, in 960, with its capital at Balasagun. The period also produced major cultural achievements: Yusuf Balasaguni wrote the "Kutadgu Bilig" ("The Wisdom of Royal Glory"), while Mahmud al-Kashgari compiled the "D\u012bw\u0101n Lugh\u0101t al-Turk," a landmark dictionary of Turkic languages and dialects. Running through the whole period is the Great Silk Road, which connected these Turkic states to Byzantium, Iran, and China.</p>
    `,
  },
  4: {
    title: 'week 4 \u2014 the great steppe and the golden horde',
    body: `
      <p>After the Mongol conquests of the early 13th century, Genghis Khan divided his empire among his sons as uluses. His son Jochi received the western lands \u2014 the Great Steppe stretching into Eastern Europe \u2014 and this territory became known as the Ulus of Jochi, later famous as the Golden Horde. It was Jochi's son, Batu Khan, grandson of Genghis Khan, who actually founded and consolidated the state, establishing its first capital at Sarai-Batu near the Volga River; a second capital, Sarai-Berke, was founded later, and the Volga itself became the Horde's economic and political artery.</p>
      <p>Politically, the Golden Horde was organized around tribal and military administration built on the Genghisid principle of the ulus \u2014 a territory belonging to a member of the ruling dynasty. Mongol institutions shaped daily life across the steppe: the yam system organized postal and communication routes, while yasak denoted the tribute collected from subject populations. Kipchak Turkic increasingly became the common language of the Horde's mixed population.</p>
      <p>Islamization proceeded gradually: Berke Khan was among the first rulers to convert, but it was Uzbek Khan in the 14th century who made Islam the dominant religion of the state. The Horde controlled major trade centers \u2014 including Otrar in the east \u2014 and sat astride the Great Silk Road, linking Central Asia, China, and Europe.</p>
      <p>Relations with the Russian principalities were defined by tribute payments to the khan, punctuated by conflict: Kyiv fell to Batu's forces in 1240, while in 1380 Russian forces defeated the Golden Horde's khan Mamai at the Battle of Kulikovo. Khan Tokhtamysh briefly reunited much of the Horde and sacked Moscow in 1382, but was later defeated by the Central Asian conqueror Timur. Internal political conflict and fragmentation through the 15th century broke the Golden Horde apart, giving rise to successor states \u2014 among them the Kazakh Khanate, the Crimean Khanate, and the Khanate of Kazan.</p>
    `,
  },
};

const QUIZ_QUESTIONS_PER_SESSION = 30; // Установлено ровно 30 вопросов для каждой недели
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
  materials: $('mainbox-materials-screen'),
  prepHub: $('mainbox-prep-hub-screen'),
  prepWeeks: $('mainbox-prep-weeks-screen'),
  prepArticle: $('mainbox-prep-article-screen'),
  prepEssay: $('mainbox-prep-essay-screen'),
  nameEntry: $('mainbox-start-screen'),
  info: $('mainbox-info-screen'),
  essayWrite: $('mainbox-essey-test-screen'),
  essayResult: $('mainbox-essay-result-screen'),
  quiz: $('mainbox-questions-screen'),
  quizResult: $('mainbox-result-answer-screen'),
};

const headerBackBtn = $('button-back');
const headerMenuBtn = $('button-menu');
const headerExitBtn = $('button-exit');
const topicTimerBox = $('div-topic-timer');

const sidebar = $('sidebar');
const sidebarOverlay = $('sidebar-overlay');
const sidebarCloseBtn = $('button-sidebar-close');
const sidebarQuizBtn = $('sidebar-quiz');
const sidebarEssayBtn = $('sidebar-essay');
const sidebarPrepBtn = $('sidebar-prep');
const sidebarInfoBtn = $('sidebar-info');

const homeButtons = document.querySelectorAll('.button-home');
const weekButtons = document.querySelectorAll('#mainbox-week-screen .button-week');
const weekTitle = $('week-select-title');
const weekSubtitle = $('week-select-subtitle');

const materialsTitle = $('materials-title');
const materialsSubtitle = $('materials-subtitle');
const materialsContent = $('materials-content');
const materialsStartBtn = $('button-materials-start');

const prepHubQuizBtn = $('button-prep-quiz');
const prepHubEssayBtn = $('button-prep-essay');
const prepWeekButtons = document.querySelectorAll('.prep-week-btn');
const prepArticleTitle = $('prep-article-title');
const prepArticleBody = $('prep-article-body');

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
  headerExitBtn.style.display = (key === 'quiz' || key === 'essayWrite') ? 'flex' : 'none';
  headerMenuBtn.style.display = (key === 'quiz' || key === 'essayWrite') ? 'none' : 'flex';
  topicTimerBox.style.display = key === 'essayWrite' ? 'flex' : 'none';
  closeSidebar();

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
headerMenuBtn.addEventListener('click', openSidebar);

/* ---- Sidebar ---- */
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('show');
  sidebar.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('show');
  sidebar.setAttribute('aria-hidden', 'true');
}

sidebarCloseBtn.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

function chooseMode(mode) {
  state.mode = mode; // 'quiz' | 'essay'
  weekTitle.textContent = mode === 'quiz' ? 'Choose a quiz week' : 'Choose an essay week';
  weekSubtitle.textContent = mode === 'quiz'
    ? 'Each week draws random questions from a themed bank.'
    : 'Each week assigns a random topic from that week\u2019s list.';
  showScreen('weekSelect');
}

homeButtons.forEach((btn) => {
  btn.addEventListener('click', () => chooseMode(btn.dataset.mode));
});

sidebarQuizBtn.addEventListener('click', () => chooseMode('quiz'));
sidebarEssayBtn.addEventListener('click', () => chooseMode('essay'));
sidebarPrepBtn.addEventListener('click', () => showScreen('prepHub'));
sidebarInfoBtn.addEventListener('click', () => showScreen('info'));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function goToNameEntry() {
  nameLabel.textContent = 'Your name';
  nameInput.value = '';
  nameInput.placeholder = 'Please enter your name...';
  nameInput.style.borderColor = '';
  showScreen('nameEntry');
}

/* ---- Materials (essay topic list) screen ---- */
function renderMaterials() {
  materialsTitle.textContent = `essay materials \u2014 week ${state.week}`;
  materialsSubtitle.textContent = 'one of these will be assigned to you.';

  materialsContent.innerHTML = '';

  const topics = ESSAY_TOPICS[state.week] || [];
  topics.forEach((t) => {
    const div = document.createElement('div');
    div.className = 'material-item';
    if (t.subtopics) {
      const subsHtml = t.subtopics.map((s) => `<p class="material-sub">\u2022 ${escapeHtml(s.text)}</p>`).join('');
      div.innerHTML = `<p class="material-q">one of the following will be assigned:</p>${subsHtml}`;
    } else {
      div.innerHTML = `<p class="material-q">${escapeHtml(t.text)}</p>`;
    }
    materialsContent.appendChild(div);
  });
}

weekButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.week = Number(btn.dataset.week);
    if (state.mode === 'essay') {
      renderMaterials();
      showScreen('materials');
    } else {
      goToNameEntry();
    }
  });
});

materialsStartBtn.addEventListener('click', goToNameEntry);

/* ---- Prepare section ---- */
prepHubQuizBtn.addEventListener('click', () => showScreen('prepWeeks'));
prepHubEssayBtn.addEventListener('click', () => showScreen('prepEssay'));

function renderPrepArticle(week) {
  const article = QUIZ_WEEK_ARTICLES[week];
  if (!article) return;
  prepArticleTitle.textContent = article.title;
  prepArticleBody.innerHTML = article.body;
}

prepWeekButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    renderPrepArticle(Number(btn.dataset.week));
    showScreen('prepArticle');
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
    userAnswerText: chosenOption ? chosenOption.text : 'No answer (time out)',
    correctAnswerText: correctOption.text,
    isCorrect,
  });

  setTimeout(() => {
    quizIndex++;
    loadQuizQuestion();
  }, FEEDBACK_DELAY_MS);
}

function showQuizResults() {
  showScreen('quizResult');
  totalScoreText.textContent = `You scored ${quizScore} out of ${quizSessionQuestions.length}`;
  
  mistakesBox.innerHTML = '';
  const incorrects = quizAllAnswers.filter(a => !a.isCorrect);
  if (incorrects.length === 0) {
    mistakesBox.innerHTML = '<div class="no-mistakes">Amazing! No mistakes made.</div>';
  } else {
    incorrects.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'incorrect-answers-list';
      div.innerHTML = `<p><strong>Q${i + 1}:</strong> ${escapeHtml(item.question)}</p>
                       <p><span class="answer-red">Your answer:</span> ${escapeHtml(item.userAnswerText)}</p>
                       <p><span class="answer-green">Correct answer:</span> ${escapeHtml(item.correctAnswerText)}</p>`;
      mistakesBox.appendChild(div);
    });
  }

  const percent = Math.round((quizScore / quizSessionQuestions.length) * 100);
  quizRatingBox.innerHTML = `<div class="rating-box">
      <span class="rating-stars">${starString(percent)}</span>
      <span class="rating-label">${percent}% correct</span>
    </div>`;
}

function resetEssayState() {}
function startEssay() {}
function stopEssayTimer() {}
