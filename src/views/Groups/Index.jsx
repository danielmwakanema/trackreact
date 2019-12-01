import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

import { userGroups } from "../../Redux/actions/groupActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.userGroups();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Group List</CardTitle>
                  <Link to={`/admin/group/add`}>+ Group</Link>
                </CardHeader>
                <CardBody>
                  {this.props.groups.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.groups.map(group => {
                            return (
                              <tr key={group.id}>
                                <td>{group.name}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.groups.length === 0 && (
                    <p>You have no groups at the moment.</p>
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
    groups: state.Group.groups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userGroups: () => dispatch(userGroups())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
