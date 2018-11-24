import { generateGif } from './generate-gif/config';

const config = {
  ports: {
    print: 3001,
  },
  generateGif,
  backendPort: 8080,
  frontendPort: 3000,
  backendRoute: "/api",
  backendHostUrl: "http://localhost:8080",
  photoPath: "http://localhost:8080/camera_output/",
  getLatestPhotosUrl: "/getLatestPhotos",
  generateGifUrl: "/generateGif",
  photosDir: "camera_output",
  nrOfFramesFromCamera: 8,
  photoWidth: 1920, // TODO make it like in camera
  photoHeight: 1080,
  mode: "debug"
};

module.exports = config;
