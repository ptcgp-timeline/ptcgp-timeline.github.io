// Game Configuration
export const gameConfig = {
  name: {
    en: "Pokemon TCG Pocket",
    zh: "寶可夢集換式卡牌遊戲Pocket",
    ja: "ポケモンカードポケット",
    fr: "Pokémon TCG Pocket",
    ko: "포켓몬 카드 포켓",
    de: "Pokémon Sammelkartenspiel Pocket",
    it: "Pokémon TCG Pocket",
    es: "Pokémon TCG Pocket",
    pt: "Pokémon TCG Pocket",
  },
  company: "Pokémon",
  copyrightHolders:
    "The Pokémon Company, Nintendo, Game Freak, or Creatures Inc.",
  officialWebsiteText: {
    en: "Official Pokemon TCG Pocket Website",
    zh: "官方寶可夢集換式卡牌遊戲Pocket網站",
    ja: "公式ポケモンカードポケットウェブサイト",
    fr: "Site Officiel Pokémon TCG Pocket",
    ko: "공식 포켓몬 카드 포켓 웹사이트",
    de: "Offizielle Pokémon Sammelkartenspiel Pocket Webseite",
    es: "Sitio Web Oficial de Pokémon TCG Pocket",
    it: "Sito Ufficiale Pokémon TCG Pocket",
    pt: "Site Oficial Pokémon TCG Pocket",
  },
  officialDomains: [
    "pokemon.com",
    "pokemonkorea.co.kr",
    "pokemontcgpocket.com",
  ],
  serverReset: "6AMUTC",
};

