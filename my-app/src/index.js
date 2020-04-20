import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import "./css/index.css";
import "./css/App.css"
import "./css/game.css"
import * as serviceWorker from "./serviceWorker";

//Import Components
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import store from "./store";

const menuRouter = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={(props) => <HomePage {...props} />} />
    </Switch>
  </Router>
);

const gameRouter = (
  <Router history={history}>
    <Switch>
      <Route path="/:gameName" exact render={(props) => <Game {...props} />} />
    </Switch>
  </Router>
);

ReactDOM.render(menuRouter, document.getElementById("menu"));

ReactDOM.render(
  <Provider store={store}>{gameRouter}</Provider>,
  document.getElementById("game")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
