/**
 * Vier niveaus, elk met ALLE 24 dieren.
 * snapMinutes bepaalt welke minuutposities geldig zijn.
 * minuteFixed: true = minutenwijzer staat vast op 0 (niveau 1).
 *
 * Dierenvolgorde (gesorteerd op "levensritme"):
 *   1-6   : olifant, aap, leeuw, pinguin, giraf, beer      (originele niveau-1 dieren)
 *   7-12  : haan, paard, nijlpaard, kameel, flamingo, krokodil (originele niveau-2)
 *   13-18 : papegaai, zebra, kangoeroe, luiaard, uil, vos   (originele niveau-3)
 *   19-24 : bij, vlinder, schildpad, koe, egel, vleermuis   (originele niveau-4)
 * De tussentijdse beloningsschermen verschijnen na dier 6, 12 en 18.
 */

// ─── Basisgegevens per dier (hetzelfde op elk niveau) ──────────────────────
const BASE = [
  // 1
  {
    id: 'olifant', emoji: '🐘', name: 'de olifant',
    bg: 'from-yellow-200 to-amber-300', scene: '🌾🌿',
    instruction: 'De olifant heeft honger! Zet de klok op {tijd}.',
    celebration: 'De olifant eet lekker! 🎉',
  },
  // 2
  {
    id: 'aap', emoji: '🐒', name: 'de aap',
    bg: 'from-green-200 to-emerald-300', scene: '🌴🌳',
    instruction: 'De aap wil spelen! Zet de klok op {tijd}.',
    celebration: 'De aap slingert vrolijk! 🎉',
  },
  // 3
  {
    id: 'leeuw', emoji: '🦁', name: 'de leeuw',
    bg: 'from-orange-200 to-yellow-300', scene: '🌵☀️',
    instruction: 'De leeuw krijgt zijn lunch! Zet de klok op {tijd}.',
    celebration: 'De leeuw brult van blijdschap! 🎉',
  },
  // 4
  {
    id: 'pinguin', emoji: '🐧', name: 'de pinguïn',
    bg: 'from-blue-200 to-cyan-300', scene: '🧊❄️',
    instruction: 'De pinguïn wil zwemmen! Zet de klok op {tijd}.',
    celebration: 'De pinguïn duikt het water in! 🎉',
  },
  // 5
  {
    id: 'giraf', emoji: '🦒', name: 'de giraf',
    bg: 'from-lime-200 to-green-300', scene: '🌳🍃',
    instruction: 'De giraf wil bladeren! Zet de klok op {tijd}.',
    celebration: 'De giraf eet de lekkerste blaadjes! 🎉',
  },
  // 6
  {
    id: 'beer', emoji: '🐻', name: 'de beer',
    bg: 'from-purple-200 to-indigo-300', scene: '🌙⭐',
    instruction: 'De beer wil slapen! Zet de klok op {tijd}.',
    celebration: 'De beer slaapt lekker! 🎉',
  },

  // 7
  {
    id: 'haan', emoji: '🐓', name: 'de haan',
    bg: 'from-rose-200 to-orange-300', scene: '🌅🌾',
    instruction: 'De haan wordt wakker! Zet de klok op {tijd}.',
    celebration: 'De haan kraait keihard! 🎉',
  },
  // 8
  {
    id: 'paard', emoji: '🐴', name: 'het paard',
    bg: 'from-amber-200 to-yellow-300', scene: '🌿🏕️',
    instruction: 'Het paard wil borstelen! Zet de klok op {tijd}.',
    celebration: 'Het paard glinstert mooi! 🎉',
  },
  // 9
  {
    id: 'nijlpaard', emoji: '🦛', name: 'het nijlpaard',
    bg: 'from-teal-200 to-cyan-300', scene: '💧🌊',
    instruction: 'Het nijlpaard neemt een modderbad! Zet de klok op {tijd}.',
    celebration: 'Het nijlpaard plonst vrolijk! 🎉',
  },
  // 10
  {
    id: 'kameel', emoji: '🐪', name: 'de kameel',
    bg: 'from-yellow-200 to-amber-300', scene: '🏜️☀️',
    instruction: 'De kameel krijgt water! Zet de klok op {tijd}.',
    celebration: 'De kameel drinkt lekker! 🎉',
  },
  // 11
  {
    id: 'flamingo', emoji: '🦩', name: 'de flamingo',
    bg: 'from-pink-200 to-rose-300', scene: '🌸💐',
    instruction: 'De flamingo doet een dansje! Zet de klok op {tijd}.',
    celebration: 'De flamingo danst prachtig! 🎉',
  },
  // 12
  {
    id: 'krokodil', emoji: '🐊', name: 'de krokodil',
    bg: 'from-green-200 to-emerald-300', scene: '🌿🦟',
    instruction: 'De krokodil krijgt een tandenpoetsbeurt! Zet de klok op {tijd}.',
    celebration: 'De krokodil heeft glanzende tanden! 🎉',
  },

  // 13
  {
    id: 'papegaai', emoji: '🦜', name: 'de papegaai',
    bg: 'from-green-200 to-teal-300', scene: '🌴🌺',
    instruction: 'De papegaai leert een nieuw woord! Zet de klok op {tijd}.',
    celebration: 'Hallo hallo! zegt de papegaai! 🎉',
  },
  // 14
  {
    id: 'zebra', emoji: '🦓', name: 'de zebra',
    bg: 'from-gray-200 to-slate-300', scene: '🌾🌿',
    instruction: 'De zebra wordt geteld! Zet de klok op {tijd}.',
    celebration: 'Zoveel strepen! 🎉',
  },
  // 15
  {
    id: 'kangoeroe', emoji: '🦘', name: 'de kangoeroe',
    bg: 'from-orange-200 to-amber-300', scene: '🌵🏕️',
    instruction: 'De kangoeroe doet hop-oefeningen! Zet de klok op {tijd}.',
    celebration: 'Hop hop hop! 🎉',
  },
  // 16
  {
    id: 'luiaard', emoji: '🦥', name: 'de luiaard',
    bg: 'from-lime-200 to-green-300', scene: '🌳😴',
    instruction: 'De luiaard wordt wakker gemaakt! Zet de klok op {tijd}.',
    celebration: 'De luiaard strekt zich uit! 🎉',
  },
  // 17
  {
    id: 'uil', emoji: '🦉', name: 'de uil',
    bg: 'from-indigo-200 to-purple-300', scene: '🌙🍂',
    instruction: 'De uil oefent zijn oehoe! Zet de klok op {tijd}.',
    celebration: 'Oehoe oehoe! 🎉',
  },
  // 18
  {
    id: 'vos', emoji: '🦊', name: 'de vos',
    bg: 'from-orange-200 to-red-300', scene: '🌙🍃',
    instruction: 'De vos sluipt naar zijn hol! Zet de klok op {tijd}.',
    celebration: 'De vos is veilig thuis! 🎉',
  },

  // 19
  {
    id: 'bij', emoji: '🐝', name: 'de bij',
    bg: 'from-yellow-200 to-amber-300', scene: '🌸🌼',
    instruction: 'De bij begint met honing maken! Zet de klok op {tijd}.',
    celebration: 'Zoem zoem! De bij is aan het werk! 🎉',
  },
  // 20
  {
    id: 'vlinder', emoji: '🦋', name: 'de vlinder',
    bg: 'from-purple-200 to-pink-300', scene: '🌺🌸',
    instruction: 'De vlinder vouwt zijn vleugels open! Zet de klok op {tijd}.',
    celebration: 'Wat een mooie vleugels! 🎉',
  },
  // 21
  {
    id: 'schildpad', emoji: '🐢', name: 'de schildpad',
    bg: 'from-green-200 to-teal-300', scene: '🌿🐌',
    instruction: 'De schildpad begint zijn wandeling! Zet de klok op {tijd}.',
    celebration: 'Langzaam maar zeker! 🎉',
  },
  // 22
  {
    id: 'koe', emoji: '🐄', name: 'de koe',
    bg: 'from-green-200 to-lime-300', scene: '🌾🏡',
    instruction: 'De koe krijgt vers gras! Zet de klok op {tijd}.',
    celebration: 'Moe moe! lekker gras! 🎉',
  },
  // 23
  {
    id: 'egel', emoji: '🦔', name: 'de egel',
    bg: 'from-amber-200 to-orange-300', scene: '🍂🍁',
    instruction: 'De egel zoekt blaadjes! Zet de klok op {tijd}.',
    celebration: 'Wat een prikkelig beestje! 🎉',
  },
  // 24
  {
    id: 'vleermuis', emoji: '🦇', name: 'de vleermuis',
    bg: 'from-indigo-200 to-purple-300', scene: '🌙⭐',
    instruction: 'De vleermuis vliegt uit! Zet de klok op {tijd}.',
    celebration: 'Fladder fladder door de nacht! 🎉',
  },
]

