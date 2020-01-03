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
import { setUser } from "../../Redux/actions/userActions";

import "./View.css";

const mapDispatchToProps = dispatch => {
  return {
    showNotification: payload => dispatch(showNotification(payload)),
    setUser: user => dispatch(setUser(user))
  };
};

const mapStateToProps = state => ({
  auth: { email: state.User.email, password: state.User.password },
  users: state.User.users
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
        user: null,
        client: TraccarAPI(this.props.auth)
      };
    }

    componentDidMount() {
      try {
        const user = this.get(this.state.id);
        this.setState(Object.assign({}, this.state, { user }));
      } catch (e) {
        this.error(e);
      }
    }

    get = id => this.props.users.filter(user => user.id === id)[0];

    edit = () => {
      const user = this.state.user;
      this.props.setUser(user);
      this.props.history.push(`/admin/user/edit/${user.id}`);
    };

    delete = () => {
      this.state.client.delete(`/users/${this.state.user.id}`)
        .then(() => this.props.history.push("/admin/users"))
        .catch(this.error);
    };

    error = error => this.props.showNotification({ title: 'Error', message: error.message});

    render() {
      return (
        <>
          <div className="content">
            {this.state.user !== null && (
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h4 className>
                          {this.state.user.name} ({this.state.user.administrator ? 'Administrator' : 'Standard'})
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
                              <td>Email:</td>
                              <td>
                                {this.state.user.email}
                              </td>
                            </tr>
                            <tr>
                              <td>Disabled:</td>
                              <td>
                                {this.state.user.disabled ? 'Yes' : 'No'}
                              </td>
                            </tr>
                            <tr>
                              <td>User Limit:</td>
                              <td>
                                {this.state.user.userLimit}
                              </td>
                            </tr>
                            <tr>
                              <td>Device Limit:</td>
                              <td>
                                {this.state.user.deviceLimit}
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
            {this.state.user === null && (
              <Row>
                <Col md="8">
                  <h4>No user data at the moment.</h4>
                </Col>
              </Row>
            )}
          </div>
        </>
      );
    }
  }
);
