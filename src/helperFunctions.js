import { CARD_FAMILY } from "./card";

// Forms a sorted deck from which to start
export const DECK_TEMPLATE = new Array(52).fill(null).map((item, index) => {
  const card = {};
  if (index < 13) {
    card.value = index + 1;
    card.family = CARD_FAMILY.CLUB;
    return card;
  }
  if (index < 26) {
    card.value = index - 13 + 1;
    card.family = CARD_FAMILY.DIAMOND;
    return card;
  }
  if (index < 39) {
    card.value = index - 26 + 1;
    card.family = CARD_FAMILY.HEART;
    return card;
  }

  card.value = index - 39 + 1;
  card.family = CARD_FAMILY.SPADE;
  return card;
});

export const shuffelDeck = () => {
    // Copy template so we can shuffel a new deck
    const deck = [...DECK_TEMPLATE];

  // function that performs the swap
  const swap = (a, b) => {
    let holder = deck[a];
    deck[a] = deck[b];
    deck[b] = holder;
  }

  // Shuffel deck data using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * i) + 1;
    swap(random,i)
  }
  // This implementation of Fisher-Yates doesn't sort the first
  // item, so I'm making this adjustment
  const newFirstIdx = Math.floor(Math.random()*52);
  swap(0, newFirstIdx);
  return deck;
};

// since calculating a straight and pair is irrespective
// of suit I will count each card w the same value
// and use the count do calculate the hand's score
export const scoreHand = hand => {
  // array to hold the counts of each card number type
  const handCount = new Array(13).fill(0);
  // count like values
  hand.forEach(card => handCount[card.value - 1]++);
  let straightCount = 0;
  let pairCount = 0;
  // based on counts tally up straights and pairs, score appropriately
  // and return max
  for (let i = 0; i < handCount.length; i++) {
    const card = handCount[i];
    if (card > 1) {
      pairCount += Math.floor(card / 2);
    }
    if (card >= 1 && straightCount < 4) {
      straightCount++;
    } else if (straightCount !== 4 && card === 0) {
      straightCount = 0;
    }
  }
  const pairScore = pairCount * 100;
  const straightScore = Math.floor(straightCount / 4) * 500;
  return pairScore > straightScore ? pairScore : straightScore;
};
