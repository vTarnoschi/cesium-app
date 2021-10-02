import {
  TileMapServiceImageryProvider,
  Viewer,
  buildModuleUrl,
} from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import { parseTleFile } from "./functions";

import { fetchApi } from "./fetch";

import { urlConfigs } from "./urlsConfig";

import { createSatellites } from "./satellites";

export const createGlobe = (language) => {
  const viewer = new Viewer("cesiumContainer", {
    imageryProvider: new TileMapServiceImageryProvider({
      url: buildModuleUrl("Assets/Textures/NaturalEarthII"),
    }),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    navigationHelpButton: false,
    sceneModePicker: false,
  });

  const config = urlConfigs(language);
  const satellitePoint = [];

  fetchApi(config[0].url, null, (text) => {
    const stations = parseTleFile(text);

    stations.forEach((station) => {
      const point = createSatellites(station, viewer, config[0].color);

      satellitePoint.push(point);
    });
  });

  let initialized = false;
  viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
    if (!initialized && viewer.scene.globe.tilesLoaded === true) {
      viewer.clock.shouldAnimate = true;
      initialized = true;
      viewer.scene.camera.zoomOut(7000000);
    }
  });

  return { viewer, satellitePoint };
};
