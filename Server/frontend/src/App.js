import React from 'react';
import Navigation from './Component/navigation'
import styled from 'styled-components'
import Socket from './Component/socketclient'

const Div = styled.span`
  text-align: center;
`
export default class Example extends React.Component {
  render() {
    return (
      <Div>
        <Navigation />
      </Div>
    );
  }
}
