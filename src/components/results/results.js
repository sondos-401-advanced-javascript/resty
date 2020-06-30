import React from 'react';
import ReactView from 'react-json-view'; 
import './results.scss';

const results = (props) => {
    return (
      <>
        <section className="results">
        <div className="method">
        <ReactView name='Headers' src={props.Header}/>
      </div>
        <div className="url">
        <ReactView name='Response' src={props.Response}/>
      </div>
      </section>
      </>
    )
}

export default results;