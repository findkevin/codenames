import React, { Component } from "react";
import Board from "./Board"
import '../css/game.css'


class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
    // Get game-name from URI.
    gameName : window.location.pathname.split('/')[1],
    }

  }

  render() {
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
      <div id="game">
        <h1>This is the Game room.</h1>
        <span>
          <p>You are playing in room: {this.state.gameName}</p>
          <p>Send this link to your friends to join this game! www.klCodeNames.com/{this.state.gameName}</p>
          <Board/>
        </span>
      </div>
    )
  }
}

export default Game;
