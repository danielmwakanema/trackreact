import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";

import NormalMap from "../../components/Maps/NormalMap";

const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_PLATFORM_API_KEY}`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      mapCenter: {
        lat: -13.962647,
        lng: 33.794568
      },
      watchId: null
    };
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

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" className={"mb-4"}>
              <NormalMap
                googleMapURL={GOOGLE_MAPS_URL}
                loadingElement={<p>Loading maps...</p>}
                containerElement={<div className="map-container" />}
                mapElement={<div className="map" />}
                center={this.state.mapCenter}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" /> 763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
