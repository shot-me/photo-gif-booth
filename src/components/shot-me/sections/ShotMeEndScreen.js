import React from "react";
import ShotMeFullWidthButton from "../ShotMeFullWidthButton";

export default class ShotMeEndScreen extends React.Component {
  render() {
    return (
      <div className="shot-me-end-content shot-me-info-title">
        <div className="shot-me-end-title">
          Dziękujemy z skorzystanie z atrakcji
        </div>
        <ShotMeFullWidthButton linkTo="/" text="Dalej" />
      </div>
    );
  }
}
