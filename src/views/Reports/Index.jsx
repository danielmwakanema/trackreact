import React from "react";
import { connect } from "react-redux";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import { deviceReports } from "../../Redux/actions/reportActions";
import Utils from "../../utils";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, FormGroup, Input, Form } from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  handleSubmit = evt => {
    evt.preventDefault()
    const fieldValues = this.params()
    if (this.paramsAreValid(fieldValues)) {
      const [id, reportType, startDate, endDate] = fieldValues
      this.props.deviceReports([id], reportType, this.toIso(startDate), this.toIso(endDate))
    } else alert('Invalid params...')
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
                            <option value="trips">Summary</option>
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
                      <Col className="pr-md-1 d-inline" md="4">
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
          {this.props.parsedReport && <div>
            <Row>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total # of Trips</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-cart text-info" /> {this.props.parsedReport.trips}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Speed</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-delivery-fast text-info" /> {this.props.parsedReport.speedAverage}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Fuel Used</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-money-coins text-info" /> {this.props.parsedReport.fuelAverage} L
                  </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Total Distance Covered</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-compass-05 text-info" /> {this.props.parsedReport.distanceTotal}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Trip Duration</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-globe-2 text-info" /> {this.props.parsedReport.durationAverage}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="2">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average Maximum Speed</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-chart-bar-32 text-info" /> {this.props.parsedReport.maxSpeedAverage}
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
                      <i className="tim-icons icon-bell-55 text-info" /> {this.props.parsedReport.maxSpeedAverage}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.parsedReport.speedTrends.map((_, index) => index), datasets: [{ backgroundColor: "#d346b1", label: "Trips", data: this.props.parsedReport.speedTrends.map(val => val) }] }}
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
                      {this.props.parsedReport.distanceTotal}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.parsedReport.distanceTrends.map((_, index) => index), datasets: [{ backgroundColor: "#1f8ef1", label: "Distance", data: this.props.parsedReport.distanceTrends.map(val => val) }] }}
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
                      <i className="tim-icons icon-send text-success" /> {this.props.parsedReport.fuelAverage}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={{ labels: this.props.parsedReport.fuelTrends.map((_, index) => index), datasets: [{ backgroundColor: "aliceblue", label: "Fuel", data: this.props.parsedReport.fuelTrends.map(val => val) }] }}
                        options={chartExample4.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row></div>}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deviceReports: (ids = [], type, startDate, endDate) => dispatch(deviceReports(ids, type, startDate, endDate))
  };
};

const mapStateToProps = state => {
  return {
    deviceReport: state.Report.deviceReport,
    parsedReport: state.Report.parsedReport,
    devices: state.Device.devices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
