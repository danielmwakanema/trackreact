const TripReportMarshall = report => {
  const data = report;

  const generateMarshall = () => {
    return {
      trips: numberOfTrips(),
      speedAverage: avgSpeed(),
      fuelAverage: avgFuelUsed(),
      distanceTotal: totalDistance(),
      durationAverage: avgDuration(),
      maxSpeedAverage: avgMaxSpeed(),
      speedTrends: tripSpeedTrend(),
      fuelTrends: fuelUsageTrend(),
      distanceTrends: distanceCoveredTrend()
    };
  };

  const numberOfTrips = () => data.length;
  const avgSpeed = () =>
    Math.round(
      data.reduce((acc, val) => acc + val.averageSpeed, 0) / data.length
    ) || 0;
  const avgFuelUsed = () =>
    Math.round(data.reduce((acc, val) => acc + val.spentFuel, 0) / data.length) || 0;
  const totalDistance = () =>
    Math.round(data.reduce((acc, val) => acc + val.distance, 0)) || 0;
  const avgDuration = () =>
    Math.round(
      data.reduce((acc, val) => acc + val.duration / 3600, 0) / data.length
    ) || 0;
  const avgMaxSpeed = () =>
    Math.round(data.reduce((acc, val) => acc + val.maxSpeed, 0) / data.length) || 0;
  const tripSpeedTrend = () =>
    data.map(datum => Math.round(datum.averageSpeed) || 0);
  const fuelUsageTrend = () => data.map(datum => Math.round(datum.spentFuel) || 0);
  const distanceCoveredTrend = () =>
    data.map(datum => Math.round(datum.distance) || 0);

  return {
    generateMarshall
  };
};

export default TripReportMarshall;
