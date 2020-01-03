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
import { setGeofence } from "../../Redux/actions/geofenceActions";

import "./View.css";

const mapDispatchToProps = dispatch => {
  return {
    showNotification: payload => dispatch(showNotification(payload)),
    setGeofence: geofence => dispatch(setGeofence(geofence))
  };
};

const mapStateToProps = state => ({
  auth: { email: state.User.email, password: state.User.password },
  geofences: state.Geofence.geofences
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
        geofence: null,
        client: TraccarAPI(this.props.auth)
      };
    }

    componentDidMount() {
      try {
        const geofence = this.get(this.state.id);
        this.setState(Object.assign({}, this.state, { geofence }));
      } catch (e) {
        this.error(e);
      }
    }

    get = id => this.props.geofences.filter(geofence => geofence.id === id)[0];

    edit = () => {
      const geofence = this.state.geofence;
      this.props.setGeofence(geofence);
      this.props.history.push(`/admin/geofence/edit/${geofence.id}`);
    };

    delete = () => {
      this.state.client.delete(`/geofences/${this.state.geofence.id}`)
        .then(() => this.props.history.push("/admin/geofences"))
        .catch(this.error);
    };

    error = error => this.props.showNotification({ title: 'Error', message: error.message});

    render() {
      return (
        <>
          <div className="content">
            {this.state.geofence !== null && (
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h4 className>
                          {this.state.geofence.name}
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
                              <td>Description:</td>
                              <td>
                                {this.state.geofence.description}
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
            {this.state.geofence === null && (
              <Row>
                <Col md="8">
                  <h4>No geofence data at the moment.</h4>
                </Col>
              </Row>
            )}
          </div>
        </>
      );
    }
  }
);
