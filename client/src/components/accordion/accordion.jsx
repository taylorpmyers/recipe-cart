import React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import './accordion.css'
const Accordion = props => {

  return (
    <PanelGroup
      accordion
      id="accordion"
      defaultActiveKey={2}
      onSelect={props.onSelect}
      children={props.body.map((panel, index) => (
          <Panel eventKey={index}>
            <Panel.Heading>
              <Panel.Title toggle>{panel.title}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>{panel.body}</Panel.Body>
          </Panel>
        ))}>
    </PanelGroup>
  );
}

export default Accordion;