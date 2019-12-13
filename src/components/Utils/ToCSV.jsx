import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from 'reactstrap';

class ToCSV extends React.Component {
  render() {
    return (
      <Button>
        <CSVLink data={this.props.data} filename={this.props.filename}>Export CSV</CSVLink>
      </Button>
    )
  }
}

export default ToCSV