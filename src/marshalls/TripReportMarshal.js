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
    );
  const avgFuelUsed = () =>
    Math.round(data.reduce((acc, val) => acc + val.spentFuel, 0) / data.length);
  const totalDistance = () =>
    Math.round(data.reduce((acc, val) => acc + val.distance, 0));
  const avgDuration = () =>
    Math.round(
      data.reduce((acc, val) => acc + val.duration / 3600, 0) / data.length
    );
  const avgMaxSpeed = () =>
    Math.round(data.reduce((acc, val) => acc + val.maxSpeed, 0) / data.length);
  const tripSpeedTrend = () =>
    data.map(datum => Math.round(datum.averageSpeed));
  const fuelUsageTrend = () => data.map(datum => Math.round(datum.spentFuel));
  const distanceCoveredTrend = () =>
    data.map(datum => Math.round(datum.distance));

  return {
    generateMarshall
  };
};

export default TripReportMarshall;
