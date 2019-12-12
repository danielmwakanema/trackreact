import moment from "moment";

const EventReportMarshall = (report, devices) => {
  const data = report;

  const generateMarshall = () => {
    return data.map(event =>
      Object.assign(
        {},
        {
          name: deviceName(event.deviceId),
          type: event.type,
          at: time(event.serverTime)
        }
      )
    );
  };

  const time = stamp => moment(stamp).format("YYYY-MM-DD H:m:s");
  const deviceName = id => devices.filter(device => device.id === id)[0].name;

  return {
    generateMarshall
  };
};

export default EventReportMarshall;
