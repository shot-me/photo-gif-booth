import React from "react";
import { Link } from "react-router";

export default class ShotMeStartScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      printingServiceUp: false,
      generatingServiceUp: false,
      testSucces: false,
      internetUp: false
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.checkConnection.bind(this), 8000);
  }
  checkConnection() {
    const status = {
      printingServiceUp: false,
      generatingServiceUp: false,
      internetUp: false,
      testSucces: false
    }
    const self = this;
    window.config.isUp()
      .then(function (res) {
        self.setState({
          printingServiceUp: res.printerUp,
          generatingServiceUp: res.generatorUp,
          internetUp: res.isInternetUp,
          testSucces: true
        })
      })
      .catch(function () {
        self.setState({
          ...status,
          testSucces: false
        })
      })
  }
  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }
  render() {
    const { internetUp, printingServiceUp, generatingServiceUp, testSucces } = this.state;
    if (!internetUp) {
      return <div className="shot-me-content shot-me-info-title">
        <div> {internetUp ? "" : "WŁĄCZ INTERNET"}</div>
      </div>

    }
    
    if (!printingServiceUp || !generatingServiceUp || !testSucces) {
      return <div className="shot-me-content shot-me-info-title">
        <div>
          <div> Włącz proszę teamviewera</div>
          <div> i wysłać login/hasło do 601825344</div>
          <div> Printing Service: {"" + printingServiceUp} </div>
          <div> Generating Service: {"" + generatingServiceUp} </div>
          <div> Test did run: {"" + testSucces} </div>
        </div>
      </div>
    }
    return (
      <Link to="/gif-preview" className="shot-me-hyperlink">
        <div className="shot-me-content shot-me-info-title">
          <div>
            <div className="shot-me-title">ZAPRASZAMY NA PLATFORMĘ</div>
            <div className="shot-me-subtitle">Kliknij żeby zrobić zdjęcia</div>
          </div>
        </div>
      </Link>
    );
  }
}
