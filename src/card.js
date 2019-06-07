import React from "react";
import styles from "styled-components";
import clubImg from "./assets/club.png";
import heartImg from "./assets/heart.png";
import diamondImg from "./assets/diamond.png";
import spadeImg from "./assets/spade.png";
import "./basic.css";
export const CARD_FAMILY = {
  HEART: "HEART",
  CLUB: "CLUB",
  DIAMOND: "DIAMOND",
  SPADE: "SPADE"
};

const CARD_DATA = {
  [CARD_FAMILY.HEART]: {
    img: heartImg
  },
  [CARD_FAMILY.CLUB]: {
    img: clubImg
  },
  [CARD_FAMILY.DIAMOND]: {
    img: diamondImg
  },
  [CARD_FAMILY.SPADE]: {
    img: spadeImg
  }
};

const Container = styles.div`
  background-color: white;
  border-radius: 10px;
  width: 200px;
  height: 300px;
  position: relative;
  padding: 10px;
  box-shadow: 0px 0px 13px 10px rgba(245,0,0,${props =>
    props.selected ? 1 : 0});
  cursor: pointer;
`;
const Image = styles.img`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%,50%);
`;
const SMALL_SIZE = 30;
const ValueContainer = styles.div`
  display: flex;
  flex-direction: column;
  width: ${SMALL_SIZE}px;
  justify-content: center;
  align-items: center;
`;
const ValueText = styles.span`
  font-size: 20px;
  color: black;
  padding-bottom: 5px;
`;
const SmlImage = styles.img`
  width: ${SMALL_SIZE}px;
  height: ${SMALL_SIZE}px;
`;

const Label = styles.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%,50%);
`;
const DiscardLabel = styles(Label)`
    color: red;

`;

const SelectedLabel = styles(Label)`
    color: black;
`;

export default function Card(props) {
  const { value, discard, onDiscard, showSelectedLabel } = props;
  const { img } = CARD_DATA[props.family];
  const formatValue = (value) => {
    if(value === 1){
      return 'A';
    }
    if(value>=11){
      switch(value){
        case 11:
          return 'J';
        case 12:
          return 'Q';
        default:
          return 'K';
      }
    }
    return value;
  }
  return (
    <Container selected={discard} onClick={onDiscard}>
      <ValueContainer>
        <ValueText>{formatValue(value)}</ValueText>
        <SmlImage src={img} />
      </ValueContainer>
      <Image src={img} />
      {discard && <DiscardLabel>Discard</DiscardLabel>}
      {showSelectedLabel && !discard && <SelectedLabel>Selected</SelectedLabel>}
    </Container>
  );
}
