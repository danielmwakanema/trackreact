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

import { addMaintenance } from "../../Redux/actions/maintenanceActions";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      start: "",
      period: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createMaintenance = this.createMaintenance.bind(this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createMaintenance() {
    const payload = this.prepPayload();
    this.props.addMaintenance(payload);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.inputIsValid()) {
      await this.createMaintenance();
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
      type: this.state.type,
      start: this.state.start,
      period: this.state.period
    };
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Maintenance</h5>
                </CardHeader>
                <CardBody>
                  <Form>
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
                          <label>Type</label>
                          <Input
                            defaultValue=""
                            type="text"
                            placeholder="XAB112"
                            name="type"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Start</label>
                          <Input
                            defaultValue=""
                            type="number"
                            placeholder="0"
                            name="start"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Period</label>
                          <Input
                            defaultValue=""
                            type="number"
                            placeholder="0"
                            name="period"
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
    addMaintenance: payload => {
      dispatch(addMaintenance(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
