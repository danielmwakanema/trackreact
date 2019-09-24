import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { userGeofences } from "../../Redux/actions/geofenceActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userGeofences();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Geofence List</CardTitle>
                </CardHeader>
                <CardBody>
                  {this.props.geofences.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Area</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.geofences.map(geofence => {
                            return (
                              <tr key={geofence.id}>
                                <td>{geofence.name}</td>
                                <td>{geofence.description}</td>
                                <td>{geofence.area}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.geofences.length === 0 && (
                    <p>You have no geofences at the moment.</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    geofences: state.Geofence.geofences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userGeofences: () => dispatch(userGeofences())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
