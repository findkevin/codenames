import React, { Component } from "react";
import io from "socket.io-client";

import Board from "./Board";
import { connect } from "react-redux";

import { changeRole } from "../actions/userOptionsActions";
import {
  updateGame,
  loadGame,
  startNewGame,
  endTurn,
  cardClick,
} from "../actions/gameActions";
import { socketUrl } from "../config/serverUrl";

const stateMap = (store) => {
  return store;
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Game name from the URL
      gameName: window.location.pathname.split("/")[1].toLowerCase(),

      // Websocket to receive data from the server
      socket: io.connect(socketUrl),
    };

    this.newGame = this.newGame.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.loadGame = this.loadGame.bind(this);

    // Socket room and connection
    this.state.socket.emit("joinRoom", this.state.gameName);

    this.state.socket.on("updateGame", (game) =>
      props.dispatch(updateGame(game))
    );

    this.loadGame(this.state.gameName);
  }

  render() {
    const winner = this.props.game.winner;
    let status = "";
    let playingTeam = this.props.game.blueTurn ? "blue" : "red";
    let playingTeamColour = playingTeam;

    if (winner) {
      status = winner + " team wins!";
    } else {
      status = (this.props.game.blueTurn ? "Blue" : "Red") + " team's turn";
    }

    return (
      <div
        className={
          this.props.options.role === "Spymaster" ? "spymaster" : "player"
        }
        id="game"
      >
        <h1>Welcome to the game room: {this.state.gameName}</h1>
        <p>
          Send this link to your friends: www.codenames.com/
          {this.state.gameName}
        </p>

        <div id="board">
          <div id="top-bar">
            <div id="score" />
            <div id="status" className={playingTeamColour}>
              {status}
            </div>
            <button id="end-turn" onClick={this.endTurn}>
              End {playingTeam}&apos;s turn
            </button>
          </div>

          <Board
            cards={this.props.game.cards}
            cardClick={(i) => this.cardClick(i)}
          />
          <div>
            <div className="right">
              <React.Fragment>
                <div className="switch-input">
                  <label className="switch">
                    <input
                      type="checkbox"
                      value={
                        this.props.options.role === "Spymaster"
                          ? "Player"
                          : "Spymaster"
                      }
                      onChange={this.changeRole}
                      checked={this.props.options.role === "Spymaster"}
                    />
                  </label>
                  <div className="switch-label">Spymaster</div>
                </div>
              </React.Fragment>
              <button id="next-game" onClick={this.newGame}>
                Next game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Helper/dispatch functions */
  /* Client actions */
  // Score CSS classes and info
  createScoreboard() {
    let firstTeamColour;
    let firstTeamScore;
    let secondTeamColour;
    let secondTeamScore;
    if (this.props.game.blueTeamFirst) {
      firstTeamColour = "blue";
      firstTeamScore = this.props.game.blueCards;
      secondTeamColour = "red";
      secondTeamScore = this.props.game.redCards;
    } else {
      firstTeamColour = "red";
      firstTeamScore = this.props.game.redCards;
      secondTeamColour = "blue";
      secondTeamScore = this.props.game.blueCards;
    }

    return {
      firstTeamColour,
      firstTeamScore,
      secondTeamColour,
      secondTeamScore,
    };
  }

  changeRole(event) {
    let el = event.target;

    this.props.dispatch(changeRole(el.value));
  }

  /* Server actions */
  loadGame(gameName) {
    this.props.dispatch(loadGame(gameName));
  }

  newGame() {
    startNewGame(this.props.game.gameName);
  }

  cardClick(cardIndex) {
    const teamClicked = this.props.game.blueTurn ? "Blue" : "Red";
    cardClick(this.props.game.gameName, cardIndex, teamClicked);
  }

  endTurn() {
    endTurn(this.props.game.gameName);
  }
}

export default connect(stateMap)(Game);