// Events Data
export const eventsData = [
  [
    {
      // NAMES ARE JUST for sample as its translated by chatGPT
      name: {
        en: "Genetic Apex (A1)",
        ja: "最強の遺伝子 (A1)",
        zh: "最強的基因 (A1)",
        ko: "최강의 유전자 (A1)",
        fr: "Puissance Génétique (A1)",
        de: "Genetischer Höhepunkt (A1)",
        es: "Cima Genética (A1)",
        it: "Apice Genetico (A1)",
        pt: "Ápice Genético (A1)",
      },
      description: {
        en: "Genetic Apex contains [Charlizard] - [Mewtwo] - [Pikachu]",
        ja: "最強の遺伝子には [リザードン] - [ミュウツー] - [ピカチュウ] が含まれています",
        zh: "最強的基因包含 [噴火龍] - [超夢] - [皮卡丘]",
        ko: "최강의 유전자에는 [리자몽] - [뮤츠] - [피카츄] 포함",
        fr: "Puissance Génétique contient [Dracaufeu] - [Mewtwo] - [Pikachu]",
      },
      urls: {
        en: [
          "https://ptcgpocket.gg/genetic-apex/",
          "https://www.serebii.net/tcgpocket/geneticapex/",
          "https://www.pokemon-zone.com/sets/a1/",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/kaempfe-sammle-und-tausche-in-pokemon-sammelkartenspiel-pocket",
        ],
      },
      pos: "0% 35%",
      zoom: "110%",
      image: "genetic_apex_a1.jpg",
      start: "2024-10-30 19:00:00",
      end: "2025-04-30 05:59:00",
      color: "#6d21ed",
      showOnHome: true,
      noEnd: true,
    },
  ],
  [
    {
      name: {
        en: "Mythical Island (A1A)",
        zh: "幻遊島 (A1A)",
        ja: "幻のいる島 (A1A)",
        fr: "L'Île Fabuleuse (A1A)",
        ko: "환상이 있는 섬 (A1A)",
      },
      description: {
        en: "5 ◊ cards (normal cards). 3 ◊ ◊ cards (normal cards). 7 ◊ ◊ ◊ cards (normal cards). 2 ◊ ◊ ◊ ◊ cards (normal cards). 4 ☆ cards (secret cards). 1 ☆☆ card (secret cards). 6 ☆☆☆ cards (secret cards). 8 ♕ cards (secret cards). Total Cards: 36. 17 normal cards and 19 secret cards in total.",
        zh: "寶可夢集換式卡牌遊戲Pocket首個迷你擴充包",
        ja: "ポケモンカードポケットの最初のミニセット",
        fr: "Premier mini-set de Pokémon TCG Pocket",
        ko: "포켓몬 카드 포켓의 첫 번째 미니 세트",
      },
      urls: {
        en: [
          "https://www.pokemon.com/us/pokemon-news/pokemon-tcg-pocket-mythical-island",
          "https://ptcgpocket.gg/mythical-island-release/",
          "https://www.pokemon-zone.com/events/mythical-island-release/",
          "https://www.serebii.net/tcgpocket/mythicalisland/",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/pokemon-sammelkartenspiel-pocket-mysterioese-insel",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/jcc-pokemon-pocket-lile-fabuleuse",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/gcc-pokemon-pocket-lisola-misteriosa",
        ],
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/jcc-pokemon-pocket-la-isla-singular",
        ],
      },
      pos: "-15% 30%",
      zoom: "200%",
      image: "Mythical_Island_A1A.png",
      start: "2024-12-17 06:00:00",
      end: "2025-04-30 05:59:00",
      color: "#8ecb56",
      showOnHome: true,
      noEnd: true,
    },
  ],
  [
    {
      name: {
        en: "Space-Time Smackdown (A2)",
        fr: "Choc Spatio-Temporel ( A2)",
        es: "Pugna Espaciotemporal (A2)",
        it: "Scontro Spaziotemporale (A2)",
        de: "Kollision von Raum und Zeit (A2)",
        pt: "Embate do Tempo e Espaço (A2)",
        ko: "시공의 격투 (A2)",
        ja: "時空の激闘 (A2)",
      },
      pos: "0% 15%",
      zoom: "250%",
      image: "space-time-smackdown-a2.webp",
      start: "2025-01-30 06:00:00",
      end: "2025-07-30 05:59:00",
      color: "#949DAE",
      urls: {
        en: [
          "https://www.pokemon.com/us/pokemon-news/explore-pokemon-tcg-pockets-newest-expansion-space-time-smackdown",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/explorez-choc-spatio-temporel-la-toute-nouvelle-extension-du-jcc-pokemon-pocket",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/esplora-scontro-spaziotemporale-la-nuova-espansione-del-gcc-pokemon-pocket",
        ],
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/explora-la-nueva-expansion-de-jcc-pokemon-pocket-pugna-espaciotemporal",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/entdecke-kollision-von-raum-und-zeit-die-neueste-erweiterung-fuer-pokemon-sammelkartenspiel-pocket",
        ],
        ko: [
          "https://pokemonkorea.co.kr/pokemon_tcg_pocket/menu492?number=3622&mode=view",
        ],
        ja: ["https://www.pokemontcgpocket.com/ja/news/20/"],
      },
      showOnHome: true,
      noEnd: true,
    },
  ],
  [
    {
      name: {
        en: "Lapras ex Drop Event",
        fr: "Évènement butin Lokhlass-ex",
        zh: "拉普拉斯ex掉落活動",
        ja: "ラプラスexドロップイベント",
        ko: "라프라스 ex 드롭 이벤트",
      },
      pos: "30% 33%",
      zoom: "340%",
      image: "Lapras-ex-Drop-Event.webp",
      start: "2024-11-05 06:00:00",
      end: "2024-11-18 05:59:00",
      color: "#56DFFC",
      urls: {
        en: [
          "https://ptcgpocket.gg/lapras-ex-drop-event/",
          "https://www.pokemon-zone.com/events/lapras-ex-drop-event/",
          "https://ptcgp.raenonx.cc/en/battle/solo-event/BT_GR_0002010_01",
          "https://www.serebii.net/tcgpocket/events/laprasexdropevent.shtml",
        ],
        fr: ["https://ptcgp.raenonx.cc/fr/battle/solo-event/BT_GR_0002010_01"],
        zh: ["https://ptcgp.raenonx.cc/zh/battle/solo-event/BT_GR_0002010_01"],
        ja: ["https://ptcgp.raenonx.cc/ja/battle/solo-event/BT_GR_0002010_01"],
        ko: ["https://ptcgp.raenonx.cc/ko/battle/solo-event/BT_GR_0002010_01"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Venusaur Drop Event",
        fr: "Évènement butin Florizarre",
        zh: "妙蛙花掉落活動",
        ja: "フシギバナドロップイベント",
        ko: "이상해꽃 드롭 이벤트",
      },
      pos: "40% 57%",
      zoom: "360%",
      image: "Venusaur-Drop-Event.webp",
      start: "2024-11-29 06:00:00",
      end: "2024-12-13 05:59:00",
      color: "#E69285",
      urls: {
        en: [
          "https://ptcgpocket.gg/venusaur-drop-event/",
          "https://www.pokemon-zone.com/events/venusaur-drop-event/",
          "https://ptcgp.raenonx.cc/en/battle/solo-event/BT_GR_0002010_02",
          "https://www.serebii.net/tcgpocket/events/venusaurdropevent.shtml",
        ],
        fr: ["https://ptcgp.raenonx.cc/fr/battle/solo-event/BT_GR_0002010_02"],
        zh: ["https://ptcgp.raenonx.cc/zh/battle/solo-event/BT_GR_0002010_02"],
        ja: ["https://ptcgp.raenonx.cc/ja/battle/solo-event/BT_GR_0002010_02"],
        ko: ["https://ptcgp.raenonx.cc/ko/battle/solo-event/BT_GR_0002010_02"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Blastoise Drop Event",
        fr: "Évènement butin Tortank",
        zh: "水箭龜掉落活動",
        ja: "カメックスドロップイベント",
        ko: "거북왕 드롭 이벤트",
      },
      pos: "30% 35%",
      zoom: "300%",
      image: "Blastoise-ex-Drop-Event.jpg",
      start: "2025-01-01 06:00:00",
      end: "2025-01-15 05:59:00",
      color: "#4173d5",
      urls: {
        en: [
          "https://www.pokemon.com/us/pokemon-news/pokemon-trading-card-game-pocket-blastoise-drop-event",
          "https://ptcgpocket.gg/blastoise-ex-drop-event/",
          "https://www.pokemon-zone.com/events/blastoise-drop-event/",
          "https://ptcgp.raenonx.cc/en/battle/solo-event/BT_GR_2408010_01",
          "https://www.serebii.net/tcgpocket/events/blastoisedropevent.shtml",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/drop-event-mit-turtok-in-pokemon-sammelkartenspiel-pocket",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/evenement-butin-tortank-dans-le-jeu-de-cartes-a-collectionner-pokemon-pocket",
          "https://ptcgp.raenonx.cc/fr/battle/solo-event/BT_GR_2408010_01",
        ],
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/evento-botin-blastoise-del-juego-de-cartas-coleccionables-pokemon-pocket",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/gioco-di-carte-collezionabili-pokemon-pocket-evento-bonus-blastoise",
        ],
        zh: ["https://ptcgp.raenonx.cc/zh/battle/solo-event/BT_GR_2408010_01"],
        ja: ["https://ptcgp.raenonx.cc/ja/battle/solo-event/BT_GR_2408010_01"],
        ko: ["https://ptcgp.raenonx.cc/ko/battle/solo-event/BT_GR_2408010_01"],
      },
      showOnHome: true,
    },
  
    {
      name: {
        de: "Drop-Event (Cresselia-ex)",
        en: "Cresselia ex Drop Event",
        es: "Evento botín Cresselia ex",
        fr: "Évènement butin Cresselia-ex",
        it: "Evento bonus Cresselia-ex",
        ja: "クレセリアexドロップイベント",
        ko: "크레세리아 ex 드롭 이벤트",
        pt: "Evento de Oportunidade Cresselia ex",
        zh: "克雷色利亞ex掉落活動",
      },
      pos: "40% 35%",
      zoom: "350%",
      image: "Cresselia_ex_Drop_Event.webp",
      start: "2025-02-03 06:00:00",
      end: "2025-02-17 05:59:00",
      color: "#EE90C1",
      urls: {
        en: [
          //"https://www.pokemon.com/us/pokemon-news/pokemon-trading-card-game-pocket-blastoise-drop-event",
          "https://ptcgpocket.gg/cresselia-ex-drop-event/",
          "https://www.pokemon-zone.com/events/cresselia-ex-drop-event/",
        ],
      },
      showOnHome: true,
    },
    // TEMP STUFF to reduce the height of timeline
    {
      name: {
    de: "Massiver Auflauf von Finsternis-Pokémon (Snibunna-ex)",
    en: "Darkness-type Pokémon Mass Outbreak Event (Weavile ex)",
    es: "Aparición masiva de Pokémon de tipo Oscuro (Weavile ex)",
    fr: "Apparition massive de Pokémon Obscurité (Dimoret-ex)",
    it: "Comparse massicce di Pokémon Oscurità (Weavile-ex)",
    ja: "悪ポケモン大量発生イベント (マニューラex)",
    ko: "악포켓몬 대량발생 이벤트 (포푸니라 ex)",
    pt: "Evento Aparição em Massa de Pokémon de tipo Escuridão (Weavile ex)",
    zh: "惡屬性寶可夢大量出現活動 (瑪狃拉ex)", 
      },
      pos: "50% 30%",
      zoom: "500%",
      image: "Dark-mass-event.webp",
      start: "2025-02-21 06:00:00",
      end: "2025-02-27 05:59:00",
      color: "#CF203F",
      urls: {
        es: [
          //"https://www.pokemon.com/es/noticias-pokemon/explora-la-nueva-expansion-de-jcc-pokemon-pocket-pugna-espaciotemporal",
        ],
        it: [
          //"https://www.pokemon.com/it/novita-pokemon/comparse-massicce-di-pokemon-di-tipo-psico-nel-gioco-di-carte-collezionabili-pokemon-pocket",
        ],
        de: [
          //"https://www.pokemon.com/de/pokemon-news/ein-massiver-auflauf-von-psycho-pokemon-in-pokemon-sammelkartenspiel-pocket",
        ],
        en: [
          //"https://www.pokemon.com/us/pokemon-news/psychic-type-pokemon-mass-outbreak-in-pokemon-trading-card-game-pocket",
          "https://ptcgpocket.gg/darkness-type-pokemon-mass-outbreak-event-weavile-ex/",
          "https://www.pokemon-zone.com/events/darkness-type-pokemon-mass-outbreak/",
        ],
        fr: [
          //"https://www.pokemon.com/fr/actus-pokemon/une-apparition-massive-de-pokemon-psy-dans-le-jeu-de-cartes-a-collectionner-pokemon-pocket",
          //"https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_04",
        ],
        zh: [
          //"https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_04",
        ],
        ja: [
          //"https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_04",
        ],
        ko: [
          //"https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_04",
        ],
      },
      showOnHome: true,
    },
  ],
  [
    {
      name: {
        en: "Wonder Pick Event Part 1 (Chansey  + Meowth)",
        fr: "Évènement pioche miracle 1 (Leveinard + Miaouss)",
        zh: "得卡挑戰活動 前半 (吉利蛋 + 	喵喵)",
        ja: "ゲットチャレンジイベント 前半 (ラッキー + ニャース)",
        ko: "겟 챌린지 이벤트 전반 (럭키 + 나옹)",
      },
      pos: "58% 45%",
      zoom: "600%",
      image: "Meowth-event-banner.webp",
      start: "2024-11-01 06:00:00",
      end: "2024-11-15 05:59:59",
      color: "#FCF7BC",
      urls: {
        en: [
          "https://ptcgpocket.gg/wonder-pick-event-part-1/",
          "https://www.serebii.net/tcgpocket/events/wonderpickeventpart1.shtml",
          "https://www.pokemon-zone.com/events/meowth-chansey-wonder-pick/",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_0002010_EVENT_01",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_0002010_EVENT_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_0002010_EVENT_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_0002010_EVENT_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_0002010_EVENT_01",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Wonder Pick Event Part 1 (Bulbasaur + Magnemite)",
        fr: "Évènement pioche miracle 1 (Bulbizarre + Magnéti)",
        zh: "得卡挑戰活動 前半 (妙蛙種子 + 小磁怪)",
        ja: "ゲットチャレンジイベント 前半 (フシギダネ + コイル)",
        ko: "겟 챌린지 이벤트 전반 (이상해씨 + 코일)",
      },
      pos: "-15% 35%",
      zoom: "200%",
      image: "wonder_pick_bulbasaur_1.jpg",
      start: "2024-12-06 06:00:00",
      end: "2024-12-20 05:59:59",
      color: "#9ec736",
      urls: {
        en: [
          "https://ptcgpocket.gg/wonder-pick-event-part-1-bulbasaur-magnemite/",
          "https://www.serebii.net/tcgpocket/events/wonderpickeventdecember2024part1.shtml",
          "https://www.pokemon-zone.com/events/bulbasaur-magnemite-wonder-pick/",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Wonder Pick Event Part 1 (Charmander + Squirtle)",
        fr: "Évènement pioche miracle 1 (Salamèche + Carapuce)",
        zh: "得卡挑戰活動 前半 (小火龍 + 傑尼龜)",
        ja: "ゲットチャレンジイベント 前半 (ヒトカゲ + ゼニガメ)",
        ko: "겟 챌린지 이벤트 전반 (파이리 + 꼬부기)",
      },
      pos: "50% 30%",
      zoom: "200%",
      image: "wonder_pick_event_part_1_2_charmander_squirtle .webp",
      start: "2025-01-07 06:00:00",
      end: "2025-01-21 05:59:00",
      color: "#61c3df",
      urls: {
        en: [
          "https://www.pokemon.com/us/pokemon-news/charmander-and-squirtle-star-in-this-pokemon-tcg-pocket-wonder-pick-event",
          "https://ptcgpocket.gg/wonder-pick-event-part-1-charmander-squirtle/",
          "https://www.pokemon-zone.com/events/charmander-squirtle-wonder-pick/",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_EVENT_02",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/salameche-et-carapuce-sont-a-laffiche-dun-evenement-pioche-miracle-dans-le-jcc-pokemon-pocket",
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_02",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/glumanda-und-schiggy-erscheinen-in-diesem-wunderwahl-event-in-pokemon-sammelkartenspiel-pocket",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_02",
        ],
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/charmander-y-squirtle-protagonizan-un-evento-eleccion-magica-en-jcc-pokemon-pocket",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/charmander-e-squirtle-sono-i-protagonisti-di-un-nuovo-evento-pesca-misteriosa-nel-gcc-pokemon-pocket",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        de: "Wunderwahl-Event Teil 1 (Panflam + Togepi)",
        en: "Wonder Pick Event Part 1 (Chimchar + Togepi)",
        es: "Evento elección mágica parte 1 (Chimchar + Togepi)",
        fr: "Évènement pioche miracle 1 (Ouisticram + Togepi)",
        it: "Evento pesca misteriosa 1 (Chimchar + Togepi)",
        ja: "ゲットチャレンジイベント 前半 (ヒコザル + トゲピー)",
        ko: "겟 챌린지 이벤트 전반 (불꽃숭이 + 토게피),",
        pt: "Evento Escolha Misteriosa (Pt. 1) (Chimchar + Togepi)",
        zh: "得卡挑戰活動 前半 (小火焰猴 + 波克比)",
      },
      pos: "20% 45%",
      zoom: "400%",
      image: "wonder_pick_chimchar_1.webp",
      start: "2025-02-07 06:00:00",
      end: "2025-02-21 05:59:00",
      color: "#F3927C",
      urls: {
        en: [
          //"https://www.pokemon.com/us/pokemon-news/charmander-and-squirtle-star-in-this-pokemon-tcg-pocket-wonder-pick-event",
          "https://ptcgpocket.gg/wonder-pick-event-part-1-chimchar-togepi/",
          "https://www.pokemon-zone.com/events/chimchar-togepi-wonderpick/",
         // "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_EVENT_02",
        ],
        fr: [
         // "https://www.pokemon.com/fr/actus-pokemon/salameche-et-carapuce-sont-a-laffiche-dun-evenement-pioche-miracle-dans-le-jcc-pokemon-pocket",
          //"https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_02",
        ],
        de: [
          //"https://www.pokemon.com/de/pokemon-news/glumanda-und-schiggy-erscheinen-in-diesem-wunderwahl-event-in-pokemon-sammelkartenspiel-pocket",
        ],
        zh: [
          //"https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ja: [
         // "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ko: [
          //"https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_02",
        ],
        es: [
          //"https://www.pokemon.com/es/noticias-pokemon/charmander-y-squirtle-protagonizan-un-evento-eleccion-magica-en-jcc-pokemon-pocket",
        ],
        it: [
          //"https://www.pokemon.com/it/novita-pokemon/charmander-e-squirtle-sono-i-protagonisti-di-un-nuovo-evento-pesca-misteriosa-nel-gcc-pokemon-pocket",
        ],
      },
      showOnHome: true,
    },
  ],
  [
    {
      name: {
        en: "Wonder Pick Event Part 2 (Chansey  + Meowth)",
        fr: "Évènement pioche miracle 2 (Leveinard + Miaouss)",
        zh: "得卡挑戰活動 後半 (吉利蛋 + 	喵喵)",
        ja: "ゲットチャレンジイベント 後半 (ラッキー + ニャース)",
        ko: "겟 챌린지 이벤트 후반 (럭키 + 나옹)",
      },
      pos: "15% 55%",
      zoom: "600%",
      image: "Meowth-event-2.webp",
      start: "2024-11-08 06:00:00",
      end: "2024-11-15 05:59:59",
      color: "#FCF7BC",
      urls: {
        en: [
          "https://ptcgpocket.gg/wonder-pick-event-part-2/",
          "https://www.serebii.net/tcgpocket/events/wonderpickeventpart2.shtml",
          "https://www.pokemon-zone.com/events/meowth-chansey-wonder-pick/",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_0002010_EVENT_02",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_0002010_EVENT_02",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_0002010_EVENT_02",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_0002010_EVENT_02",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_0002010_EVENT_02",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Fire Pokémon Mass Outbreak Event (Arcanine ex)",
        fr: "Apparition massive de Pokémon Feu (Arcanin-ex)",
        zh: "火屬性寶可夢大量出現活動 (風速狗ex)",
        ja: "炎ポケモン大量発生イベント (ウインディex)",
        ko: "불꽃 포켓몬 대량발생 이벤트 (윈디 ex)",
      },
      pos: "52% 30%",
      zoom: "300%",
      image: "Fire-event.webp",
      start: "2024-11-22 06:00:00",
      end: "2024-11-28 05:59:00",
      color: "#F8982B",
      urls: {
        en: [
          "https://www.pokemon.com/us/pokemon-news/a-fire-type-pokemon-mass-outbreak-blazes-into-pokemon-trading-card-game-pocket",
          "https://ptcgpocket.gg/fire-pokemon-mass-outbreak-event/",
          "https://www.pokemon-zone.com/events/fire-type-pokemon-mass-outbreak/",
          "https://www.serebii.net/tcgpocket/events/fire-typemassoutbreakevent.shtml",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_0002010_EVENT_03",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/une-apparition-massive-de-pokemon-de-type-feu-embrase-le-jeu-de-cartes-a-collectionner-pokemon-pocket",
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_03",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_03",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_03",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_03",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/comparse-massicce-di-pokemon-fuoco-rendono-latmosfera-del-gioco-di-carte-collezionabili-pokemon-pocket-ancor-piu-rovente",
        ],
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/apariciones-masivas-de-pokemon-de-tipo-fuego-en-el-juego-de-cartas-coleccionables-pokemon-pocket",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Wonder Pick Event Part 2 (Bulbasaur + Magnemite)",
        fr: "Évènement pioche miracle 2 (Bulbizarre + Magnéti)",
        zh: "得卡挑戰活動 後半 (妙蛙種子 + 小磁怪)",
        ja: "ゲットチャレンジイベント 後半 (フシギダネ + コイル)",
        ko: "겟 챌린지 이벤트 후반 (이상해씨 + 코일)",
      },
      pos: "-45% 50%",
      zoom: "200%",
      image: "wonder_pick_bulbasaur_2.jpg",
      start: "2024-12-13 06:00:00",
      end: "2024-12-20 05:59:59",
      color: "#9ec736",
      urls: {
        en: [
          "https://ptcgpocket.gg/wonder-pick-event-part-2-bulbasaur-magnemite/",
          "https://www.pokemon-zone.com/events/bulbasaur-magnemite-wonder-pick/",
        ],
        pt: [
          "https://ptcgphub.com/pt/bulbasaur-e-magnemite-se-unem-para-um-evento-cheio-de-surpresas/",
        ],
      },
      showOnHome: true,
    },
    // TEMP STUFF TO REDUCE HEIGHT IT WILL BE IN ITS OWN OUTBREAK LINE
    {
      name: {
        en: "Lightning Pokémon Mass Outbreak Event (Zapdos ex)",
        fr: "Apparition massive de Pokémon Électrique (Électhor ex)",
        zh: "雷屬性寶可夢大量出現活動 (的卡牌ex)",
        ja: "雷ポケモン大量発生イベント (サンダーex)",
        ko: "번개포켓몬 대량발생 이벤트 (썬더ex)",
      },
      pos: "85% 17%",
      zoom: "300%",
      image: "lightning_pokemon_mass_outbreak_event_zapdos_ex.jpg",
      start: "2024-12-26 06:00:00",
      end: "2025-01-01 05:59:00",
      color: "#f8f007",
      urls: {
        en: [
          "https://ptcgpocket.gg/lightning-pokemon-mass-outbreak-event-zapdos-ex/",
          "https://www.pokemon-zone.com/events/lightning-type-pokemon-mass-outbreak/",
          "https://www.serebii.net/tcgpocket/events/lightning-typemassoutbreakevent.shtml",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_EVENT_01",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_01",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Wonder Pick Event Part 2 (Charmander + Squirtle)",
        fr: "Évènement pioche miracle 2 (Salamèche + Carapuce)",
        zh: "得卡挑戰活動 後半 (小火龍 + 傑尼龜)",
        ja: "ゲットチャレンジイベント 後半 (ヒトカゲ + ゼニガメ)",
        ko: "겟 챌린지 이벤트 후반 (파이리 + 꼬부기)",
      },
      pos: "50% 30%",
      zoom: "200%",
      image: "wonder_pick_event_part_1_2_charmander_squirtle .webp",
      start: "2025-01-15 06:00:00",
      end: "2025-01-22 05:59:00",
      color: "#61c3df",
      urls: {
        en: [
          "https://ptcgpocket.gg/wonder-pick-event-part-2-charmander-squirtle/",
          "https://www.pokemon-zone.com/events/charmander-squirtle-wonder-pick/",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_EVENT_03",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_03",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_03",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_03",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_03",
        ],
      },
      showOnHome: true,
    },
    // TEMP STUFF to reduce the height of timeline
    {
      name: {
        en: "Psychic Pokémon Mass Outbreak Event (Mew ex)",
        fr: "Apparition massive de Pokémon Psy (Mew ex)",
        zh: "超屬性寶可夢大量出現活動 (夢幻ex)",
        ja: "超ポケモン大量発生イベント (ミューex)",
        ko: "초포켓몬 대량발생 이벤트 (뮤ex)",
        de: "Psycho-Pokémon-Massenausbruch-Event (Mew ex)",
        es: "Aparición masiva de Pokémon Psíquico (Mew ex)",
        it: "Apparizione massiva di Pokémon Psichico (Mew ex)",
        pt: "Aparência massiva de Pokémon Psíquico (Mew ex)",
      },
      pos: "20% 30%",
      zoom: "100%",
      image: "psychic_pokemon_mass_outbreak_event_mew_ex.jpg",
      start: "2025-01-23 06:00:00",
      end: "2025-01-29 05:59:00",
      color: "#f7dbe6",
      urls: {
        es: [
          "https://www.pokemon.com/es/noticias-pokemon/explora-la-nueva-expansion-de-jcc-pokemon-pocket-pugna-espaciotemporal",
        ],
        it: [
          "https://www.pokemon.com/it/novita-pokemon/comparse-massicce-di-pokemon-di-tipo-psico-nel-gioco-di-carte-collezionabili-pokemon-pocket",
        ],
        de: [
          "https://www.pokemon.com/de/pokemon-news/ein-massiver-auflauf-von-psycho-pokemon-in-pokemon-sammelkartenspiel-pocket",
        ],
        en: [
          "https://www.pokemon.com/us/pokemon-news/psychic-type-pokemon-mass-outbreak-in-pokemon-trading-card-game-pocket",
          "https://ptcgpocket.gg/psychic-pokemon-mass-outbreak-event-mew-ex/",
          "https://www.pokemon-zone.com/events/psychic-type-pokemon-mass-outbreak/",
        ],
        fr: [
          "https://www.pokemon.com/fr/actus-pokemon/une-apparition-massive-de-pokemon-psy-dans-le-jeu-de-cartes-a-collectionner-pokemon-pocket",
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_04",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_04",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_04",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_04",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        de: "Wunderwahl-Event Teil 2 (Panflam + Togepi)",
        en: "Wonder Pick Event Part 2 (Chimchar + Togepi)",
        es: "Evento elección mágica parte 2 (Chimchar + Togepi)",
        fr: "Évènement pioche miracle 2 (Ouisticram + Togepi)",
        it: "Evento pesca misteriosa 2 (Chimchar + Togepi)",
        ja: "ゲットチャレンジイベント 後半 (ヒコザル + トゲピー)",
        ko: "겟 챌린지 이벤트 후반 (불꽃숭이 + 토게피)",
        pt: "Evento Escolha Misteriosa (Pt. 2) (Chimchar + Togepi)",
        zh: "得卡挑戰活動 後半 (小火焰猴 + 波克比)",
      },
      pos: "8% 58%",
      zoom: "370%",
      image: "wonder_pick_chimchar_2.webp",
      start: "2025-02-14 06:00:00",
      end: "2025-02-21 05:59:00",
      color: "#F3927C",
      urls: {
        en: [
          //"https://www.pokemon.com/us/pokemon-news/charmander-and-squirtle-star-in-this-pokemon-tcg-pocket-wonder-pick-event",
          "https://ptcgpocket.gg/wonder-pick-event-part-2-chimchar-togepi/",
          "https://www.pokemon-zone.com/events/chimchar-togepi-wonderpick/",
         // "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_EVENT_02",
        ],
        fr: [
         // "https://www.pokemon.com/fr/actus-pokemon/salameche-et-carapuce-sont-a-laffiche-dun-evenement-pioche-miracle-dans-le-jcc-pokemon-pocket",
          //"https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EVENT_02",
        ],
        de: [
          //"https://www.pokemon.com/de/pokemon-news/glumanda-und-schiggy-erscheinen-in-diesem-wunderwahl-event-in-pokemon-sammelkartenspiel-pocket",
        ],
        zh: [
          //"https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ja: [
         // "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EVENT_02",
        ],
        ko: [
          //"https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EVENT_02",
        ],
        es: [
          //"https://www.pokemon.com/es/noticias-pokemon/charmander-y-squirtle-protagonizan-un-evento-eleccion-magica-en-jcc-pokemon-pocket",
        ],
        it: [
          //"https://www.pokemon.com/it/novita-pokemon/charmander-e-squirtle-sono-i-protagonisti-di-un-nuovo-evento-pesca-misteriosa-nel-gcc-pokemon-pocket",
        ],
      },
      showOnHome: true,
    },
    
  ],
  [
    {
      name: {
        en: "Genetic Apex Emblem Event 1",
        fr: "Évènement insigne Puissance Génétique 1",
        zh: "最強的基因 勳章活動1",
        ja: "最強の遺伝子 エンブレムイベント1",
        ko: "최강의 유전자 엠블럼 이벤트1",
      },
      pos: "50% 15%",
      zoom: "100%",
      image: "genetic_apex_emblem_event.png",
      start: "2024-11-07 06:00:00",
      end: "2024-11-28 05:59:00",
      color: "#6d21ed",
      urls: {
        en: [
          "https://ptcgpocket.gg/genetic-apex-emblem-event-1",
          "https://www.pokemon-zone.com/events/pvp-emblem-event-1/",
          "https://www.serebii.net/tcgpocket/events/geneticapexemblemevent1.shtml",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_0002010_EMBLEM_01",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_0002010_EMBLEM_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_0002010_EMBLEM_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_0002010_EMBLEM_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_0002010_EMBLEM_01",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Genetic Apex SP Emblem Event 1",
        fr: "Évènement insigne Puissance Génétique SP 1",
        zh: "最強的基因 勳章活動1 SP",
        ja: "最強の遺伝子 エンブレムイベント1 SP",
        ko: "최강의 유전자 엠블럼 이벤트1 SP",
      },
      pos: "0% 20%",
      zoom: "100%",
      image: "genetic_apex_sp_emblem_event.jpg",
      start: "2024-12-09 06:00:00",
      end: "2024-12-16 06:00:00",
      color: "#6d21ed",
      urls: {
        en: [
          "https://ptcgpocket.gg/genetic-apex-sp-emblem-event-1/",
          "https://www.pokemon-zone.com/events/genetic-apex-sp-emblem-event-1/",
          "https://www.serebii.net/tcgpocket/events/geneticapexspemblemevent1.shtml",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_0002010_EMBLEM_02",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_0002010_EMBLEM_02",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_0002010_EMBLEM_02",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_0002010_EMBLEM_02",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_0002010_EMBLEM_02",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Mythical Island Emblem Event",
        fr: "Évènement insigne L'Île Fabuleuse",
        zh: "幻遊島 勳章活動",
        ja: "幻のいる島 エンブレムイベント",
        ko: "환상이 있는 섬 엠블럼 이벤트",
      },
      pos: "50% 30%",
      zoom: "100%",
      image: "mythical_island_emblem_event.png",
      start: "2024-12-20 06:00:00",
      end: "2025-01-10 05:59:00",
      color: "#0ecc83",
      urls: {
        en: [
          "https://ptcgpocket.gg/mythical-island-emblem-event/",
          "https://www.pokemon-zone.com/events/mythical-island-emblem-event/",
          "https://www.serebii.net/tcgpocket/events/mythicalislandemblemevent.shtml",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Mythical Island SP Emblem Event",
        fr: "Évènement insigne L'Île Fabuleuse SP",
        zh: "幻遊島 勳章活動SP",
        ja: "幻のいる島 エンブレムイベントSP",
        ko: "환상이 있는 섬 엠블럼 이벤트 SP",
      },
      pos: "50% 30%",
      zoom: "100%",
      image: "mythical_island_sp_emblem_event.png",
      start: "2025-01-20 06:00:00",
      end: "2025-01-27 05:59:00",
      color: "#0ecc83",
      urls: {
        en: [
          "https://ptcgpocket.gg/mythical-island-sp-emblem-event/",
          "https://www.pokemon-zone.com/events/mythical-island-sp-emblem-event/",
          "https://ptcgp.raenonx.cc/en/battle/pvp-emblem/4",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
      },
      showOnHome: true,
    },{
      name: {
        de: "Emblem-Event (Kollision von Raum und Zeit)",
        en: "Space-Time Smackdown Emblem Event",
        es: "Evento emblema Pugna Espaciotemporal",
        fr: "Évènement insigne Choc Spatio-Temporel",
        it: "Scontro Spaziotemporale: evento emblema",
        ja: "時空の激闘 エンブレムイベント",
        ko: "시공의 격투 엠블럼 이벤트",
        pt: "Evento de Emblema Embate do Tempo e Espaço",
        zh: "時空激鬥 勳章活動",
      },
      pos: "50% 30%",
      zoom: "100%",
      image: "Space-Time_Smackdown_emblem_event.png",
      start: "2025-02-04 06:00:00",
      end: "2025-02-25 05:59:00",
      color: "#7E8494",
      urls: {
        en: [
          "https://ptcgpocket.gg/space-time-smackdown-emblem-event/",
          "https://www.pokemon-zone.com/events/space-time-smackdown-emblem-event/",
          "https://www.serebii.net/tcgpocket/events/mythicalislandemblemevent.shtml",
        ],
        fr: [
          //"https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        zh: [
          //"https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        ja: [
          //"https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
        ko: [
          //"https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EMBLEM_01",
        ],
      },
      showOnHome: true,
    },
    {
      // Space-Time Smackdown SP Emblem Event WIP
      name: {
        en: "Mythical Island SP Emblem Event",
        fr: "Évènement insigne L'Île Fabuleuse SP",
        zh: "幻遊島 勳章活動SP",
        ja: "幻のいる島 エンブレムイベントSP",
        ko: "환상이 있는 섬 엠블럼 이벤트 SP",
      },
      pos: "50% 30%",
      zoom: "100%",
      image: "mythical_island_sp_emblem_event.png",
      start: "2025-01-20 06:00:00",
      end: "2025-01-27 05:59:00",
      color: "#0ecc83",
      urls: {
        en: [
          "https://ptcgpocket.gg/mythical-island-sp-emblem-event/",
          "https://www.pokemon-zone.com/events/mythical-island-sp-emblem-event/",
          "https://ptcgp.raenonx.cc/en/battle/pvp-emblem/4",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_EMBLEM_02",
        ],
      },
      showOnHome: false,
    },
  ],
  [
    {
      name: {
        en: "Holiday Countdown Campaign",
        ja: "ホリデーカウントダウンキャンペーン",
        zh: "节日倒计时活动",
        ko: "홀리데이 카운트다운 캠페인",
        fr: "Campagne de Compte à Rebours des Fêtes",
        de: "Ferien-Countdown-Kampagne",
        es: "Campaña de Cuenta Regresiva Festiva",
        it: "Campagna Conto alla Rovescia Festivo",
        pt: "Campanha de Contagem Regressiva de Feriado",
      },
      pos: "0% 30%",
      zoom: "100%",
      image: "Pokemon-TCG-Pocket-Holiday-Countdown-Campaign.jpg",
      start: "2024-12-17 06:00:00",
      end: "2024-12-20 05:59:00",
      color: "#67bce6",
      urls: {
        en: ["https://ptcgpocket.gg/holiday-countdown-campaign/"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Holiday Event",
        fr: "Évènement des fêtes",
        zh: "佳節活動",
        ja: "ホリデーイベント",
        ko: "홀리데이 이벤트",
      },
      pos: "90% 10%",
      zoom: "600%",
      image: "Holiday-event-log-in-missions.webp",
      start: "2024-12-25 06:00:00",
      end: "2025-01-01 05:59:00",
      color: "#e87d3c",
      urls: {
        en: [
          "https://ptcgpocket.gg/holiday-event/",
          "https://www.pokemon-zone.com/events/holiday-2024-event-missions/",
          "https://www.serebii.net/tcgpocket/events/holidayeventmissions.shtml",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_HOLIDAY_01",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_HOLIDAY_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_HOLIDAY_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_HOLIDAY_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_HOLIDAY_01",
        ],
      },
      description: {
        en: "free Mythical Island booster pack or 12 Pack Hourglasses every day for 7 days",
      },
      showOnHome: true,
    },
    {
      name: {
        en: "New Year Event",
        fr: "Évènement du Nouvel An",
        zh: "新年活動",
        ja: "ニューイヤーイベント",
        ko: "뉴 이어 이벤트",
      },
      pos: "20% 30%",
      zoom: "150%",
      image: "new_year_event_2024.jpg",
      start: "2025-01-01 06:00:00",
      end: "2025-01-08 05:59:00",
      color: "#f9d60b",
      urls: {
        en: [
          "https://ptcgpocket.gg/new-year-event/",
          "https://www.pokemon-zone.com/events/new-year-2025-event-missions/",
          "https://ptcgp.raenonx.cc/en/mission/group/MI_GR_2408010_NEWYEAR_01",
          "https://www.serebii.net/tcgpocket/events/newyeareventmissions.shtml",
        ],
        fr: [
          "https://ptcgp.raenonx.cc/fr/mission/group/MI_GR_2408010_NEWYEAR_01",
        ],
        zh: [
          "https://ptcgp.raenonx.cc/zh/mission/group/MI_GR_2408010_NEWYEAR_01",
        ],
        ja: [
          "https://ptcgp.raenonx.cc/ja/mission/group/MI_GR_2408010_NEWYEAR_01",
        ],
        ko: [
          "https://ptcgp.raenonx.cc/ko/mission/group/MI_GR_2408010_NEWYEAR_01",
        ],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "A Gift from the developer team, Pokédex - Promo-A-08",
        fr: "Un cadeau de l'équipe développeur, Pokédex - Promo-A-08",
        zh: "開發者團隊的禮物, 寶可夢圖鑑 - Promo-A-08",
        ja: "開発者チームからのプレゼント, ポケモン図鑑 - Promo-A-08",
        ko: "개발자 팀의 선물, 포켓몬 도감 - Promo-A-08",
      },
      pos: "15% 30%",
      zoom: "120%",
      image: "dev_gift.webp",
      start: "2025-01-20 06:00:00",
      end: "2025-04-30 05:59:00",
      color: "#E35A34",
      description: {
        en: "To celebrate achieving 40 billion cards acquired by Pokémon Trading Card Game Pocket players worldwide, players have been gifted the Pokédex - Promo-A-08 card!",
        fr: "Pour célébrer l'acquisition de 40 milliards de cartes par les joueurs de Pokémon Trading Card Game Pocket dans le monde entier, les joueurs ont reçu la carte Pokédex - Promo-A-08 !",
        zh: "為慶祝全球寶可夢集換式卡牌遊戲Pocket玩家共獲得40億張卡牌，玩家們獲得了寶可夢圖鑑 - Promo-A-08卡片！",
        ja: "ポケモンカードゲームポケットのプレイヤーが全世界で40億枚のカードを獲得したことを祝うために、プレイヤーにはポケモン図鑑 - Promo-A-08カードが贈られました！",
        ko: "전 세계 포켓몬 카드 게임 포켓 플레이어들이 400억 장의 카드를 획득한 것을 기념하기 위해, 플레이어들에게 포켓몬 도감 - Promo-A-08 카드가 선물되었습니다！",
      },
      urls: {
        en: [
          "https://ptcgpocket.gg/promo-pokedex/",
          "https://www.pokemon-zone.com/events/pokedex-present/",
        ],
      },
      showOnHome: true,
    },
  ],
  [{
    name: {
      de: "Münze (Erika) + Boni A | Münze (Erika) + Boni B",
      en: "Pokémon coin (Erika) + Bonuses A | Pokémon coin (Erika) + Bonuses B",
      es: "Moneda Erika + extras A | Moneda Erika + extras B",
      fr: "Pièce Pokémon - Erika + bonus A | Pièce Pokémon - Erika + bonus B",
      it: "Erika (moneta) + extra A | Erika (moneta) + extra B",
      ja: "おまけつきポケモンコイン(エリカ)A | おまけつきポケモンコイン(エリカ)B",
      ko: "포켓몬 동전(민화) + 증정분 A | 포켓몬 동전(민화) + 증정분 B",
      pt: "Moeda de Pokémon (Érica) + Bônus A | Moeda de Pokémon (Érica) + Bônus B",
      zh: "附好禮寶可夢幣（莉佳）A | 附好禮寶可夢幣（莉佳）B",
    },
    pos: "0% 20%",
    zoom: "310%",
    image: "pokemon_coin_erika_bonuses_a_b.webp",
    start: "2024-10-30 19:00:00",
    end: "2025-01-30 05:59:00",
    color: "#d7dee8",
    urls: {
      //en: ["https://example.com"],
    },
    showOnHome: true,
  },
    {  
      name: {
    en: "Trade Feature Celebration Gift",
    de: "Geschenk zur Feier der Tauschfunktion",
    es: "Regalo de celebración por la función de intercambio",
    fr: "Cadeau de célébration de la fonction Échange",
    it: "Regalo per la celebrazione della funzione Scambio",
    ja: "トレード機能記念ギフト",
    ko: "트레이드 기능 기념 선물",
    pt: "Presente de Celebração da Função de Troca",
    zh: "交換功能慶祝禮物",
  },
  pos: "15% 30%",
  zoom: "120%",
  image: "Trade.webp",
  start: "2025-01-30 06:00:00",
  end: "2025-03-27 05:59:00",
  color: "#3DC742",
  description: {
    en: "To mark the debut of the Pokémon TCG Pocket's Trade feature, players will be gifted items to elevate their trading experience: 120 Trade Hourglasses and 500 Trade Tokens.",
de: "Zum Start des Pokémon TCG Pocket Tausch-Features erhalten Spieler Geschenke, um ihr Tauscherlebnis zu verbessern: 120 Tausch-Sanduhren und 500 Tausch-Marken.",
es: "Para celebrar el debut de la función de intercambio en Pokémon TCG Pocket, los jugadores recibirán artículos para mejorar su experiencia de intercambio: 120 Relojes de arena de intercambio y 500 Fichas de intercambio.",
fr: "Pour marquer le lancement de la fonction Échange de Pokémon TCG Pocket, les joueurs recevront des objets pour améliorer leur expérience : 120 Sabliers Échange et 500 Jetons Échange.",
it: "Per celebrare il debutto della funzione Scambio in Pokémon TCG Pocket, i giocatori riceveranno oggetti per migliorare la loro esperienza: 120 Clessidre scambio e 500 Gettoni scambio.",
ja: "ポケモンTCGポケットのトレード機能の開始を記念して、プレイヤーにトレード体験を高めるためのアイテムを贈呈します：トレード砂時計120個、トレードメダル500個。",
ko: "포켓몬 TCG 포켓의 트레이드 기능 출시를 기념하여 플레이어들에게 트레이드 경험을 향상시키기 위한 아이템이 지급됩니다: 트레이드 모래시계 120개 및 트레이드 메달 500개.",
pt: "Para marcar o lançamento da função de Troca do Pokémon TCG Pocket, os jogadores receberão itens para melhorar sua experiência de troca: 120 Ampulhetas de Troca e 500 Tokens de Troca.",
zh: "為慶祝 Pokémon TCG Pocket 交換功能的推出，玩家將獲得提升交換體驗的道具：120 個交換沙漏和 500 個交換代幣。"
},
  urls: {
    en: [
      "https://ptcgpocket.gg/trade-feature-celebration-gift/",
      //"https://www.pokemon-zone.com/events/pokedex-present/",
    ],
  },
  showOnHome: true,
  
},
],
[
  
],
  [
    {
      name: {
        en: "Premium Pass – October 2024",
        ja: "プレミアムパス – 2024年10月",
        zh: "尊贵通行证 – 2024年10月",
        ko: "프리미엄 패스 – 2024년 10월",
        fr: "Pass Premium - Octobre 2024",
        de: "Premium Pass - Oktober 2024",
        es: "Pase Premium - Octubre 2024",
        it: "Pass Premium - Ottobre 2024",
        pt: "Passe Premium - Outubro 2024",
      },
      pos: "10% 45%",
      zoom: "500%",
      image: "premium-pass-oct-2024.webp",
      start: "2024-10-30 19:00:00",
      end: "2024-12-01 05:59:00",
      color: "#7C8FBA",
      urls: {
        en: ["https://ptcgpocket.gg/premium-pass-october-2024/"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Premium Pass - December 2024",
        ja: "プレミアムパス - 2024年12月",
        zh: "尊贵通行证 - 2024年12月",
        ko: "프리미엄 패스 - 2024년 12월",
        fr: "Pass Premium - Décembre 2024",
        de: "Premium Pass - Dezember 2024",
        es: "Pase Premium - Diciembre 2024",
        it: "Pass Premium - Dicembre 2024",
        pt: "Passe Premium - Dezembro 2024",
      },
      pos: "0% 40%",
      zoom: "100%",
      image: "Premium_Pass_December_2024.jpeg",
      start: "2024-12-01 06:00:00",
      end: "2025-01-01 05:59:00",
      color: "#b2adbd",
      urls: {
        //en: ["https://example.com"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Premium Pass - January 2025",
        ja: "プレミアムパス - 2025年1月",
        zh: "尊贵通行证 - 2025年1月",
        ko: "프리미엄 패스 - 2025년 1월",
        fr: "Pass Premium - Janvier 2025",
        de: "Premium Pass - Januar 2025",
        es: "Pase Premium - Enero 2025",
        it: "Pass Premium - Gennaio 2025",
        pt: "Passe Premium - Janeiro 2025",
      },
      pos: "12% 58%",
      zoom: "300%",
      image: "Premium_Pass_January_2025.png",
      start: "2025-01-01 06:00:00",
      end: "2025-02-01 05:59:00",
      color: "#ff4a02",
      urls: {
        //en: ["https://example.com"],
      },
      showOnHome: true,
    },
    {
      name: {
        en: "Premium Pass - February 2025",
        ja: "プレミアムパス - 2025年2月",
        zh: "尊贵通行证 - 2025年2月",
        ko: "프리미엄 패스 - 2025년 2월",
        fr: "Pass Premium - Février 2025",
        de: "Premium Pass - Februar 2025",
        es: "Pase Premium - Febrero 2025",
        it: "Pass Premium - Febbraio 2025",
        pt: "Passe Premium - Fevereiro 2025",
      },
      pos: "12% 50%",
      zoom: "300%",
      image: "Premium_Pass_February_2025.webp",
      start: "2025-02-01 06:00:00",
      end: "2025-03-03 05:59:00",
      color: "#4A93D4",
      urls: {
        en: [
          "https://ptcgpocket.gg/premium-pass-february-2025/",
          "https://www.pokemon-zone.com/events/february-2025-premium-shop/",
        ],
      },
      showOnHome: true,
    },
  ],
  
  [
    {
      name: {
        de: "PokéGold (gekauft) × 115 + Zubehör (Guardevoir)",
        en: "Poké Gold (paid) ×115 + Accessories (Gardevoir)",
        es: "Pokélingote (de pago) ×115 + accesorios Gardevoir",
        fr: "Poké Lingots (payants) × 115 + Accessoires (Gardevoir)",
        it: "Pokélingotti (a pagamento) ×115 + accessori (Gardevoir)",
        ja: "周辺グッズ「サーナイト」つきポケゴールド(有償)×115",
        ko: "포켓골드(유료)×115 + 주변 상품 「가디안」",
        pt: "Pokéouro (Pago) ×115 + Acessórios (Gardevoir)",
        zh: "寶可金塊（付費）（附贈周邊物品「沙奈朵」）×115",
      },
      pos: "40% 15%",
      zoom: "400%",
      image: "poke_gold_paid_x115_accessories_gardevoir.webp",
      start: "2024-10-30 19:00:00",
      end: "2025-01-30 05:59:00",
      color: "#f6ee5a",
      urls: {
        en: ["https://ptcgp.raenonx.cc/en/shop/poke-gold/SH_CG_PG_002"],
      },
      showOnHome: true,
    },
    {
      name: {
        de: "PokéGold (gekauft) × 115 + Zubehör (Cynthia)",
        en: "Poké Gold (paid) ×115 + Accessories (Cynthia)",
        es: "Pokélingote (de pago) ×115 + accesorios Cintia",
        fr: "Poké Lingots (payants) × 115 + Accessoires (Cynthia)",
        it: "Pokélingotti (a pagamento) ×115 + accessori (Camilla)",
        ja: "周辺グッズ「シロナ」つきポケゴールド(有償)×115",
        ko: "포켓골드(유료)×115 + 주변 상품 「난천」",
        pt: "Pokéouro (pago) ×115 + Acessórios (Cíntia)",
        zh: "寶可金塊（付費）（附贈周邊物品「竹蘭」）×115",
      },
      pos: "40% 15%",
      zoom: "400%",
      image: "poke_gold_paid_x115_accessories_cynthia.webp",
      start: "2025-01-30 06:00:00",
      end: "2025-04-30 05:59:00",
      color: "#f6ee5a",
      urls: {
        en: ["https://ptcgpocket.gg/cynthia-bundle/"],
      },
      showOnHome: true,
    },
  ],
];
