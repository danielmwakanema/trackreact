import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  CardFooter
} from "reactstrap";

import { userGroups } from "../../Redux/actions/groupActions";
import { updateDevice, userDevices } from "../../Redux/actions/deviceActions";

class AddToGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Number(this.props.match.params.id)
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.userGroups();
    this.props.userDevices();
  }

  handleSubmit() {
    this.props.updateDevice(this.prepPayload());
  }

  prepPayload() {
    const device = this.props.devices.filter(dev => dev.id === Number(this.state.id))[0]
    device.groupId = Number(document.getElementById('groupId').value)
    return device
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Device To Group</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Group</label>
                          <select
                            id="groupId"
                            name="groupId"
                            className={"form-control"}
                          >
                            {this.props.groups.map(group => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                          </select>
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
    userGroups: () => dispatch(userGroups()),
    userDevices: () => dispatch(userDevices()),
    updateDevice: payload => dispatch(updateDevice(payload))
  };
};

const mapStateToProps = state => {
  return {
    groups: state.Group.groups,
    devices: state.Device.devices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToGroup);
