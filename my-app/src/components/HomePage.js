import React, { Component } from "react";

class HomePage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <p>To join a game, enter the lobby name and click 'Enter.'</p>
        <input type="text" id="game-name"/>
        <button>Enter</button>
      </div>
    );
  }

  //Helper Functions

}

export default HomePage;
