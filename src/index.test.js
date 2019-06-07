import { DECK_TEMPLATE, shuffelDeck, scoreHand } from "./helperFunctions";
import { CARD_FAMILY } from "./card";
import Game from "./game";

describe("Data Initiation", () => {
  test("DECK_TEMPLATE formed correctly", () => {
    const familyCount = DECK_TEMPLATE.reduce(
      (acc, item) => {
        acc[item.family]++;
        return acc;
      },
      {
        [CARD_FAMILY.HEART]: 0,
        [CARD_FAMILY.DIAMOND]: 0,
        [CARD_FAMILY.SPADE]: 0,
        [CARD_FAMILY.CLUB]: 0
      }
    );
    expect(familyCount.HEART).toEqual(13);
    expect(familyCount.CLUB).toEqual(13);
    expect(familyCount.SPADE).toEqual(13);
    expect(familyCount.DIAMOND).toEqual(13);
  });

  test("shuffelDeck: randomizes deck data", () => {
    const shuffeledDeck = shuffelDeck();

    let diffCount = 0;

    for (let i = 0; i < 10; i++) {
      const pick = shuffeledDeck[i];
      // Shuffel Definition: over 50% of first 10 must
      // be different than the template
      if (
        pick.family !== DECK_TEMPLATE[i].family ||
        pick.value !== DECK_TEMPLATE[i].value
      ) {
        diffCount++;
      }
    }

    expect(diffCount).toBeGreaterThan(5);
  });
});

describe("Helper Functions", () => {
  test("scoreHand: No Points", () => {
    // no points hand
    // Ace of Clubs, 2 of Diamonds, 5 Hearts, 8 Hearts, 9 of Clubs
    const hand = [
      DECK_TEMPLATE[0],
      DECK_TEMPLATE[14],
      DECK_TEMPLATE[30],
      DECK_TEMPLATE[33],
      DECK_TEMPLATE[8]
    ];
    const handScore = scoreHand(hand);
    expect(handScore).toBe(0);
  });
  test("scoreHand: two pairs", () => {
    // Should have 2 pairs resulting in 200 points
    // Ace of diamonds and clubs
    // 2 of clubs and hearts
    const hand = [
      DECK_TEMPLATE[0],
      DECK_TEMPLATE[13],
      DECK_TEMPLATE[1],
      DECK_TEMPLATE[27],
      DECK_TEMPLATE[8]
    ];
    const handScore = scoreHand(hand);
    expect(handScore).toBe(200);
  });
  test("scoreHand: straight", () => {
    /* 
      straight hand, score should be 500
      cards:
      ace of clubs
      2 of diamonds
      3 of hearts
      4 of spades
      5 of spades
    */
    const hand = [
      DECK_TEMPLATE[0],
      DECK_TEMPLATE[14],
      DECK_TEMPLATE[28],
      DECK_TEMPLATE[42],
      DECK_TEMPLATE[43]
    ];
    const handScore = scoreHand(hand);
    expect(handScore).toBe(500);
  });
  test("scoreHand: returns the greatest value", () => {
    /* 
      straight hand and pair hand, should return score for straight
      
      cards:
      2 of clubs
      2 of diamonds
      3 of hearts
      4 of spades
      5 of spades
    */
    const hand = [
      DECK_TEMPLATE[1],
      DECK_TEMPLATE[14],
      DECK_TEMPLATE[28],
      DECK_TEMPLATE[42],
      DECK_TEMPLATE[43]
    ];
    const handScore = scoreHand(hand);
    expect(handScore).toBe(500);
  });
});
