import React from "react";
import { Link } from "react-router";

export default class ShotMeBigButton extends React.Component {
  render() {
    const { linkTo, text, onClick} = this.props;
    return (
      <Link to={linkTo} onClick={onClick} className="shot-me-hyperlink shot-me-big-btn">
        <div className="shot-me-btn-content">{text}</div>
      </Link>
    );
  }
}
