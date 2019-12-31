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

import { addUser } from "../../Redux/actions/userActions";
import Utils from "../../utils";

class Add extends React.Component {
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
    if (this.paramsAreValid(Object.values(data))) this.props.addUser(data);
    else alert("The supplied information is invalid.");
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
              <Card>
                <CardHeader>
                  <h5 className="title">Add User</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Fullame</label>
                          <Input
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: payload => {
      dispatch(addUser(payload));
    }
  };
};

export default connect(null, mapDispatchToProps)(Add);
