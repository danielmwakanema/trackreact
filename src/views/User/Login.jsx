import React from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import "./Login.css";

import { login } from "../../Redux/actions/userActions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate (previousProps) {
    if (this.props.userIsAvailable !== previousProps.userIsAvailable) {
      this.props.history.push("/admin/dashboard")
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.inputIsValid()) {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  inputIsValid() {
    return this.state.email.length && this.state.password.length;
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col className="mx-auto mt-4 pt-4" md="4">
            <h2>TRACKREACT v1.0</h2>
            <Card>
              <CardTitle className="pt-4 pl-3">Login</CardTitle>
              <hr style={{ backgroundColor: "white", width: "90%" }} />
              <CardBody>
                <form>
                  <FormGroup>
                    <Label for="exampleEmail">Email address</Label>
                    <Input
                      type="text"
                      name="email"
                      id="exampleEmail"
                      placeholder="Enter email"
                      onChange={ event => this.handleChange(event) }
                    />
                    <FormText color="muted">
                      We'll never share your email with anyone else.
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={ event => this.handleChange(event) }
                    />
                  </FormGroup>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={ event => this.handleSubmit(event) }
                  >
                    Submit
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userIsAvailable: state.User.email.length > 0 && state.User.password.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
