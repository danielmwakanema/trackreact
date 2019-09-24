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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uniqueId: "",
      model: "",
      category: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createDevice() {
    const payload = this.prepPayload();
    this.props.addDevice(payload);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.inputIsValid()) {
      await this.createDevice();
    } else {
      alert("The specified input is not valid.");
    }
  }

  inputIsValid() {
    for (const [, val] of Object.entries(this.state)) {
      if (val === "" || val === undefined) {
        return false;
      }
    }
    return true;
  }

  prepPayload = () => {
    return {
      name: this.state.name,
      uniqueId: this.state.uniqueId,
      status: document.getElementById('status').value,
      disabled: Boolean(document.getElementById('disabled').value),
      category: this.state.category,
      model: this.state.model
    };
  };

  componentWillUnmount() {
    this.setState({});
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Device</h5>
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
                            name="uniqueId"
                            onChange={this.handleInputChange}
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
                            name="name"
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
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
                          <label>Model</label>
                          <Input
                            defaultValue=""
                            type="text"
                            placeholder="XAB112"
                            name="model"
                            onChange={this.handleInputChange}
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
                            placeholder="Cab"
                            name="category"
                            onChange={this.handleInputChange}
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
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
