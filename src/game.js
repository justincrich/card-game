import React, { useState } from "react";
import {
  Container,
  Button,
  HandContainer,
  ActionContainer,
  Score
} from "./styles";
import Card from "./card";
import { shuffelDeck, scoreHand } from "./helperFunctions";
import "./basic.css";
const DEFAULT_DISCARD = new Array(5).fill(false);
// Template that creates all card data

export default function Game() {
  const [result, setResult] = useState(null);
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState(null);
  const [discardList, setDiscard] = useState([...DEFAULT_DISCARD]);

  // on deal we shuffel a new deck
  // pick the top 5 items, reset the discard state and result
  const handleDeal = () => {
    const shuffeledDeck = shuffelDeck();
    const newHand = shuffeledDeck.splice(0, 5);
    setDeck(shuffeledDeck);
    setHand(newHand);
    setDiscard([...DEFAULT_DISCARD]);
    setResult(null);
  };

  // handles discard picks
  const handleDiscardSelect = idx => {
    const mutable = [...discardList];
    mutable[idx] = !mutable[idx];
    setDiscard(mutable);
  };

  const handleGo = () => {
    let newHand = hand.filter((card, idx) => {
      return !discardList[idx];
    });
    const cardsNeeded = 5 - newHand.length;
    if (cardsNeeded > 0) {
      newHand = [...newHand, ...deck.splice(0, cardsNeeded)];
    }
    const handScore = scoreHand(newHand);
    setResult(handScore);
    setHand(newHand);
    setDiscard([...DEFAULT_DISCARD]);
  };

  return (
    <Container className="App">
      <h1>Video Poker</h1>
      <h2>
        Press "DEAL" to generate your hand. Then click each card you wish to
        discard and press "GO" to see your score.
      </h2>
      <HandContainer>
        {hand &&
          hand.map((card, index) => (
            <Card
              {...card}
              key={JSON.stringify(card)}
              showSelectedLabel={false}
              discard={discardList[index]}
              onDiscard={() => {
                if (!result) {
                  handleDiscardSelect(index);
                }
              }}
            />
          ))}
      </HandContainer>
      {result !== null && <Score>Score: {result}</Score>}
      <ActionContainer>
        {deck.length === 0 || result !== null ? (
          <Button onClick={handleDeal}>DEAL</Button>
        ) : (
          <Button onClick={handleGo}>GO</Button>
        )}
      </ActionContainer>
    </Container>
  );
}
