import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withScriptjs } from 'react-google-maps/lib';

export default withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={15} center={props.center}>
      {props.center.lat && props.center.lng && (
        <Marker position={props.center} />
      )}
    </GoogleMap>
  ))
);
