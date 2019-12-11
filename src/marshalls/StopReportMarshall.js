import moment from 'moment';

const StopReportMarshall = (report) => {
  const data = report

  const generateMarshall = () => {
    return data.map(stop => Object.assign({}, {
      name: stop.deviceName,
      duration: stop.duration,
      start: time(stop.startTime),
      end: time(stop.endTime),
      lat: stop.latitude,
      lon: stop.longitude,
      fuel: stop.spentFuel,
      engineHours: stop.engineHours
    }))
  }

  const time = stamp => moment(stamp).format('YYYY-MM-DD H:m:s')

  return {
    generateMarshall
  }
}

export default StopReportMarshall;