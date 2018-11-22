import React from "react";
import { Link } from "react-router";

export default class ShotMeFullWidthButton extends React.Component {
  render() {
    const { linkTo, text, clickAction } = this.props;
    return (
      <Link to={linkTo} className="shot-me-hyperlink shot-me-full-width-btn" onClick={() => clickAction()}>
        <div className="shot-me-btn-content">{text}</div>
      </Link>
    );
  }
}