// ─── Tijden per niveau ───────────────────────────────────────────────────────
// Volgorde: zelfde als BASE (olifant … vleermuis).
// Alle (hour, minute) combinaties zijn uniek binnen elk niveau.

/** Niveau 1 — Hele uren (minute altijd 0, alle 24 uur-waarden uniek 0-23) */
const L1 = [
  { hour:  8, minute:  0 },  // olifant
  { hour: 11, minute:  0 },  // aap
  { hour: 12, minute:  0 },  // leeuw
  { hour: 14, minute:  0 },  // pinguin
  { hour: 16, minute:  0 },  // giraf
  { hour: 21, minute:  0 },  // beer
  { hour:  5, minute:  0 },  // haan
  { hour: 10, minute:  0 },  // paard
  { hour: 17, minute:  0 },  // nijlpaard
  { hour: 13, minute:  0 },  // kameel
  { hour: 15, minute:  0 },  // flamingo
  { hour: 20, minute:  0 },  // krokodil
  { hour:  7, minute:  0 },  // papegaai
  { hour: 18, minute:  0 },  // zebra
  { hour: 19, minute:  0 },  // kangoeroe
  { hour: 23, minute:  0 },  // luiaard
  { hour:  2, minute:  0 },  // uil
  { hour:  3, minute:  0 },  // vos
  { hour:  6, minute:  0 },  // bij
  { hour:  9, minute:  0 },  // vlinder
  { hour:  4, minute:  0 },  // schildpad
  { hour: 22, minute:  0 },  // koe
  { hour:  1, minute:  0 },  // egel
  { hour:  0, minute:  0 },  // vleermuis
]

