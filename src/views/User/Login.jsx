import React from "react";

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

import InfoModal from '../../components/Modals/InfoModal';

import TraccarAPI from "../../lib/TraccarAPI";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showModal: false,
      modalMessage: '',
      modalHeader: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  async login(email, password) {
    try {
      const response = await TraccarAPI.post('/api/session',
                                            new URLSearchParams(`email=${email}&password=${password}`));
      response.status === 200 && this.props.history.push('/admin/dashboard')
    } catch (e) {
      this.showModal('Error', 'Wrong email/password.')
      console.error(e.message)
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.inputIsValid()) {
      await this.login(this.state.email, this.state.password);
    } else this.showModal('Error', 'Your email and password is required.');
  }

  inputIsValid() {
    return this.state.email.length && this.state.password.length;
  }

  showModal (title, message) {
    this.setState({ modalHeader: title, modalMessage: message, showModal: true })
  }

  hideModal () {
    this.setState({ showModal: false })
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
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Enter email"
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        { this.state.showModal && <InfoModal header={this.state.modalHeader } message={this.state.modalMessage} toggle={this.hideModal} /> }
      </div>
    );
  }
}

export default Login;
