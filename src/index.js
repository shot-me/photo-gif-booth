import React from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";

import Routes from "./routes";
import "./styles/shot-me/style.css";
import "./styles/shot-me/number-entry.css";
import "./styles/shot-me/gif-preview.css";
import "./styles/shot-me/end-screen.css";
import "./styles/shot-me/photo-picker.css";
import "./styles/shot-me/loader.css"

import config  from '../config';

window.config = config;

function App() {
  return <Routes history={browserHistory} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
