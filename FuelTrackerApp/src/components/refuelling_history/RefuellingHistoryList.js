import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios';
import { Table } from 'semantic-ui-react'

export default class RefuellingHistoryList extends Component {
  constructor() {
    super();
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
    }).catch(error => {
    });
  }

  renderTable() {
    return
  }

  render() {
    const { histories, column, data, direction } = this.state

    if(!histories) {
      return (
        <div className='histories'>
          <h3>Refuelling Histories</h3>
          Loading. . .
        </div>
      );
    } else {
      return (
        <div className='histories'>
          <h3>Refuelling Histories (click on headers to sort)</h3>
            <Table sortable celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === 'date_refuelled' ? direction : null}
                    onClick={this.handleSort('date_refuelled')}
                  >Date Refuelled</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'driver' ? direction : null}
                    onClick={this.handleSort('driver')}
                  >Driver</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'vehicle' ? direction : null}
                    onClick={this.handleSort('vehicle')}
                  >Vehicle</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'odometer_reading' ? direction : null}
                    onClick={this.handleSort('odometer_reading')}
                  >Odometer Reading</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'refuel_location' ? direction : null}
                    onClick={this.handleSort('refuel_location')}
                  >Refuel Location</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'liters_of_fuel' ? direction : null}
                    onClick={this.handleSort('liters_of_fuel')}
                  >Liters of Fuel</Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'user_id' ? direction : null}
                    onClick={this.handleSort('user_id')}
                  >Logged by Employee</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {!!histories.length && histories.map((history, i) => (
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
        </div>
      );
    }
  }
}
