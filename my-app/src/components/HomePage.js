import React, { Component } from "react";
import history from "../history/index";

class HomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <p>To join a game, enter the lobby name and click 'Enter.'</p>
        <input type="text" id="game-name" onKeyPress={this.handleKeyPress} />
        <button onClick={this.startGame}>Enter</button>
      </div>
    );
  }

  //Helper Functions
  //Create a function to get the string value of the game name from the URI.
  startGame = () => {
    const gameName = document.getElementById("game-name").value;
    history.push("/" + gameName);
  }

  //Create a fn to listen for an event. If the event is ENTER, start the game.
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.startGame();
    }
  };
}

export default HomePage;
