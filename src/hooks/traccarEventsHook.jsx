import { useState } from "react";

/**
 * Hook to abstract away dealings with Traccar live location updates
 * @param {Array} initDevices
 * @return {Array}
 */
export default devices => {
  const ONE_SECOND = 1000;
  let [movingDevices, setMovingDevices] = useState([]);
  let [deviceEvents, setDeviceEvents] = useState([]);

  const URL = `ws://${process.env.REACT_APP_TRACCAR_HOST}:${process.env.REACT_APP_TRACCAR_PORT}/api/socket`;
  const socket = new WebSocket(URL);

  socket.onmessage = message => {
    setTimeout(() => {
      const data = JSON.parse(message.data);
      if (data.positions) movingDevices = setMovingDevices(handlePos(devices, data.positions));
      if (data.events) deviceEvents = setDeviceEvents(handleEvents(devices, data.events));
    }, ONE_SECOND)
  };

  socket.onerror = console.error;
  window.onclose = socket.close;
  window.onpopstate = socket.close;

  return [movingDevices, deviceEvents];
}

/**
 * Function to process moving devices
 * @param {Array} devices
 * @param {Array} positions
 * @return {Array}
 */
function handlePos(devices, positions) {
  return devices.map(device => {
    const pos = positions.filter(position => position.deviceId === device.id)
    let position = null
    if (pos.length) position = pos[pos.length - 1]
    if (position) return {
      name: device.name,
      speed: position.speed,
      lat: position.latitude,
      lng: position.longitude,
      altitude: position.altitude
    };
    return device;
  });
}

/**
 * Function to handle device events
 * @param {Array} devices
 * @param {Array} events
 * @return {Array}
 */
function handleEvents(devices, events) {
  return devices.map(device => {
    const evs = events.filter(evt => evt.deviceId === device.id)
    let event = null
    if (evs.length) event = evs[evs.length - 1]
    if (event) return {
      name: device.name,
      event: event.type,
      time: event.serverTime
    };
    return device;
  })
}
