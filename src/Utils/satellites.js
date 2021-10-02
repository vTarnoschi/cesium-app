import {
  JulianDate,
  ClockRange,
  SampledPositionProperty,
  Cartesian3,
  Color,
} from "cesium/Cesium";
import * as satellite from "satellite.js/dist/satellite";

export function createSatellites(station, viewer, color) {
  const satrec = satellite.twoline2satrec(
    station.tle1.trim(),
    station.tle2.trim()
  );

  const totalSeconds = 60 * 60 * 6;
  const timestepInSeconds = 10;
  const start = JulianDate.fromDate(new Date());
  const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());

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
    const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    const position = Cartesian3.fromRadians(
      p.longitude,
      p.latitude,
      p.height * 1000
    );
    positionsOverTime.addSample(time, position);
  }

  return viewer.entities.add({
    position: positionsOverTime,
    point: { pixelSize: 5, color: Color[color] },
  });
}

export function removeSatellites(entities, viewer) {
  entities.forEach((entity) => viewer.entities.remove(entity));
}
