import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Segment, Icon, Dimmer, Loader, Divider, Label, Menu, Table } from 'semantic-ui-react'

export default class RefuellingHistoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histories: {}
    };
    this.renderTable = this.renderTable.bind(this);
    this.loadList = this.loadList.bind(this);
  }

  componentDidMount() {
    this.loadList();
  }

  loadList() {
    axios.get("http://localhost:3001/refuelling_histories")
    .then(response => response.data)
    .then((data) => {
     this.setState({ histories: data })
     console.log("loading list")
    }).catch(error => {
      console.log("registration error", error)
    });
  }

  renderTable() {
    return
  }

  render() {
    if(!this.state.histories) {
      console.log(this.state.histories)
      return (
        <div className='histories'>
          <h3>Refuelling Histories</h3>
          Loading. . .
        </div>
      );
    } else {
      console.log(this.state.histories)
      return (
        <div className='histories'>
          <h3>Refuelling Histories</h3>
          <Container text>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Refuelled</Table.HeaderCell>
                  <Table.HeaderCell>Driver</Table.HeaderCell>
                  <Table.HeaderCell>Vehicle</Table.HeaderCell>
                  <Table.HeaderCell>Odometer Reading</Table.HeaderCell>
                  <Table.HeaderCell>Refuel Location</Table.HeaderCell>
                  <Table.HeaderCell>Liters of Fuel</Table.HeaderCell>
                  <Table.HeaderCell>Recorded by Employee ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {!!this.state.histories.length && this.state.histories.map((history, i) => (
                    <Table.Row>
                      <Table.Cell>{history.date_refuelled}</Table.Cell>
                      <Table.Cell>{history.driver}</Table.Cell>
                      <Table.Cell>{history.vehicle}</Table.Cell>
                      <Table.Cell>{history.odometer_reading}</Table.Cell>
                      <Table.Cell>{history.refuel_location}</Table.Cell>
                      <Table.Cell>{history.liters_of_fuel}</Table.Cell>
                      <Table.Cell>{history.user_id}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Container>
        </div>
      );
    }
  }
}
