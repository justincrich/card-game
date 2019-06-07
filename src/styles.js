import styled from "styled-components";
const SPACING_SMALL = 10;
const SPACING_MEDIUM = 20;
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  h1 {
    font-size: 50px;
    margin-bottom: ${SPACING_SMALL}px;
  }
  h2 {
    font-size: 25px;
    max-width: 50%;
    margin-bottom: ${SPACING_SMALL}px;
  }
`;

export const Button = styled.button``;

export const HandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${SPACING_MEDIUM}px ${SPACING_SMALL}px;
  height: 320px;
`;

export const ActionContainer = styled.div`
  align-self: flex-end;
`;

export const Score = styled.span``;
