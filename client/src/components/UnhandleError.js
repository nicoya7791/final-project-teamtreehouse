import React from 'react';

// Displays friendly message for unhandle erros.
const UnhandleError = () => {

  return (
    <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
        <a className="button button-secondary" href="/">Return to List</a>
    </div>


  )
}

export default UnhandleError;