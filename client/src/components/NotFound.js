import React from 'react';

// Displays friendly message if the route is not found.
const NotFound = () => {

  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <a className="button button-secondary" href="/">Return to List</a>
    </div>

  )
}

export default NotFound;