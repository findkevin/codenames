import React, { Component } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import Board from "./Board";
import CodeNames from "../images/Kodonemu.png";
import LinkedinMark from "../images/Linkedin-Mark.png"
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

    // Socket room and connection
    this.state.socket.emit("joinRoom", this.state.gameName);

    this.loadGame(this.state.gameName);
  }

  componentDidMount() {
    this.state.socket.on("updateGame", (data) => {
      this.updateGame(data);
    });
  }

  render() {
    const winner = this.props.game.winner;
    let status = "";
    let playingTeam = this.props.game.blueTurn ? "blue" : "red";
    let playingTeamColor = playingTeam;
    let scoreboard = this.createScoreboard();

    if (winner) {
      status = winner.toUpperCase() + " TEAM WINS!";
    } else {
      status = (this.props.game.blueTurn ? "BLUE" : "RED") + " Team's turn!";
    }

    return (
      <div
        className={
          this.props.options.role === "Spymaster" ? "spymaster" : "player"
        }
        id="game"
      >
        <img className="game-logo" src={CodeNames} alt="CodeNames Logo"></img>
        <p>
          Share this link with your friends to play together:
          <Link>{window.location.href}</Link>
        </p>

        <div id="top-bar">
          <div>
            <button id="end-turn" className="button" onClick={this.endTurn}>
              End {playingTeam.toUpperCase()} team's turn
            </button>
          </div>
          <div id="status" className={playingTeamColor}>
            {status}
            {/* <span style={{ color: "black" }}>
              <span> (</span>
              <span className={scoreboard.firstTeamColor}>
                {scoreboard.firstTeamScore}
              </span>
              <span>-</span>
              <span className={scoreboard.secondTeamColor}>
                {scoreboard.secondTeamScore}
              </span>
              <span>)</span>
            </span> */}
          </div>
          <div>
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
              <span className="slider">
                {this.props.options.role === "Spymaster"
                  ? " I am the Spymaster!"
                  : " Spymaster"}
              </span>
            </label>
            <button id="next-game" className="button" onClick={this.newGame}>
              New Game!
            </button>
          </div>
        </div>

        <Board
          cards={this.props.game.cards}
          cardClick={(i) => this.cardClick(i)}
        />

        <footer>
          <span>Enjoying the game? Connect with me on LinkedIn! </span>

          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/find-kevin/"
          >
            <img
              className="LinkedIn-logo"
              src={LinkedinMark}
              alt="LinkedIn Mark"
            ></img>
          </a>
        </footer>
      </div>
    );
  }

  /* Helper/dispatch functions */
  /* Client actions */
  // Score CSS classes and info
  createScoreboard = () => {
    let firstTeamColor;
    let firstTeamScore;
    let secondTeamColor;
    let secondTeamScore;
    if (this.props.game.blueTeamFirst) {
      firstTeamColor = "blue";
      firstTeamScore = this.props.game.blueCards;
      secondTeamColor = "red";
      secondTeamScore = this.props.game.redCards;
    } else {
      firstTeamColor = "red";
      firstTeamScore = this.props.game.redCards;
      secondTeamColor = "blue";
      secondTeamScore = this.props.game.blueCards;
    }
    return {
      firstTeamColor,
      firstTeamScore,
      secondTeamColor,
      secondTeamScore,
    };
  }

  changeRole = (event) => {
    let el = event.target;

    this.props.dispatch(changeRole(el.value));
  }

  /* Server actions */
  loadGame = (gameName) => {
    this.props.dispatch(loadGame(gameName));
  }

  updateGame = (game) => {
    this.props.dispatch(updateGame(game));
  }

  newGame = () => {
    this.props.dispatch(startNewGame(this.props.game.gameName));
  }

  cardClick = (cardIndex) => {
    const teamClicked = this.props.game.blueTurn ? "Blue" : "Red";
    this.props.dispatch(
      cardClick(this.props.game.gameName, cardIndex, teamClicked)
    );
  }

  endTurn = () => {
    this.props.dispatch(endTurn(this.props.game.gameName));
  }
}

export default connect(stateMap)(Game);
