import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

import {
  userDevices,
  setDevice,
  deleteDevice
} from "../../Redux/actions/deviceActions";

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
                  <Link to={`/admin/device/add`}>+ Device</Link>
                </CardHeader>
                <CardBody>
                  {this.props.devices.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Unique Identifier</th>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.devices.map(device => {
                            return (
                              <tr key={device.uniqueId}>
                                <td>
                                  <Link to={`/admin/device/view/${device.id}`}>
                                    {device.uniqueId}
                                  </Link>
                                </td>
                                <td>{device.name}</td>
                                <td>{device.status}</td>
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
    userDevices: () => dispatch(userDevices()),
    setDevice: payload => dispatch(setDevice(payload)),
    deleteDevice: id => dispatch(deleteDevice(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