/** Niveau 2 — Halve uren (minute 0 of 30, alle 24 paren uniek) */
const L2 = [
  { hour:  8, minute: 30 },  // olifant
  { hour: 10, minute:  0 },  // aap
  { hour: 12, minute: 30 },  // leeuw
  { hour: 14, minute:  0 },  // pinguin
  { hour: 15, minute: 30 },  // giraf
  { hour: 20, minute:  0 },  // beer
  { hour:  5, minute: 30 },  // haan
  { hour:  9, minute:  0 },  // paard
  { hour: 11, minute:  0 },  // nijlpaard
  { hour: 13, minute:  0 },  // kameel
  { hour: 16, minute:  0 },  // flamingo
  { hour: 17, minute: 30 },  // krokodil
  { hour:  7, minute:  0 },  // papegaai
  { hour: 18, minute: 30 },  // zebra
  { hour: 19, minute: 30 },  // kangoeroe
  { hour: 22, minute: 30 },  // luiaard
  { hour: 21, minute: 30 },  // uil
  { hour: 23, minute: 30 },  // vos
  { hour:  6, minute: 30 },  // bij
  { hour:  9, minute: 30 },  // vlinder
  { hour:  4, minute: 30 },  // schildpad
  { hour: 22, minute:  0 },  // koe
  { hour:  0, minute: 30 },  // egel
  { hour:  1, minute:  0 },  // vleermuis
]

