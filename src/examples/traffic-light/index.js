import React from 'react'
import SCHVIZ from '@jbeard/schviz2';
import trafficLightScxml from './traffic-light.scxml';
import TrafficLight from './traffic-light';
import TrafficLightTxt from './traffic-light.js?txt';
import { ShowHideSourceCodeLink } from '../../components';
import { SCComponent, Cell } from '../common';

export class TrafficLightExample extends SCComponent {

  constructor(props){
    super(props, trafficLightScxml);
    //wait for promise to resolve, then set up setInterval to send tick events into the state machine
    this.scPromise.then( (sc) => ( setInterval( (() => sc.gen('tick')), 1000) ))
  }

  render(){
    return <div>
      <table style={{width: '100%', height: '800px'}}>
        <tbody> 
          <tr>
            <Cell 
              showSourceCode={this.state.showSourceCode}
              sourceCode={TrafficLightTxt}
              component={<TrafficLight configuration={this.state.configuration} />}
              caption={<span>Traffic Light</span>}
              />
          </tr>
          <tr>
            <Cell 
              showSourceCode={this.state.showSourceCode}
              sourceCode={trafficLightScxml}
              component={
                <SCHVIZ 
                  scxmlDocumentString={trafficLightScxml}
                  disableAnimation={true}
                  disableZoom={true}
                  configuration={this.state && this.state.configuration}
                  disableZoomAnimation={true}
                  transitionsEnabled={this.state && this.state.transitionsEnabled} 
                  id="trafficLight"
                  expandAllStatesByDefault={true}
                  />
              }
              caption={
                <span>I am a <strong>state machine</strong></span>
              }
              rowSpan="2"
              />
          </tr>
        </tbody>
      </table>
      <ShowHideSourceCodeLink self={this} />
    </div>
  }
}






