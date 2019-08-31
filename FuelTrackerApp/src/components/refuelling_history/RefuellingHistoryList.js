import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios';
import { Container, Header, Segment, Icon, Dimmer, Loader, Divider, Label, Menu, Table } from 'semantic-ui-react'

export default class RefuellingHistoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histories: {},
      column: null,
      direction: null,
    };
    this.renderTable = this.renderTable.bind(this);
    this.loadList = this.loadList.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort = (clickedColumn) => () => {
    const { column, histories, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        histories: _.sortBy(histories, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      histories: histories.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
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
    const { column, data, direction } = this.state

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
            <Table sortable celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'date_refuelled' ? direction : null}
                    onClick={this.handleSort('date_refuelled')}
                  >Date Refuelled</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'date_refuelled' ? direction : null}
                    onClick={this.handleSort('date_refuelled')}
                  >Driver</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'vehicle' ? direction : null}
                    onClick={this.handleSort('vehicle')}
                  >Vehicle</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'odometer_reading' ? direction : null}
                    onClick={this.handleSort('odometer_reading')}
                  >Odometer Reading</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'refuel_location' ? direction : null}
                    onClick={this.handleSort('refuel_location')}
                  >Refuel Location</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'liters_of_fuel' ? direction : null}
                    onClick={this.handleSort('liters_of_fuel')}
                  >Liters of Fuel</Table.HeaderCell>
                  <Table.HeaderCell fullWidth
                    sorted={column === 'user_id' ? direction : null}
                    onClick={this.handleSort('user_id')}
                  >Recorded by Employee ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {!!this.state.histories.length && this.state.histories.map((history, i) => (
                    <Table.Row key={i}>
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
