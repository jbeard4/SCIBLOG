import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import SCHVIZ from '@jbeard/schviz2';
import scxml from 'scxml';
import { ShowHideSourceCodeLink } from '../../components';
import Buttons from './buttons';
import ButtonsTxt from './buttons.js?txt';
import MicrowaveDemo from './microwave-demo';
import MicrowaveDemoTxt from './microwave-demo.js?txt';
import { Cell } from '../light-switch-example';

export default class MicrowaveExample extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    scxml.documentStringToModel(null, props.microwaveScxml, (err, model) => {
      if(err) throw err;
      model.prepare((err, modelFactory) => {
        if(err) throw err;
        this.sc = new scxml.scion.Statechart(modelFactory);

        let transitionsEnabled;
        this.sc.on('onBigStepBegin',() => {
          transitionsEnabled = new Map();
        })
        this.sc.on('onBigStepEnd',() => {
          this.setState({ 
            configuration : this.sc.getConfiguration(),
            transitionsEnabled 
          });
        })
        this.sc.on('onTransition',(transitionSourceId,targetIds,transitionIndex) => {
          if(transitionsEnabled.has(transitionSourceId)){
            const set = transitionsEnabled.get(transitionSourceId);
            set.add(transitionIndex);
          }else{
            const set = new Set();
            set.add(transitionIndex);
            transitionsEnabled.set(transitionSourceId, set);
          }
        });
        this.sc.start();
      });
    });
  }

  render(){
    return <div>
      <table style={{width: '100%', height: '400px'}}>
        <tbody> 
          <tr>
            <Cell 
              showSourceCode={this.state.showSourceCode}
              sourceCode={ButtonsTxt}
              component={
                <Buttons sc={this.sc} />
              }
              caption={
                <span> Buttons </span>
              }
              />
            <Cell 
              showSourceCode={this.state.showSourceCode}
              sourceCode={this.props.microwaveScxml}
              component={
                <SCHVIZ 
                  scxmlDocumentString={this.props.microwaveScxml}
                  disableAnimation={true}
                  disableZoom={true}
                  configuration={this.state && this.state.configuration}
                  disableZoomAnimation={true}
                  transitionsEnabled={this.state && this.state.transitionsEnabled} 
                  expandAllStatesByDefault={true}
                  id="microwave"
                  />
              }
              caption={
                <span>I am a <strong>state machine</strong></span>
              }
              rowSpan="2"
              />
          </tr>
          <tr>
            <Cell 
              showSourceCode={this.state.showSourceCode}
              sourceCode={MicrowaveDemoTxt}
              component={
                <MicrowaveDemo configuration={this.state && this.state.configuration}/>
              }
              caption={
               <span> Microwave </span>
              }
              />
          </tr>
        </tbody>
      </table>
      <ShowHideSourceCodeLink self={this} />
    </div>
  }
}



