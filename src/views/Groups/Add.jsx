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

import { addGroup } from "../../Redux/actions/groupActions";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.prepPayload = this.prepPayload.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createGroup() {
    const payload = this.prepPayload();
    this.props.addGroup(payload);
  }

  async handleSubmit() {
    if (this.inputIsValid()) {
      await this.createGroup();
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
      name: this.state.name
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
                  <h5 className="title">Add Group</h5>
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
    addGroup: payload => {
      dispatch(addGroup(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);