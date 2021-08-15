import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CourseContext } from '../Context';

const UserSignIn = () => {

    // context and histroy hooks initialized 
    const context = useContext(CourseContext);
    const history = useHistory();

    // credentials variables
    const [ username, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const [ errors, setErrors ] = useState([]);
    
    
    function changeInputValue(event) {
        const inputValue = event.target.value;

        switch (event.target.name) {
            case "username":
              setUserName(preUser => preUser = inputValue);
              break;
            case "password":
              setPassword( prePass => prePass = inputValue);
              break;
            default:
              return;
          }
      }       
      
      const handleSubmit = (event) => {
          const { from } = history.location.state || { from: { pathname: '/' } };
          context.actions.signIn(username, password)
            .then( user => {
              if( user === null) {
                setErrors(['Sign-in was unsuccessful']);
              } else {
                // const { from } = history.location.state || { from: history.goBack()};
                history.push(from);
              }
            })
            .catch(()=> history.push('/error'));

      }

      // cancel
      const handleCancel = (event) => {
        event.preventDefault();
        history.push('/');
      }

    return (
        <div className='form--centered'>
            <h2>Sign In</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='emailAdrdress'>Email Address</label>
                <input id='emailAddress' name='username' type='email' onChange={ changeInputValue } value={ username }></input>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password' onChange={ changeInputValue } value={ password }></input>
                <button className='button' type='submit'>Sign In</button>
                <button className='button button-secondary' onClick={ handleCancel } >Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

        </div>
    )
}

// Handle validation erros
export function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }
  


export default UserSignIn;