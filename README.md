# Card Game
A simple video poker sim that allows for two of the popular scoring conditions: pairs and straights. 
Original prompt: https://gist.github.com/rattlion/c596bed01deca39103aeeb10e08e8536

## Product Requirements
1. The user may press the “Deal” button
1. A new, 52 card deck, is created and shuffled
1. The top five cards from the deck are laid out horizontally on-screen
1. The user chooses whether to keep or discard each card by clicking an individual card to toggle between “keep” and “discard” states.
    * Design Decision: only "discard" state will be displayed in the UI, it is assumed that you are keeping a card if it is not labeled discard. This can be changed by flipping a variable in the source code (see below).
1. The user may press the “Go” button
1. Each discarded card is replaced with a card from the top of the deck
1. The value of the resulting hand is displayed using the following scoring rules:
    * Straight (500 points): Five cards of consecutive rank. Example: 9:spades: 10:spades: J:diamonds: Q:hearts: K:diamonds:
    * Pair (100 points): Two cards of the same rank. Example: 5:clubs: 5:diamonds:
1. The “Deal” button replaces the “go” button. The user may click "Deal" to start the next game.


## Getting Started

To get up and running with this game please perform the following steps:

* Clone/Download branch
```git clone https://github.com/justincrich/card-game```
* Install dependencies
```yarn install```
or
```npm install```
* Start server with ```yarn start``` or ```npm run start```
* Open browser at ```http://localhost:3000``` (should open by default)
* Play Game

## Considerations
* Testing
    * testing can be performed by running ```yarn test``` or ```npm run test```
    * tests are contained in ```src/index.test.js```
    * all tests cover the basic game logic in ```src/helperFunctions.js```
* .env file in repo
    * This is a bad convention, but since all I'm doing is skipping the default Create_React_App preflight with ```SKIP_PREFLIGHT_CHECK``` I figure it's acceptable
* Displaying "Keep" Label
    * In ```src/game.js``` on line 66 change ```showLabel``` to ```true```
        * ex:
        ```javascript
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
        ```
## Key Dependencies
Dependency | Version | Description
-----------| ------- | -----------
[React](https://reactjs.org/)| 16.8.6 | Basic SPA library
[StyledComponents](https://www.styled-components.com/)| 4.3.1 | Allows for modularized CSS/SCSS styling using React components.
