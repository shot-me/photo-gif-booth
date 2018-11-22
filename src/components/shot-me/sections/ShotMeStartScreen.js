import React from "react";
import { Link } from "react-router";

export default class ShotMeStartScreen extends React.Component {
  render() {
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
