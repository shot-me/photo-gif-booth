import React from "react";
import ShotMeNumericKeyboard from "../ShotMeNumericKeyboard";
import { onShotMeKeyboardClick } from "../actions/keyboardActions";
import { ShotMePhoneNumberEntry } from "../ShotMePhoneNumberEntry";
import ShotMeFullWidthButton from "../ShotMeFullWidthButton";
import ShotMeLoader from "../ShotMeLoader";
import { browserHistory } from 'react-router';


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
    const url = window.config.generateService.getGenerateGifUrl(this.state.phoneNumber);
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(({ success }) => {
        if (!success) {
          alert("Error. Please try again");
        } else {
          browserHistory.push("/photo-picker");
        }
      })
      .catch((err) => console.log(err));
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
    if (this.state.loading) {
      return (<ShotMeLoader />);
    }
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
