import {
  JulianDate,
  TileMapServiceImageryProvider,
  ClockRange,
  Viewer,
  buildModuleUrl,
  SampledPositionProperty,
  Cartesian3,
  Color,
} from "cesium/Cesium";
import * as satellite from "satellite.js/dist/satellite";
import "cesium/Widgets/widgets.css";

const urlConfigs = {
  weather: "http://www.celestrak.com/NORAD/elements/weather.txt",
  active: "http://www.celestrak.com/NORAD/elements/active.txt",
  science: "http://www.celestrak.com/NORAD/elements/science.txt",
  stations: "http://www.celestrak.com/NORAD/elements/stations.txt",
  debris: "http://www.celestrak.com/NORAD/elements/cosmos-2251-debris.txt",
  iridium: "http://www.celestrak.com/NORAD/elements/iridium-NEXT.txt",
  gps: "http://www.celestrak.com/NORAD/elements/gps-ops.txt",
  ses: "http://www.celestrak.com/NORAD/elements/ses.txt",
  starlink: "http://www.celestrak.com/NORAD/elements/starlink.txt",
};

function getCorsFreeUrl(url) {
  return "https://api.allorigins.win/raw?url=" + url;
}

const parseTleFile = (fileContent, stationOptions) => {
  const result = [];
  const lines = fileContent.split("\n");
  let current = null;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();

    if (line.length === 0) continue;

    if (line[0] === "1") {
      current.tle1 = line;
    } else if (line[0] === "2") {
      current.tle2 = line;
    } else {
      current = {
        name: line,
        ...stationOptions,
      };
      result.push(current);
    }
  }

  return result;
};

export const createGlobe = () => {
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

  const url = getCorsFreeUrl(urlConfigs.debris);

  fetch(url).then((res) => {
    if (res.ok) {
      res.text().then((text) => {
        const stations = parseTleFile(text);

        //       const ISS_TLE = `1 25544U 98067A   21121.52590485  .00001448  00000-0  34473-4 0  9997
        // 2 25544  51.6435 213.5204 0002719 305.2287 173.7124 15.48967392281368`;
        stations.forEach((station) => {
          const satrec = satellite.twoline2satrec(
            station.tle1.trim(),
            station.tle2.trim()
          );

          const totalSeconds = 60 * 60 * 6;
          const timestepInSeconds = 10;
          const start = JulianDate.fromDate(new Date());
          const stop = JulianDate.addSeconds(
            start,
            totalSeconds,
            new JulianDate()
          );

          viewer.clock.startTime = start.clone();
          viewer.clock.stopTime = stop.clone();
          viewer.clock.currentTime = start.clone();
          viewer.timeline.zoomTo(start, stop);
          viewer.clock.multiplier = 40;
          viewer.clock.clockRange = ClockRange.LOOP_STOP;

          const positionsOverTime = new SampledPositionProperty();
          for (let i = 0; i < totalSeconds; i += timestepInSeconds) {
            const time = JulianDate.addSeconds(start, i, new JulianDate());
            const jsDate = JulianDate.toDate(time);

            const positionAndVelocity = satellite.propagate(satrec, jsDate);
            const gmst = satellite.gstime(jsDate);
            const p = satellite.eciToGeodetic(
              positionAndVelocity.position,
              gmst
            );

            const position = Cartesian3.fromRadians(
              p.longitude,
              p.latitude,
              p.height * 1000
            );
            positionsOverTime.addSample(time, position);
          }

          viewer.entities.add({
            position: positionsOverTime,
            point: { pixelSize: 5, color: Color.RED },
          });
        });

        // Wait for globe to load then zoom out
        let initialized = false;
        viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
          if (!initialized && viewer.scene.globe.tilesLoaded === true) {
            viewer.clock.shouldAnimate = true;
            initialized = true;
            viewer.scene.camera.zoomOut(7000000);
            //   document
            //     .querySelector("#loading")
            //     .classList.toggle("disappear", true);
          }
        });
      });
    }
  });
};
