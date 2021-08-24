import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CourseContext } from '../Context';
import ValidationErrors from './ValidationErrors';

const UserSignUP = () => {
    // context variable
    const context = useContext(CourseContext);

    const history = useHistory();

    // State variables to create new user.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // Update state variables bese on user input.
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
          case 'firstName':
            setFirstName(value);
            break;
          case 'lastName':
              setLastName(value);
              break;  
          case 'emailAddress':
            setEmailAddress(value);
            break;
          case "password":
            setPassword(value);
            break;
          case 'confirmPassword':
             setConfirmPassword(value);
              break;  
          default:
            return;
        }
      }

    // submits new user paylaod if password and confirm password are a match.
    const handleSubmit = (event) => {
      event.preventDefault();
            // Create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        }   

        if( password !== confirmPassword) {
          setErrors(['Passwords your entered do not match'])
        } else {
          context.data.createUser(user)
          .then( errors => {
            if (errors.length) {
              setErrors(errors)
            } else {
              context.actions.signIn(emailAddress, password)
                .then(() => {
                  console.log(user);
                  history.push('/');    
                });
            }
          })
          .catch((err) => {
            console.log(err);
           context.history.push('/error');
          });
  
        }
    }

    const handleCancel = () => {
        history.push('/');
    }

    return (
        <div className='form--centered'>
            <h2>Sign Up</h2>
            <ValidationErrors errors={errors} />
            <form onSubmit={ handleSubmit }>
                <label htmlFor='firstName'>First Name</label>
                <input
                 id='firstName' 
                 name='firstName' 
                 type='text' 
                 value={ firstName }
                 onChange={ change }
                 ></input>
                <label htmlFor='lastName'>Last Name</label>
                <input 
                id='lastName' 
                name='lastName' 
                type='text' 
                value={ lastName }
                onChange={ change }
                ></input>
                <label htmlFor='emailAddress'>Email Address</label>
                <input 
                id='emailAddress' 
                name='emailAddress' 
                type='email' 
                value={ emailAddress }
                onChange={ change }
                ></input>
                <label htmlFor='password'>Password</label>
                <input 
                id='password' 
                name='password' 
                type='password' 
                value={ password }
                onChange={ change }
                ></input>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                id='confirmPassword' 
                name='confirmPassword' 
                type="password" 
                value={ confirmPassword }
                onChange={ change }
                ></input>
                <button className='button' type='submit'>Sign Up</button><button className='button button-secondary' onClick={ handleCancel }>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
        </div>

    )
}



export default UserSignUP;