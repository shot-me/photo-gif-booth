import React from 'react';
import ShotMeBigButton from "../ShotMeBigButton";

const mockedPhotosPath = "http://test.gif-me.pl/camera_output/"

export default class ShotMePhotoPickerScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      takenPhotos: [
        "1.JPG",
        "2.JPG",
        "3.JPG",
        "4.JPG",
        "5.JPG",
        "6.JPG",
        "7.JPG",
        "8.JPG"
      ],
      selectedPhoto: ""
    };
  }

  renderPhotos() {
    return (
      this.state.takenPhotos.map((photo, ind) => {
        return <img
          src={mockedPhotosPath + photo}
          onClick={() => this.setState({ selectedPhoto: ind })}
          className={`shot-me-photo-preview ${ind === this.state.selectedPhoto? "shot-me-photo-border" : ""}`}
          onError={(e) => { e.target.onerror = null; e.target.src = "image_path_here" }}
          role="presentation"
        />
      })
    );
  }

  render() {
    return (
      <div className="shot-me-content">
        <div className="shot-me-header">Wybierz zdjęcie do druku</div>
        <div className="shot-me-photos-list">{this.renderPhotos()}</div>
        <div className="shot-me-buttons-sections ">
          <ShotMeBigButton linkTo="/" text="COFNIJ" />
          <ShotMeBigButton text="DRUKUJ" onClick={() => console.log('todo')} />
        </div>
      </div>
    );
  }
}