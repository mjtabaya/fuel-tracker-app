import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Segment, Icon, Dimmer, Loader, Divider, Label, Menu, Table } from 'semantic-ui-react'

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3001/refuelling_histories")
    .then(response => response.data)
    .then((data) => {
     this.setState({ histories: data })
     console.log(this.state.histories)
    }).catch(error => {
      console.log("registration error", error)
    });
  }

  render() {
    const { error, loading, histories } = this.state;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    }

    return <Container text>
      <Header as='h2' icon textAlign='center' color='gray'>
        <Icon name='unordered list' circular />
        <Header.Content>
          Refuelling Histories
        </Header.Content>
      </Header>
      <Divider section />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date Refuelled</Table.HeaderCell>
            <Table.HeaderCell>Driver</Table.HeaderCell>
            <Table.HeaderCell>Vehicle</Table.HeaderCell>
            <Table.HeaderCell>Odometer Reading</Table.HeaderCell>
            <Table.HeaderCell>Refuel Location</Table.HeaderCell>
            <Table.HeaderCell>Liters of Fuel</Table.HeaderCell>
            <Table.HeaderCell>recorded by Employee ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {histories.discords.map((history, i) => (
              <Table.Row>
                <Table.Cell>history.date_refuelled</Table.Cell>
                <Table.Cell>history.driver</Table.Cell>
                <Table.Cell>history.vehicle</Table.Cell>
                <Table.Cell>history.odometer_reading</Table.Cell>
                <Table.Cell>history.refuel_location</Table.Cell>
                <Table.Cell>history.liters_of_fuel</Table.Cell>
                <Table.Cell>history.user_id</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Container>
  }
}
