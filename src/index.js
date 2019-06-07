import React from "react";
import ReactDOM from "react-dom";
import Game from "./game";

function App() {
  return <Game />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
