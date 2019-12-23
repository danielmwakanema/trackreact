import React from 'react';
import { compose, withProps, lifecycle } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';

const defaultCenter = { lat: -13.9626911, lng: 33.7597418 }
const defaultZoom = 15

const MapWithADirectionsRenderer = trip => compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route({
        origin: new window.google.maps.LatLng(trip.src.lat, trip.src.lon),
        destination: new window.google.maps.LatLng(trip.des.lat, trip.des.lon),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (res, status) => (status === window.google.maps.DirectionsStatus.OK) && this.setState({ directions: res }));
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={defaultZoom}
    defaultCenter={defaultCenter}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default trip => MapWithADirectionsRenderer(trip)