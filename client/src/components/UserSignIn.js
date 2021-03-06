import React, { useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CourseContext } from '../Context';
import ValidationErrors from './ValidationErrors';


const UserSignIn = (props) => {
    // context and histroy hooks initialized 
    const context = useContext(CourseContext);
    const history = useHistory();

    // credentials variables
    const [ username, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const [ errors, setErrors ] = useState([]);
    
    // update credential varibles base on user input
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
      
      // Signs in the user. 
      const handleSubmit = (event) => {
        event.preventDefault();
          const { from } = props.location.state || { from: { pathname: '/' } };
          context.actions.signIn(username, password)
            .then( user => {
              if( user === null) {
                setErrors(['Sign-in was unsuccessful']);
              } else {
                history.push(from);
              }
            })
            .catch(()=> history.push('/error'));

      }

      // cancel. redirect to home page.
      const handleCancel = (event) => {
        event.preventDefault();
        history.push('/');
      }

    return (
        <div className='form--centered'>
            <h2>Sign In</h2>
            <ValidationErrors errors={errors} />
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



export default UserSignIn;