/** Niveau 3 — Kwartieren (minute 0/15/30/45, alle 24 paren uniek) */
const L3 = [
  { hour:  8, minute: 15 },  // olifant
  { hour: 10, minute: 45 },  // aap
  { hour: 12, minute:  0 },  // leeuw
  { hour: 14, minute: 15 },  // pinguin
  { hour: 16, minute: 30 },  // giraf
  { hour: 20, minute: 45 },  // beer
  { hour:  5, minute: 45 },  // haan
  { hour:  9, minute: 15 },  // paard
  { hour: 11, minute: 30 },  // nijlpaard
  { hour: 13, minute: 45 },  // kameel
  { hour: 15, minute: 15 },  // flamingo
  { hour: 17, minute: 45 },  // krokodil
  { hour:  7, minute: 30 },  // papegaai
  { hour: 18, minute: 15 },  // zebra
  { hour: 19, minute:  0 },  // kangoeroe
  { hour: 22, minute: 45 },  // luiaard
  { hour: 21, minute: 15 },  // uil
  { hour: 23, minute: 45 },  // vos
  { hour:  6, minute: 15 },  // bij
  { hour: 10, minute:  0 },  // vlinder
  { hour:  4, minute: 45 },  // schildpad
  { hour: 22, minute: 15 },  // koe
  { hour:  0, minute: 15 },  // egel
  { hour:  1, minute: 45 },  // vleermuis
]

/** Niveau 4 — Per 5 minuten (minute ∈ {0,5,10,…,55}, alle 24 paren uniek) */
const L4 = [
  { hour:  8, minute:  5 },  // olifant
  { hour: 10, minute: 20 },  // aap
  { hour: 12, minute: 35 },  // leeuw
  { hour: 14, minute: 50 },  // pinguin
  { hour: 16, minute: 10 },  // giraf
  { hour: 20, minute: 25 },  // beer
  { hour:  5, minute: 40 },  // haan
  { hour:  9, minute: 55 },  // paard
  { hour: 11, minute: 15 },  // nijlpaard
  { hour: 13, minute: 30 },  // kameel
  { hour: 15, minute: 45 },  // flamingo
  { hour: 17, minute:  0 },  // krokodil
  { hour:  7, minute: 25 },  // papegaai
  { hour: 18, minute: 40 },  // zebra
  { hour: 19, minute: 55 },  // kangoeroe
  { hour: 22, minute: 10 },  // luiaard
  { hour: 21, minute: 50 },  // uil
  { hour: 23, minute:  5 },  // vos
  { hour:  6, minute: 20 },  // bij
  { hour:  9, minute: 35 },  // vlinder
  { hour:  4, minute: 50 },  // schildpad
  { hour: 22, minute: 45 },  // koe
  { hour:  0, minute: 10 },  // egel
  { hour:  1, minute: 30 },  // vleermuis
]

// ─── Samengestelde niveaus ────────────────────────────────────────────────────
export const LEVELS = [
  {
    id: 1,
    name: 'Hele uren',
    description: 'Niveau 1 — Hele uren',
    snapMinutes: [0],
    hourDraggable: true,
    minuteFixed: true,
    animals: BASE.map((a, i) => ({ ...a, ...L1[i] })),
  },
  {
    id: 2,
    name: 'Halve uren',
    description: 'Niveau 2 — Halve uren',
    snapMinutes: [0, 30],
    hourDraggable: true,
    minuteFixed: false,
    animals: BASE.map((a, i) => ({ ...a, ...L2[i] })),
  },
  {
    id: 3,
    name: 'Kwartieren',
    description: 'Niveau 3 — Kwartieren',
    snapMinutes: [0, 15, 30, 45],
    hourDraggable: true,
    minuteFixed: false,
    animals: BASE.map((a, i) => ({ ...a, ...L3[i] })),
  },
  {
    id: 4,
    name: 'Minuten (per 5)',
    description: 'Niveau 4 — Minuten (per 5)',
    snapMinutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    hourDraggable: true,
    minuteFixed: false,
    animals: BASE.map((a, i) => ({ ...a, ...L4[i] })),
  },
]
