import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

// renders component with properties if the user is authenticated. I not authenticated user then redirects to signIn page.
const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};

export default PrivateRoutes;