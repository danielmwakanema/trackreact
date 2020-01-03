import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import TraccarAPI from "../../lib/TraccarAPI";
import { showNotification } from "../../Redux/actions/notificationActions";
import { setDriver } from "../../Redux/actions/driverActions";

import "./View.css";

const mapDispatchToProps = dispatch => {
  return {
    showNotification: payload => dispatch(showNotification(payload)),
    setDriver: driver => dispatch(setDriver(driver))
  };
};

const mapStateToProps = state => ({
  auth: { email: state.User.email, password: state.User.password },
  drivers: state.Driver.drivers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: Number(this.props.match.params.id),
        driver: null,
        client: TraccarAPI(this.props.auth)
      };
    }

    componentDidMount() {
      try {
        const driver = this.get(this.state.id);
        this.setState(Object.assign({}, this.state, { driver }));
      } catch (e) {
        this.error(e);
      }
    }

    get = id => this.props.drivers.filter(driver => driver.id === id)[0];

    edit = () => {
      const driver = this.state.driver;
      this.props.setDriver(driver);
      this.props.history.push(`/admin/driver/edit/${driver.id}`);
    };

    delete = () => {
      this.state.client.delete(`/drivers/${this.state.driver.id}`)
        .then(() => this.props.history.push("/admin/drivers"))
        .catch(this.error);
    };

    error = error => this.props.showNotification({ title: 'Error', message: error.message});

    render() {
      return (
        <>
          <div className="content">
            {this.state.driver !== null && (
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h4 className>
                          {this.state.driver.name} (ID: {this.state.driver.uniqueId})
                        </h4>
                        <UncontrolledDropdown>
                          <Button
                            className="btn-round btn-icon"
                            color="info"
                            caret
                            data-toggle="dropdown"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <DropdownMenu>
                            <DropdownItem onClick={this.edit}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={this.delete}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </CardTitle>
                      <CardText>
                        <hr />
                        <table>
                          <tbody>
                            <tr>
                              <td>License Number:</td>
                              <td>
                                {this.state.driver.attributes.licenseNumber}
                              </td>
                            </tr>
                            <tr>
                              <td>License Expiry Date:</td>
                              <td>
                                {this.state.driver.attributes.licenseExpiryDate}
                              </td>
                            </tr>
                            <tr>
                              <td>Home Address:</td>
                              <td>
                                {this.state.driver.attributes.homeAddress}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
            {this.state.driver === null && (
              <Row>
                <Col md="8">
                  <h4>No driver data at the moment.</h4>
                </Col>
              </Row>
            )}
          </div>
        </>
      );
    }
  }
);
