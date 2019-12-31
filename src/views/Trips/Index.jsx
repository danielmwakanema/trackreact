import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Form, FormGroup, Input } from 'reactstrap';

import Utils from '../../utils';
import { deviceTrips } from '../../Redux/actions/deviceActions';
import { showNotification } from "../../Redux/actions/notificationActions";
import PathTracer from "../../components/Maps/PathTracer";

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: null
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const fieldValues = this.params()
    if (this.paramsAreValid(fieldValues)) {
      const [id, startDate, endDate] = fieldValues
      this.props.deviceTrips(id, this.toIso(startDate), this.toIso(endDate))
    } else this.props.showNotification('Error', 'Please make sure to enter valid information.')
  }

  handlePlot = evt => {
    evt.preventDefault()
    const id = document.getElementById('tripId').value
    const trip = this.props.trips.filter(tr => tr.id === id)[0]
    this.setTrip(trip)
  }

  setTrip = trip => this.setState({ trip: Object.assign({}, {
    src: { lat: trip.startLat, lon: trip.startLon },
    des: { lat: trip.endLat, lon: trip.endLon }
  })})

  paramsAreValid = params => params.reduce((acc, val) => acc && (val !== ''), true)

  params = () => Utils.formFieldValues(['deviceId', 'startDate', 'endDate'])

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
                          >
                            <>
                              {this.props.devices.map(device => <option key={device.id} value={device.id}>{device.name}</option>)}
                            </>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1 d-inline" md="2">
                        <FormGroup>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                          />
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
                            style={{ backgroundColor: "#2c66f5", color: "white" }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.props.trips.length > 0 && (
                      <Row>
                        <Col className="pr-md-1 d-inline" md="6" lg="6">
                          <FormGroup>
                            <select
                              id="tripId"
                              name="tripId"
                              className={"form-control"}
                            >
                              <>
                                {this.props.trips.map(trip => <option key={trip.id} value={trip.id}>{`From: (${trip.startLat},${trip.startLon}) to (${trip.endLat},${trip.endLon})`}</option>)}
                              </>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1 d-inline" md="4">
                          <FormGroup>
                            <Input
                              id="plot"
                              name="plot"
                              value="Plot"
                              type="submit"
                              onClick={this.handlePlot}
                              style={{ backgroundColor: "#2c66f5", color: "white" }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {
            this.state.trip !== null && <div>
              <Col md="12" lg="12">
                { (PathTracer(this.state.trip)) }
              </Col>
            </div>
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    devices: state.Device.devices,
    trips: state.Device.deviceTrips
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deviceTrips: (id, start, end) => dispatch(deviceTrips(id, start, end)),
    showNotification: (title, message) => dispatch(showNotification({ title, message }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)