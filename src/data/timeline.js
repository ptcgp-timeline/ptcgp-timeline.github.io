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
  officialDomains: ["pokemon.com", "pokemonkorea.co.kr"],
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
        en: "New Expansion A2",
      },
      pos: "10% 40%",
      zoom: "180%",
      image: "not_sure_element.webp",
      start: "2025-01-30 06:00:00",
      end: "2025-07-30 05:59:00",
      color: "#4ed4e4",
      urls: {
        ////en: ["https://example.com"],
      },
      showOnHome: true,
      uncertain: true,
    },
  ],
  [
    {
      name: {
        en: "Venusaur Drop Event",
      },
      pos: "10% 55%",
      zoom: "200%",
      image: "Venusaur_Drop_Event.webp",
      start: "2024-11-29 06:00:00",
      end: "2024-12-13 05:59:00",
      color: "#7be2d1",
      urls: {
        en: [
          "https://ptcgpocket.gg/venusaur-drop-event/",
          "https://www.pokemon-zone.com/events/venusaur-drop-event/",
        ],
      },
      showOnHome: false,
    },
  ],
  [
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
  ],
  [
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
      },
      pos: "20% 30%",
      zoom: "100%",
      image: "psychic_pokemon_mass_outbreak_event_mew_ex.jpg",
      start: "2025-01-23 06:00:00",
      end: "2025-01-29 05:59:00",
      color: "#f7dbe6",
      urls: {
        en: [
          "https://ptcgpocket.gg/psychic-pokemon-mass-outbreak-event-mew-ex/",
          "https://www.pokemon-zone.com/events/psychic-type-pokemon-mass-outbreak/",
        ],
        fr: [
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
  ],
  [
    {
      name: {
        en: "Genetic Apex SP Emblem Event",
      },
      pos: "0% 30%",
      zoom: "100%",
      image: "wonder_pick_bulbasaur_1.jpg",
      start: "2024-12-09 06:00:00",
      end: "2024-12-16 06:00:00",
      color: "#FFFFFF",
      urls: {
        en: [
          "https://ptcgpocket.gg/genetic-apex-sp-emblem-event-1/",
          "https://www.pokemon-zone.com/events/genetic-apex-sp-emblem-event-1/",
          "https://www.serebii.net/tcgpocket/events/geneticapexspemblemevent1.shtml",
        ],
        pt: ["https://ptcgphub.com/pt/evento-emblema-da-ilha-mitica/"],
      },
      showOnHome: false,
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
  ],
  [
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
      pos: "0% 70%",
      zoom: "100%",
      image: "Premium_Pass_January_2025.png",
      start: "2025-01-01 06:00:00",
      end: "2025-02-01 05:59:00",
      color: "#ff4a02",
      urls: {
        //en: ["https://example.com"],
      },
      showOnHome: true,
    },
  ],
  [
    {
      name: {
        en: "Pokémon coin (Erika) + Bonuses A | Pokémon coin (Erika) + Bonuses B",
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
  ],
  [
    {
      name: {
        en: "Poké Gold (paid) x115 + Accessories (Gardevoir)",
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
  ],
];
