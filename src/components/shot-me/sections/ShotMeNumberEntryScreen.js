import React from "react";
import ShotMeNumericKeyboard from "../ShotMeNumericKeyboard";
import { onShotMeKeyboardClick } from "../actions/keyboardActions";
import { ShotMePhoneNumberEntry } from "../ShotMePhoneNumberEntry";
import ShotMeFullWidthButton from "../ShotMeFullWidthButton";
import { browserHistory } from 'react-router';

import * as config from "./../../../../config";

export default class ShotMeNumberEntryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: ""
    };
  }

  onClick(char) {
    const newNumber = onShotMeKeyboardClick(this.state.phoneNumber, char);
    this.setState({ phoneNumber: newNumber });
  }

  generateGif() {
    const frames = window.photos;
    if (!frames) {
      alert('No photos. Go to preview screen once again');
    } else {
      const url =
        config.backendHostUrl +
        "/api/generateGif?number=" +
        this.state.phoneNumber +
        "&frames=" +
        frames;

      fetch(url)
        .then(res => res.json())
        .then(({ success }) => {
          if (!success) {
            alert("Error. Please try again");
          } else {
            console.log("Successfully generated gif");
            browserHistory.push("/end");
          }
        })
        .catch(() => alert("Error with api/generateGif:"));
    }
  }

  checkNumber() {
    if (this.state.phoneNumber.length === 9) {
      this.generateGif()
      console.log("Phone number ok");
    } else {
      console.log("Bad phone number");
    }
  }

  render() {
    return (
      <div className="shot-me-number-entry-screen">
        <div className="shot-me-header">
          <div>Wpisz</div>
          <div>numer telefonu</div>
        </div>
        <div>
          <ShotMePhoneNumberEntry phoneNumber={this.state.phoneNumber} />
          <ShotMeNumericKeyboard onClickHandler={this.onClick.bind(this)} />
        </div>
        <ShotMeFullWidthButton text="Dalej" clickAction={this.checkNumber.bind(this)} />
      </div>
    );
  }
}
