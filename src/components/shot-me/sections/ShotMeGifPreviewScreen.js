import React from "react";
import ShotMeBigButton from "../ShotMeBigButton";
import ShotMeSmallButton from "../ShotMeSmallButton";
import * as config from "./../../../../config";

const mockedPhotosPath = "http://test.gif-me.pl/camera_output/"

export default class ShotMeGifPreviewScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      previousPhotoIndex: 0,
      actualPhotoIndex: 0,
      message: "Waiting for gif list",
    };
  }

  componentDidMount() {
    this.getNockedPhoto();
  }
  getLatestPhoto() {
    fetch(config.backendHostUrl + "/api/getLatestPhotos")
      .then(res => res.json())
      .then(({ photos }) => {
        this.setState({
          photos,
          message: " Downloaded photos: " + photos + " Now loading them"
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

    this.setState({ photos: debugPhotosIds });
    this.intervalId = setInterval(this.movePhotosIndex.bind(this), 100);
  }
  componentWillUnmount() {
    window.photos = this.state.photos;
    window.clearInterval(this.intervalId);
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

  render() {
    if (!this.state.photos) return null;
    const photo = this.state.photos[this.state.actualPhotoIndex];
    return (
      <div className="shot-me-content">
        <div className="shot-me-preview-img-container">
          <img
            className="shot-me-preview-img"
            src={mockedPhotosPath + photo}
            onError={(e) => { e.target.onerror = null; e.target.src = "image_path_here" }}
            role="presentation"
          />
        </div>
        <div>
          <div className="shot-me-share-title">
            <div className="shot-me-title">Udostępnij</div>
            <div className="shot-me-subtitle">Za pomocą</div>
          </div>
          <div className="shot-me-buttons-sections">
            <ShotMeBigButton linkTo="/photo-picker" text="drukuj" />
            <ShotMeSmallButton />
            <ShotMeBigButton linkTo="/keyboard" text="SMS" />
          </div>
        </div>
      </div>
    );
  }
}
