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

import { userDevices } from "../../Redux/actions/deviceActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userDevices();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Device List</CardTitle>
                </CardHeader>
                <CardBody>
                  {this.props.devices.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Unique Identifier</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Disabled</th>
                          <th>Model</th>
                          <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.devices.map(device => {
                            return (
                              <tr key={device.uniqueId}>
                                <td>{device.uniqueId}</td>
                                <td>{device.name}</td>
                                <td>{device.status}</td>
                                <td>{device.disabled ? 'Yes' : 'No'}</td>
                                <td>{device.model}</td>
                                <td>{device.category}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.devices.length === 0 && (
                    <p>You have no devices at the moment.</p>
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
    devices: state.Device.devices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userDevices: () => dispatch(userDevices())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
