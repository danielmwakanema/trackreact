import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from 'reactstrap';

class ToCSV extends React.Component {
  render() {
    return (
      <CSVLink data={this.props.data} filename={this.props.filename}>Export CSV</CSVLink>
    )
  }
}

export default ToCSV