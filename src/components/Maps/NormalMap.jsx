import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withScriptjs } from 'react-google-maps/lib';

const ZOOM = 17

const validCoordinates = (lat, lng) => lat && lng


export default withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={ZOOM} center={props.center}>
      { props.devices.length >= 0 && (props.devices.map((device, index) =>
        validCoordinates(device.lat, device.lng && <Marker key={index} position={{ lat: device.lat, lng: device.lng }} title={`${device.name}`} />)))
      }
    </GoogleMap>
  ))
);
