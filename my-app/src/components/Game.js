import React, { Component } from "react";
import Board from "./Board"
import '../css/game.css'


class Game extends Component {
  // constructor(props){
  //   super(props)
  //   // Get game-name from URI.
  //   // const gameName = window.location.pathname.split('/')[1]
  // }

  render() {
    const gameName = window.location.pathname.split("/")[1];
    // const winner = this.props.game.winner;
    // let status;
    // const playingTeam = this.props.game.blueTurn ? "blue" : "red";
    // if (winner) {
    //   status = winner + " team wins!";
    // } else {
    //   status = (this.props.game.blueTurn ? "Blue" : "Red") + " team's turn";
    // }
    // const game = this.createScoreboard();

    return(
      <div>
        <h1>This is the Game room.</h1>
        <span>
          Send this room name to friends : {gameName}
          <Board/>
        </span>
      </div>
    )
  }
}

export default Game;
