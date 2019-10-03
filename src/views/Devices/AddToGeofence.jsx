import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  CardFooter
} from "reactstrap";

import { userGeofences } from "../../Redux/actions/geofenceActions";
import { updateDevice, userDevices } from "../../Redux/actions/deviceActions";

class AddToGeofence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Number(this.props.match.params.id)
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.userGeofences();
    this.props.userDevices();
  }

  handleSubmit() {
    this.props.updateDevice(this.prepPayload());
  }

  prepPayload() {
    const device = this.props.devices.filter(
      dev => dev.id === Number(this.state.id)
    )[0];
    device.geofenceIds = Array.from(
      document.getElementById("geofenceIds").selectedOptions
    ).map(option => Number(option.value));
    return device;
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Device To Geofences</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Geofences</label>
                          <select
                            id="geofenceIds"
                            name="geofenceIds"
                            className={"form-control"}
                            multiple
                            style={{ paddingTop: "5%", paddingBottom: "5%" }}
                          >
                            {this.props.geofences.map(geofence => (
                              <option key={geofence.id} value={geofence.id}>
                                {geofence.name}
                              </option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
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
    userGeofences: () => dispatch(userGeofences()),
    userDevices: () => dispatch(userDevices()),
    updateDevice: payload => dispatch(updateDevice(payload))
  };
};

const mapStateToProps = state => {
  return {
    geofences: state.Geofence.geofences,
    devices: state.Device.devices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToGeofence);
