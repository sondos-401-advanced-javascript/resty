import React from 'react';
import ReactView from 'react-json-view'; 
import './results.scss';
import { IfRenderer, Then, Else } from '../if/if';

const results = (props) => {
    return (
      <>
      <IfRenderer condition={!props.loading} >
        <Then>
        <section>
          <span>"count": {props.count}</span>
        <div className="method">
        <ReactView name='Headers' src={props.Header}/>
      </div>
        <div className="url">
        <ReactView name='Response' src={props.Response}/>
      </div>
      </section>
      </Then>
      <Else>
      <div className={`loading-${props.loading}`}>
      
      </div>
      </Else>
      </IfRenderer>
      
      
       
      </>
    )
}

export default results;