import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardSubtitle,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

import TraccarAPI from "../../lib/TraccarAPI";
import { showNotification } from "../../Redux/actions/notificationActions";
import { setDevice, deleteDevice } from "../../Redux/actions/deviceActions";
import Map from "../../components/Maps/NormalMap";

import "./View.css";

const mapDispatchToProps = dispatch => {
  return {
    showNotification: payload => dispatch(showNotification(payload)),
    setDevice: device => dispatch(setDevice(device)),
    deleteDevice: id => dispatch(deleteDevice(id))
  };
};

const mapStateToProps = state => ({
  auth: { email: state.User.email, password: state.User.password }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    constructor(props) {
      super(props);
      this.GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`;
      this.state = {
        id: this.props.match.params.id,
        device: null,
        position: null,
        client: TraccarAPI(this.props.auth)
      };
    }

    async componentDidMount() {
      try {
        const [device, position] = await this.devicePosition(this.state.id);
        this.setState(Object.assign({}, this.state, { device, position }));
      } catch (e) {
        this.props.showNotification({ title: "Error", message: e.message });
      }
    }

    devicePosition = async id => {
      const devRoute = `/devices?id=${id}`;
      const [start, end] = this.today();
      const posRoute = `/positions?deviceId=${id}&from=${start}&to=${end}`;
      const client = this.state.client;
      const promises = Promise.all([
        client.get(devRoute),
        client.get(posRoute)
      ]);
      const [dev, pos] = await promises;
      const device = dev.data[0] || null;
      const position = pos.data[pos.data.length - 1] || null;
      return [device, position];
    };

    today = () => {
      const day = moment().format("YYYY-MM-DD");
      return [`${day}T00:00:00Z`, `${day}T23:59:59Z`];
    };

    render() {
      return (
        <>
          <div className="content">
            {this.state.device !== null && (
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h4>{this.state.device.name} (ID: {this.state.device.uniqueId})</h4>
                      </CardTitle>
                      <CardSubtitle className="mb-2 text-muted">
                        <div>
                          <a
                            style={{ color: "#ba54f5" }}
                            onClick={() => {
                              this.props.setDevice(this.state.device);
                              this.props.history.push(
                                `/admin/device/edit/${this.state.device.id}`
                              );
                            }}
                          >
                            {" "}
                            Edit
                          </a>
                          <a
                            style={{ color: "#ba54f5" }}
                            onClick={() => {
                              this.props.deleteDevice(this.state.device.id);
                            }}
                          >
                            Delete
                          </a>
                          <Link
                            to={`/admin/device/addToGroup/${this.state.device.id}`}
                          >
                            Add to Group
                          </Link>
                          <Link
                            to={`/admin/device/addToGeofence/${this.state.device.id}`}
                          >
                            Add to Geofence
                          </Link>
                        </div>
                      </CardSubtitle>
                      <CardText>
                        <hr />
                        <table>
                          <tbody>
                            <tr>
                              <td>Status:</td>
                              <td>{String(this.state.device.status).toUpperCase()}</td>
                            </tr>
                            <tr>
                              <td>Disabled:</td>
                              <td>
                                {this.state.device.disabled ? "Yes" : "No"}
                              </td>
                            </tr>
                            <tr>
                              <td>Last Update:</td>
                              <td>{moment(this.state.device.lastUpdate).format('YYYY-MM-DD H:m:s')}</td>
                            </tr>
                            <tr>
                              <td>Category:</td>
                              <td>{this.state.device.category}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
            {this.state.position !== null && (
              <Row>
                <Col md="12">
                  <Map
                    devices={[
                      {
                        name: this.state.device.name,
                        lat: this.state.position.latitude,
                        lng: this.state.position.longitude
                      }
                    ]}
                    center={{
                      lat: this.state.position.latitude,
                      lng: this.state.position.longitude
                    }}
                    googleMapURL={this.GOOGLE_MAPS_URL}
                    loadingElement={<p>Loading maps...</p>}
                    containerElement={<div className="map-container" />}
                    mapElement={<div className="map" />}
                  ></Map>
                </Col>
              </Row>
            )}
            {this.state.device === null && (
              <Row>
                <Col md="8">
                  <h4>No device data at the moment.</h4>
                </Col>
              </Row>
            )}
            {this.state.position === null && (
              <Row>
                <Col md="8">
                  <h4>Device has no positional data for today.</h4>
                </Col>
              </Row>
            )}
          </div>
        </>
      );
    }
  }
);
