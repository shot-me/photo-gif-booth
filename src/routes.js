// src/routes.js
import React from "react";
import { Router, Route, IndexRedirect } from "react-router";

// shotMe Components
import ShotMeNumberEntryScreen from "./components/shot-me/sections/ShotMeNumberEntryScreen";
import ShotMeGifPreviewScreen from "./components/shot-me/sections/ShotMeGifPreviewScreen";
import ShotMeStartScreen from "./components/shot-me/sections/ShotMeStartScreen";
import ShotMeEndScreen from "./components/shot-me/sections/ShotMeEndScreen";
import ShotMePhotoPickerScreen from "./components/shot-me/sections/ShotMePhotoPickerScreen";

const Routes = props => (
  <Router {...props}>
    <Route path="/">
      <IndexRedirect to="/start" />
      <Route path="start" component={ShotMeStartScreen} />
      <Route path="keyboard" component={ShotMeNumberEntryScreen} />
      <Route path="gif-preview" component={ShotMeGifPreviewScreen} />
      <Route path="photo-picker" component={ShotMePhotoPickerScreen} />
      <Route path="end-screen" component={ShotMeEndScreen} />
    </Route>
  </Router>
);

export default Routes;
