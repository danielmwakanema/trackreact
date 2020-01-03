import React from "react";
import { connect } from "react-redux";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import { fetchReport, resetReports } from "../../Redux/actions/reportActions";
import { showNotification } from "../../Redux/actions/notificationActions";
import Utils from "../../utils";
import ToCSV from "../../components/Utils/ToCSV";
import moment from 'moment';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, FormGroup, Input, Form, Table } from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  componentWillUnmount = () => {
    this.props.resetReports();
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const fieldValues = this.params()
    if (this.paramsAreValid(fieldValues)) {
      const [id, reportType, startDate, endDate] = fieldValues
      this.props.fetchReport([id], reportType, this.toIso(startDate), this.toIso(endDate))
    } else this.props.showNotification('Error', 'Please make sure to enter valid information.')
  }

  paramsAreValid = params => params.reduce((acc, val) => acc && (val !== ''), true)

  params = () => Utils.formFieldValues(['deviceId', 'reportType', 'startDate', 'endDate'])

  toIso = date => `${date}T00:00:00Z`

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
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
                            onChange={this.handleInputChange}
                          >
                            <>
                              {this.props.devices.map(device => <option key={device.id} value={device.id}>{device.name}</option>)}
                            </>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <select
                            id="reportType"
                            name="reportType"
                            className={"form-control"}
                            onChange={this.handleInputChange}
                          >
                            <option value="trips">Trips</option>
                            <option value="summary">Summary</option>
                            <option value="stops">Stops</option>
                            <option value="events">Events</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input
                            id="run"
                            name="run"
                            value="Run Report"
                            type="submit"
                            onClick={this.handleSubmit}
                            style={{ backgroundColor: "#2c66f5", color: "white" }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.props.tripReport && <div>
            <Row>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total # of Trips</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-cart text-info" /> {this.props.tripReport.trips}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Speed</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-delivery-fast text-info" /> {this.props.tripReport.speedAverage}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Fuel Used</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-money-coins text-info" /> {this.props.tripReport.fuelAverage} L
                  </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total Distance Covered</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-compass-05 text-info" /> {this.props.tripReport.distanceTotal}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Trip Duration</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-globe-2 text-info" /> {this.props.tripReport.durationAverage}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Maximum Speed</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-chart-bar-32 text-info" /> {this.props.tripReport.maxSpeedAverage}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Speed Trends</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" /> {this.props.tripReport.maxSpeedAverage}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.tripReport.speedTrends.map((_, index) => index), datasets: [{ backgroundColor: "#d346b1", label: "Trips", data: this.props.tripReport.speedTrends.map(val => val) }] }}
                        options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Distance Trends</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                      {this.props.tripReport.distanceTotal}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.tripReport.distanceTrends.map((_, index) => index), datasets: [{ backgroundColor: "#1f8ef1", label: "Distance", data: this.props.tripReport.distanceTrends.map(val => val) }] }}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Fuel Trends</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-send text-success" /> {this.props.tripReport.fuelAverage}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.tripReport.fuelTrends.map((_, index) => index), datasets: [{ backgroundColor: "aliceblue", label: "Fuel", data: this.props.tripReport.fuelTrends.map(val => val) }] }}
                        options={chartExample4.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row></div>}
          {
            this.props.summaryReport && <div>
              <Row>
                <Col lg="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Summary Report</h5>
                      <ToCSV data={this.props.summaryReport} filename={`SummaryReport${moment().format('YYYY-MM-DD H:m:s')}.csv`}></ToCSV>
                    </CardHeader>
                    <CardBody>
                      <div className="summary-table">
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Max Speed</th>
                              <th>Average Speed</th>
                              <th>Distance</th>
                              <th>Fuel</th>
                              <th>Engine Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.summaryReport.map((summary, index) => (
                              <tr key={index}>
                                <td>{summary.name}</td>
                                <td>{summary.maxSpeed}</td>
                                <td>{summary.averageSpeed}</td>
                                <td>{summary.distance}</td>
                                <td>{summary.fuel}</td>
                                <td>{summary.engineHours}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          }
          {
            this.props.stopReport && <div>
              <Row>
                <Col lg="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Stop Report</h5>
                      <ToCSV data={this.props.stopReport} filename={`StopReport${moment().format('YYYY-MM-DD H:m:s')}.csv`}></ToCSV>
                    </CardHeader>
                    <CardBody>
                      <div className="summary-table">
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Duration</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Latitude</th>
                              <th>Longitude</th>
                              <th>Fuel Spent</th>
                              <th>Engine Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.stopReport.map((stop, index) => (
                              <tr key={index}>
                                <td>{stop.name}</td>
                                <td>{stop.duration}</td>
                                <td>{stop.start}</td>
                                <td>{stop.end}</td>
                                <td>{stop.lat}</td>
                                <td>{stop.lon}</td>
                                <td>{stop.fuel}</td>
                                <td>{stop.engineHours}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          }
          {
            this.props.eventReport && <div>
              <Row>
                <Col lg="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Event Report</h5>
                      <ToCSV data={this.props.eventReport} filename={`EventReport${moment().format('YYYY-MM-DD H:m:s')}.csv`}></ToCSV>
                    </CardHeader>
                    <CardBody>
                      <div className="summary-table">
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.eventReport.map((event, index) => (
                              <tr key={index}>
                                <td>{event.name}</td>
                                <td>{event.type}</td>
                                <td>{event.at}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          }
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReport: (ids = [], type, startDate, endDate) => dispatch(fetchReport(ids, type, startDate, endDate)),
    resetReports: () => dispatch(resetReports()),
    showNotification: (title, message) => dispatch(showNotification({ title, message }))
  };
};

const mapStateToProps = state => {
  return {
    report: state.Report.report,
    tripReport: state.Report.tripReport,
    summaryReport: state.Report.summaryReport,
    stopReport: state.Report.stopReport,
    eventReport: state.Report.eventReport,
    devices: state.Device.devices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
