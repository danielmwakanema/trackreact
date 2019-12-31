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

import { addDevice } from "../../Redux/actions/deviceActions";
import { showNotification } from "../../Redux/actions/notificationActions";
import Utils from "../../utils";

class Add extends React.Component {
  FIELD_IDS = [
    "uniqueId",
    "name",
    "status",
    "disabled",
    "model",
    "category",
  ];

  handleSubmit = () => {
    const data = this.params();
    if (this.paramsAreValid(Object.values(data))) this.props.addDevice(data)
    else this.props.showNotification('Error', 'Please make sure to enter valid information.')
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
                  <h5 className="title">Edit Device</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Unique ID</label>
                          <Input
                            defaultValue=""
                            placeholder="Unique identifier"
                            type="text"
                            id="uniqueId"
                            name="uniqueId"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Name</label>
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
                          <label>Status</label>
                          <select
                            id="status"
                            name="status"
                            className={"form-control"}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Disabled</label>
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
                          <label>Model</label>
                          <Input
                            defaultValue=""
                            type="text"
                            placeholder="Model"
                            id="model"
                            name="model"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Category</label>
                          <Input
                            defaultValue=""
                            type="text"
                            placeholder="Category"
                            id="category"
                            name="category"
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
    addDevice: payload => {
      dispatch(addDevice(payload));
    },
    showNotification: (title, message) => dispatch(showNotification({ title, message }))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
