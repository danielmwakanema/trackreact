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

import { getUsers } from "../../Redux/actions/userActions";

import "./Index.css";

class Index extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">User List</CardTitle>
                  <Link to={`/admin/user/add`}>+ User</Link>
                </CardHeader>
                <CardBody>
                  {this.props.users.length > 0 && (
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Is an admin?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {this.props.users.map(user => {
                            return (
                              <tr key={user.id}>
                                <td><Link to={`/admin/user/view/${user.id}`}>
                                    {user.name}
                                  </Link></td>
                                <td>{user.email}</td>
                                <td>{user.administrator ? "Yes" : "No "}</td>
                              </tr>
                            );
                          })}
                        </>
                      </tbody>
                    </Table>
                  )}
                  {this.props.users.length === 0 && (
                    <p>You have no users at the moment.</p>
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
    users: state.User.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
