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

import { updateDriver } from "../../Redux/actions/driverActions";
import { showNotification } from "../../Redux/actions/notificationActions";
import Utils from "../../utils";

class Edit extends React.Component {
  FIELD_IDS = [
    "name",
    "uniqueId",
    "licenseNumber",
    "licenseExpiryDate",
    "homeAddress"
  ];

  handleSubmit = () => {
    const data = this.params();
    if (this.paramsAreValid(Object.values(data))) {
      const id = this.props.driver.id;
      const merge = Object.assign({}, this.props.driver, this.prep(data));
      this.props.updateDriver(id, merge);
    } else this.props.showNotification('Error', 'Please make sure to enter valid information.')
  };

  prep = payload => {
    return {
      uniqueId: payload.uniqueId,
      name: payload.name,
      attributes: {
        licenseNumber: payload.licenseNumber,
        licenseExpiryDate: payload.licenseExpiryDate,
        homeAddress: payload.homeAddress
      }
    };
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
                  <h5 className="title">Add Driver</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Unique ID</label>
                          <Input
                            defaultValue={this.props.driver.uniqueId}
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
                          <label>Fullame</label>
                          <Input
                            defaultValue={this.props.driver.name}
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
                          <label>License Number</label>
                          <Input
                            defaultValue={this.props.driver.attributes.licenseNumber}
                            placeholder="License number"
                            type="text"
                            id="licenseNumber"
                            name="licenseNumber"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>License Expiry Date</label>
                          <Input
                            defaultValue={this.props.driver.attributes.licenseExpiryDate}
                            type="date"
                            id="licenseExpiryDate"
                            name="licenseExpiryDate"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Home Addess</label>
                          <Input
                            defaultValue={this.props.driver.attributes.homeAddress}
                            placeholder="Home address"
                            type="textarea"
                            id="homeAddress"
                            name="homeAddress"
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

const mapStateToProps = state => ({ driver: state.Driver.driver });

const mapDispatchToProps = dispatch => {
  return {
    updateDriver: (id, payload) => {
      dispatch(updateDriver(id, payload));
    },
    showNotification: (title, message) => dispatch(showNotification({ title, message }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
