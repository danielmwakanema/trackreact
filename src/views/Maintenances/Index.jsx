import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { userMaintenances } from "../../Redux/actions/maintenanceActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userMaintenances();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Maintenance List</CardTitle>
                </CardHeader>
                <CardBody>
                  {this.props.maintenances.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Start</th>
                          <th>Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.maintenances.map(maintenance => {
                            return (
                              <tr key={maintenance.id}>
                                <td>{maintenance.name}</td>
                                <td>{maintenance.type}</td>
                                <td>{maintenance.start}</td>
                                <td>{maintenance.period}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.maintenances.length === 0 && (
                    <p>You have no maintenances at the moment.</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    maintenances: state.Maintenance.maintenances
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userMaintenances: () => dispatch(userMaintenances())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
