import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

import { userDevices } from "../../Redux/actions/deviceActions";
import NormalMap from "../../components/Maps/NormalMap";
import EventsHook from "../../hooks/traccarEventsHook";
import TraccarAPI from "../../lib/TraccarAPI";
const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`;

export default () => {
  const devices = useSelector(state => state.Device.devices)
  const credentials = useSelector(state => { return { email: state.User.email, password: state.User.password }; })
  const [movingDevices,] = EventsHook(devices)
  const [center, setCenter] = useState(null)
  const defaultCenter = { lat: -13.9626911, lng: 33.7597418 }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userDevices())
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const name = devName();
    const dev = devices.filter(device => device.name === name)[0];
    if (!dev) return;
    devicePosition(dev.id)
  }

  const devName = () => document.getElementById('deviceName').value

  const devicePosition = id => {
    TraccarAPI(credentials).get(`/positions`).then(res => {
      const position = res.data.filter(pos => pos.deviceId === id)[0]
      if (position) setCenter({ lat: position.latitude, lng: position.longitude })
    }).catch(console.error)
  }

  return (
    <>
      <div className="content">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="pr-md-1" md="12">
              <FormGroup>
                <Input
                  defaultValue=""
                  placeholder="Device name..."
                  list="deviceNames"
                  name="deviceName"
                  id="deviceName"
                />
                <datalist id="deviceNames">
                  {devices.map(device => (<option key={device.id}> {device.name}</option>))}
                </datalist>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col xs="12">
            <NormalMap
              googleMapURL={GOOGLE_MAPS_URL}
              loadingElement={<p>Loading maps...</p>}
              containerElement={<div className="map-container" />}
              mapElement={<div className="map" />}
              devices={movingDevices}
              center={center || defaultCenter}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}