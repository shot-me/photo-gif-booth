import React from "react";
import { Link } from "react-router";

export default class ShotMeStartScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      printingServiceUp: false,
      generatingServiceUp: false,
      testSucces: false
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.checkConnection.bind(this), 1000);
  }
  checkConnection() {
    const status = {
      printingServiceUp: false,
      generatingServiceUp: false,
      testSucces: false
    }
    const self = this;
    window.config.isUp()
      .then(function (res) {
        self.setState({
          printingServiceUp: res.printerUp,
          generatingServiceUp: res.generatorUp,
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
    return (
      <Link to="/gif-preview" className="shot-me-hyperlink">
        <div className="shot-me-content shot-me-info-title">
          <div>
            <div className="shot-me-title">ZAPRASZAMY NA PLATFORMĘ</div>
            <div className="shot-me-subtitle">Kliknij żeby zrobić zdjęcia</div>
            <div className="shot-me-status">
              <div> Printing Service Up: {"" + this.state.printingServiceUp} </div>
              <div> Generating Service Up: {"" + this.state.generatingServiceUp} </div>
              <div> Test Success: {"" + this.state.testSucces} </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
