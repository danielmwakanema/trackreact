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

import { userDrivers } from "../../Redux/actions/driverActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userDrivers();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Driver List</CardTitle>
                  <Link to={`/admin/driver/add`}>+ Driver</Link>
                </CardHeader>
                <CardBody>
                  {this.props.drivers.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Unique Identifier</th>
                          <th>Name</th>
                          <th>License Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.drivers.map(driver => {
                            return (
                              <tr key={driver.uniqueId}>
                                <td>
                                  <Link to={`/admin/driver/view/${driver.id}`}>
                                    {driver.uniqueId}
                                  </Link>
                                </td>
                                <td>{driver.name}</td>
                                <td>{driver.attributes.licenseNumber}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.drivers.length === 0 && (
                    <p>You have no drivers at the moment.</p>
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
    drivers: state.Driver.drivers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userDrivers: () => dispatch(userDrivers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
