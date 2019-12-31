import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import { updateUser } from "../../Redux/actions/userActions";
import Utils from "../../utils";

class Edit extends React.Component {
  FIELD_IDS = [
    "name",
    "email",
    "administrator",
    "disabled",
    "password",
    "userLimit",
    "deviceLimit"
  ];

  handleSubmit = () => {
    const data = this.params();
    const id = this.props.user.id;
    if (this.paramsAreValid(Object.values(data))) {
      const merge = Object.assign({}, this.props.user, data)
      this.props.updateUser(id, merge)
    } else alert("The supplied information is invalid.");
  };

  params = () => Utils.formFieldMap(this.FIELD_IDS);

  paramsAreValid = (par = []) =>
    par.reduce((acc, val) => val !== "" && val !== undefined && acc, true);

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              {this.props.user !== null && (
                <Card>
                  <CardHeader>
                    <h5 className="title">Edit User</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Fullame</label>
                            <Input
                              defaultValue={this.props.user.name}
                              placeholder="Name"
                              type="text"
                              id="name"
                              name="name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              defaultValue={this.props.user.email}
                              placeholder="Email"
                              type="email"
                              id="email"
                              name="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Is an administrator?</label>
                            <select
                              id="administrator"
                              name="administrator"
                              className={"form-control"}
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Is disabled?</label>
                            <select
                              id="disabled"
                              name="disabled"
                              className={"form-control"}
                            >
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Password</label>
                            <Input
                              defaultValue={this.props.user.password}
                              placeholder="Password"
                              type="password"
                              id="password"
                              name="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>Device Limit</label>
                            <Input
                              defaultValue={this.props.user.deviceLimit}
                              placeholder="Device limit"
                              type="number"
                              id="deviceLimit"
                              name="deviceLimit"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="11">
                          <FormGroup>
                            <label>User Limit</label>
                            <Input
                              defaultValue={this.props.user.userLimit}
                              placeholder="User limit"
                              type="number"
                              id="userLimit"
                              name="userLimit"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({ user: state.User.user });

const mapDispatchToProps = dispatch => ({
  updateUser: (id, payload) => dispatch(updateUser(id, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
