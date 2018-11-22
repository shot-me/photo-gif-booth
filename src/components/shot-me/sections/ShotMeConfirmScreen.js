import React from "react";
import ShotMeBigButton from "../ShotMeBigButton";
import * as config from "./../../../../config";

export default class ShotMeConfirmScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      previousPhotoIndex: 0,
      actualPhotoIndex: 0,
      photoFiles: [],
      message: "Waiting for gif list",
      mockedPhotosPath: "http://test.gif-me.pl/camera_output/"
    };
  }

  componentWillMount() {
    this.getNockedPhoto();
  }
  getLatestPhoto() {
    fetch(config.backendHostUrl + "/api/getLatestPhotos")
      .then(res => res.json())
      .then(({ photos }) => {
        this.setState({ photos });
        const linkFrames = photos.reduce((acc, photo) => acc + " " + photo);
        this.setState({
          message: " Downloaded photos: " + photos + " Now loading them"
        });
        let newPhotoFiles = [];
        for (let i = 0; i < photos.length; ++i) {
          newPhotoFiles = [
            ...newPhotoFiles,
            <img
              className="shot-me-preview-img"
              src={config.photoPath + photos[i]}
              role="presentation"
            />
          ];
        }
        this.setState({
          photoFiles: newPhotoFiles,
          linkFrames
        });
        this.intervalId = setInterval(this.movePhotosIndex.bind(this), 100);
      })
      .catch(err => {
        this.setState({
          message: "Error in geting the photos list. Please try again."
        });
      });
  }

  getNockedPhoto() {
    const debugPhotosIds = [
      "1.JPG",
      "2.JPG",
      "3.JPG",
      "4.JPG",
      "5.JPG",
      "6.JPG",
      "7.JPG",
      "8.JPG"
    ];
    this.state.photos = debugPhotosIds;
    let newPhotoFiles = [];
    for (let i = 0; i < this.state.photos.length; i++) {
      newPhotoFiles = [
        ...newPhotoFiles,
        <img
          className="shot-me-preview-img"
          src={this.state.mockedPhotosPath + this.state.photos[i]}
          role="presentation"
        />
      ];
    }

    this.state.photoFiles = newPhotoFiles;
    this.intervalId = setInterval(this.movePhotosIndex.bind(this), 100);
  }

  movePhotosIndex() {
    let { actualPhotoIndex, previousPhotoIndex, photos } = this.state;
    const oldActualPhotoIndex = actualPhotoIndex;
    if (actualPhotoIndex === 0) {
      actualPhotoIndex = 1;
    } else if (actualPhotoIndex === photos.length - 1) {
      actualPhotoIndex--;
    } else if (actualPhotoIndex > previousPhotoIndex) {
      actualPhotoIndex++;
    } else if (actualPhotoIndex < previousPhotoIndex) {
      actualPhotoIndex--;
    }
    this.setState({
      actualPhotoIndex,
      previousPhotoIndex: oldActualPhotoIndex
    });
  }

  compo;

  render() {
    if (this.state.photoFiles.length === 0)
      return <div className="shot-me-load-gif-error">{this.state.message}</div>;
    return (
      <div className="shot-me-content">
        <div className="shot-me-preview-img-container">
          {this.state.photoFiles[this.state.actualPhotoIndex]}
        </div>
        <div>
          <div className="shot-me-share-title">
            <div className="shot-me-title">Chcesz zrezygnować?</div>
          </div>
          <div className="shot-me-buttons-sections">
            <ShotMeBigButton linkTo="/shotme/end-screen" text="nie" />
            <ShotMeBigButton linkTo="/" text="tak" />
          </div>
        </div>
      </div>
    );
  }
}
