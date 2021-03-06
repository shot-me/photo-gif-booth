import React from 'react';
import ShotMeBigButton from "../ShotMeBigButton";
import ShotMeLoader from "../ShotMeLoader";
import { browserHistory } from "react-router";
import { photoUrl } from '../photos';

export default class ShotMePhotoPickerScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      takenPhotos: window.photos || [],
      selectedPhoto: ""
    };
    if (!this.state.takenPhotos) {
      browserHistory.push("/start");
    }
  }

  renderPhotos() {
    return (
      this.state.takenPhotos.map(photo => {
        return <img
          src={photoUrl + photo}
          onClick={() => this.setState({ selectedPhoto: photo })}
          className={`shot-me-photo-preview ${photo === this.state.selectedPhoto ? "shot-me-photo-border" : ""}`}
          onError={(e) => { e.target.onerror = null; e.target.src = "image_path_here" }}
          role="presentation"
        />
      })
    );
  }
  printPhoto() {
    const photoName = this.state.selectedPhoto;
    if (photoName) {
      const ERROR_MSG = '[PHOTO PICKER] Error posting request to /print/' + photoName;
      const generateUrl = window.config.generateService.getGeneratePhotoUrl(photoName);
      const printUrl = window.config.printService.getPrintUrl();
      console.log('[PHOTO PICKER] Printing photo: ' + photoName);
      console.log('[PHOTO PICKER] Posting request to ' + generateUrl);
      this.setState({ loading: true });
      fetch(generateUrl)
        .then(res => res.json())
        .then(({ success }) => {
          if (!success) {
            // eslint-disable-next-line
            browserHistory.push("/start");
            throw "Error with generating branding";
          }
          fetch(printUrl)
            .then(res => res.json())
            .then(({ success }) => {
              if (!success) {
                // eslint-disable-next-line
                throw "Error with generating branding";
              }
              browserHistory.push("/start");
            })
        })
        .catch((err) => {
          alert(ERROR_MSG + err);
          browserHistory.push("/start");
        });
    }
  }
  render() {
    if (this.state.loading) {
      return (<ShotMeLoader />);
    }
    let selectedPhotoName = "";
    if (this.state.selectedPhoto) {
      selectedPhotoName = this.state.takenPhotos[this.state.selectedPhoto];
    }
    return (
      <div className="shot-me-content">
        <div className="shot-me-header">Wybierz zdjęcie do druku</div>
        <div className="shot-me-photos-list">{this.renderPhotos()}</div>
        <div className="shot-me-buttons-sections ">
          <ShotMeBigButton linkTo="/" text="ANULUJ" />
          <ShotMeBigButton text="DRUKUJ" onClick={() => this.printPhoto(selectedPhotoName)} />
        </div>
      </div>
    );
  }
}