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

import {
  userDrivers,
  resetUserDriversList
} from "../../Redux/actions/driverActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userDrivers();
  }

  componentWillUnmount() {
    this.props.resetUserDriversList();
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
                </CardHeader>
                <CardBody>
                  {this.props.drivers.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Unique Identifier</th>
                          <th>Name</th>
                          <th>License Number</th>
                          <th>License Expiry Date</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.drivers.map(driver => {
                            return (
                              <tr key={driver.uniqueId}>
                                <td>{driver.uniqueId}</td>
                                <td>{driver.name}</td>
                                <td>{driver.attributes.licenseNumber}</td>
                                <td>{driver.attributes.licenseExpiryDate}</td>
                                <td>{driver.attributes.homeAddress}</td>
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
    userDrivers: () => dispatch(userDrivers()),
    resetUserDriversList: () => dispatch(resetUserDriversList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
