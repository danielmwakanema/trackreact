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

import { addDriver } from "../../Redux/actions/driverActions";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uniqueId: "",
      licenseNumber: "",
      licenseExpiryDate: "",
      homeAddress: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createDriver = this.createDriver.bind(this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createDriver() {
    const payload = this.prepPayload();
    this.props.addDriver(payload);
  }

  async handleSubmit() {
    if (this.inputIsValid()) {
      await this.createDriver();
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
      attributes: {
        licenseNumber: this.state.licenseNumber,
        licenseExpiryDate: this.state.licenseExpiryDate,
        homeAddress: this.state.homeAddress
      }
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
                  <h5 className="title">Add Driver</h5>
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
                          <label>Fullame</label>
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
                          <label>License Number</label>
                          <Input
                            defaultValue=""
                            placeholder="License number"
                            type="text"
                            name="licenseNumber"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>License Expiry Date</label>
                          <Input
                            defaultValue=""
                            type="date"
                            name="licenseExpiryDate"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Home Addess</label>
                          <Input
                            defaultValue=""
                            placeholder="Home address"
                            type="textarea"
                            name="homeAddress"
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
    addDriver: payload => {
      dispatch(addDriver(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);