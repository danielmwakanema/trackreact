import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  CardHeader,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import moment from "moment";

import Utils from "../../utils";
import ToCSV from "../../components/Utils/ToCSV";
import {
  deviceTrips,
  resetDeviceTrips
} from "../../Redux/actions/deviceActions";
import { showNotification } from "../../Redux/actions/notificationActions";
import PathTracer from "../../components/Maps/PathTracer";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      showModal: false
    };
  }

  toggleModal = () =>
    this.setState(
      Object.assign({}, this.state, { showModal: !this.state.showModal })
    );

  componentWillUnmount() {
    this.props.resetDeviceTrips();
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const fieldValues = this.params();
    if (this.paramsAreValid(fieldValues)) {
      this.setState({ trip: null });
      const [id, startDate, endDate] = fieldValues;
      this.props.deviceTrips(id, this.toIso(startDate), this.toIso(endDate));
    } else
      this.props.showNotification(
        "Error",
        "Please make sure to enter valid information."
      );
  };

  setTrip = trip =>
    this.setState(
      {
        trip: Object.assign(
          {},
          {
            src: { lat: trip.startLat, lon: trip.startLon },
            des: { lat: trip.endLat, lon: trip.endLon }
          }
        )
      },
      this.toggleModal
    );

  paramsAreValid = params =>
    params.reduce((acc, val) => acc && val !== "", true);

  params = () => Utils.formFieldValues(["deviceId", "startDate", "endDate"]);

  toIso = date => `${date}T00:00:00Z`;

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12" md="12">
              <Card style={{ backgroundColor: "inherit" }}>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <select
                            id="deviceId"
                            name="deviceId"
                            className={"form-control"}
                          >
                            <>
                              {this.props.devices.map(device => (
                                <option key={device.id} value={device.id}>
                                  {device.name}
                                </option>
                              ))}
                            </>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input id="startDate" name="startDate" type="date" />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input id="endDate" name="endDate" type="date" />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="4">
                        <FormGroup>
                          <Input
                            id="run"
                            name="run"
                            value="Fetch Trips"
                            type="submit"
                            onClick={this.handleSubmit}
                            style={{
                              backgroundColor: "#2c66f5",
                              color: "white"
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.props.trips.length > 0 && (
            <Row>
              <Col lg="12" md="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Trip Report</h5>
                    <ToCSV
                      data={this.props.trips}
                      filename={`TripReport${moment().format(
                        "YYYY-MM-DD H:m:s"
                      )}.csv`}
                    ></ToCSV>
                  </CardHeader>
                  <CardBody>
                    <div className="summary-table">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Distance</th>
                            <th>Avg. Speed</th>
                            <th>Max Speed</th>
                            <th>Spent Fuel</th>
                            <th>Start Odometer</th>
                            <th>End Odometer</th>
                            <th>Start Lat</th>
                            <th>Start Lon</th>
                            <th>End Lat</th>
                            <th>End Lon</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.trips.map((trip, index) => (
                            <tr key={index}>
                              <td>
                                <Button
                                  onClick={() => this.setTrip(trip)}
                                  color="default"
                                >{`Trip #${index}`}</Button>
                              </td>
                              <td>{Math.round(trip.distance)}</td>
                              <td>{Math.round(trip.averageSpeed)}</td>
                              <td>{Math.round(trip.maxSpeed)}</td>
                              <td>{trip.spentFuel}</td>
                              <td>{trip.startOdometer}</td>
                              <td>{trip.endOdometer}</td>
                              <td>{trip.startLat}</td>
                              <td>{trip.startLon}</td>
                              <td>{trip.endLat}</td>
                              <td>{trip.endLon}</td>
                              <td>
                                {moment(trip.startTime).format(
                                  "YYYY-MM-DD H:m:s"
                                )}
                              </td>
                              <td>
                                {moment(trip.endTime).format(
                                  "YYYY-MM-DD H:m:s"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          {this.state.showModal === true && (
            <Row>
              <Col md="12" lg="12" style={{ marginTop: "1%" }}>
                <Modal
                  isOpen={this.state.showModal}
                  toggle={this.toggleModal}
                  size="lg"
                >
                  <ModalHeader
                    className="justify-content-center"
                    toggle={this.toggleModal}
                  >
                    Trip Path
                  </ModalHeader>
                  <ModalBody>{PathTracer(this.state.trip)}</ModalBody>
                </Modal>
              </Col>
            </Row>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: state.Device.devices,
    trips: state.Device.deviceTrips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceTrips: (id, start, end) => dispatch(deviceTrips(id, start, end)),
    showNotification: (title, message) =>
      dispatch(showNotification({ title, message })),
    resetDeviceTrips: () => dispatch(resetDeviceTrips())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
