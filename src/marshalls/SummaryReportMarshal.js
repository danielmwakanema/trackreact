const SummaryReportMarshall = report => {
  const data = report;

  const generateMarshall = () => {
    return data.map(deviceSummary =>
      Object.assign(
        {},
        {
          name: deviceSummary.deviceName,
          maxSpeed: deviceSummary.maxSpeed,
          averageSpeed: deviceSummary.averageSpeed,
          distance: deviceSummary.distance,
          fuel: deviceSummary.spentFuel,
          engineHours: deviceSummary.engineHours
        }
      )
    );
  };

  return {
    generateMarshall
  };
};

export default SummaryReportMarshall;
