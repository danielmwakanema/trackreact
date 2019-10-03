import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col
} from "reactstrap";

import { viewDevice } from "../../Redux/actions/deviceActions";

class View extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    this.props.viewDevice(this.props.match.params.id);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createDevice() {
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
      status: document.getElementById("status").value,
      disabled: Boolean(document.getElementById("disabled").value),
      category: this.state.category,
      model: this.state.model
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
                  <h5 className="title">View Geofence</h5>
                </CardHeader>
                <CardBody>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
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
    viewDevice: deviceId => dispatch(viewDevice(deviceId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(View);
