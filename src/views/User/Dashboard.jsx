import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import { userDevices } from "../../Redux/actions/deviceActions";
import NormalMap from "../../components/Maps/NormalMap";
import EventsHook from "../../hooks/traccarEventsHook";
const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`;

export default () => {
  const devices = useSelector(state => state.Device.devices)
  const [movingDevices, ] = EventsHook(devices)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userDevices())
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <NormalMap
              googleMapURL={GOOGLE_MAPS_URL}
              loadingElement={<p>Loading maps...</p>}
              containerElement={<div className="map-container" />}
              mapElement={<div className="map" />}
              devices={movingDevices} 
            />
          </Col>
        </Row>
      </div>
    </>
  )
}