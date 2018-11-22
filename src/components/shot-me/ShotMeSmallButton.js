import React from "react";
import { Link } from "react-router";
import close from "./../../images/shotMe/shot-me-close.png";

export default class ShotMeSmallButton extends React.Component {
  render() {
    return (
      <Link to="/" className="shot-me-hyperlink shot-me-small-btn">
        <img src={close} role="presentation" />
      </Link>
    );
  }
}
