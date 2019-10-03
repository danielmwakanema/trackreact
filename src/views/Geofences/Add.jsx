import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import Map from "../../components/Maps/Map";

import { addGeofence } from "../../Redux/actions/geofenceActions";

import { MVCArrayToWkt } from "../../lib/WKTUtils";

const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`;

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      area: "",
      center: {
        lat: -13.962647,
        lng: 33.794568
      },
      previousDrawing: null,
      watchId: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createGeofence = this.createGeofence.bind(this);
  }

  componentDidMount() {
    this.watchLocation();
  }

  componentWillUnmount() {
    this.unwatchLocation();
  }

  watchLocation() {
    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    navigator.geolocation.watchPosition(
      this.getLocation.bind(this),
      null,
      geoOptions
    );
  }

  unwatchLocation() {
    if (this.state.watchId) {
      navigator.geolocation.clearWatch(this.state.watchId);
    }
  }

  getLocation(position) {
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  doneDrawing(polygon) {
    if (this.state.previousDrawing) {
      this.state.previousDrawing.setMap(null);
    }

    this.setState({ previousDrawing: polygon });

    const wkt = MVCArrayToWkt(polygon.getPaths());

    this.setState({
      area: wkt
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createGeofence() {
    const payload = this.prepPayload();
    this.props.addGeofence(payload);
  }

  async handleSubmit() {
    if (this.inputIsValid()) {
      await this.createGeofence();
    } else {
      alert("The specified input is not valid.");
    }
  }

  inputIsValid() {
    for (const [, val] of Object.entries(this.state)) {
      if (val === "" || val === undefined) {
        return false;
      }
    }
    return true;
  }

  prepPayload = () => {
    return {
      name: this.state.name,
      description: this.state.description,
      area: this.state.area
    };
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="10">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Geofence</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            defaultValue=""
                            placeholder="Name"
                            type="text"
                            name="name"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            defaultValue=""
                            placeholder="Description"
                            type="text"
                            name="description"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Map
                      googleMapURL={GOOGLE_MAPS_URL}
                      loadingElement={<p>Loading maps...</p>}
                      containerElement={<div className="map-container" />}
                      mapElement={<div className="map" />}
                      center={this.state.center}
                      content={this.state.content}
                      doneDrawing={this.doneDrawing.bind(this)}
                    />
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addGeofence: payload => {
      dispatch(addGeofence(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
