import React, { Component, createContext } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// create context
export const CourseContext = createContext(); 


// Context.js will create the state that need to be shared between components, via a required value props. It will use the data passed from Data.js (all api calls);

export class CourseContextProvider extends Component {

    constructor() {
        super();
        this.data = new Data();
    
    }

    state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };
    
    render() {
      const { authenticatedUser } = this.state;
      console.log('authenticated user from context:'+ JSON.stringify(authenticatedUser));
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            }
        
        };
        return (
            <CourseContext.Provider value = { value }>
                {this.props.children}
            </CourseContext.Provider>
        )

    } // END render method

    /**
    * signIn will be called in signIn component
    * signIn uses credentials to call the getUser() method in Data.js.
    * @param {username, password} 
    * @return {name, username}- example: Henry, nicoya00
    */
    signIn = async (username, password) => {
      console.log('from context sign in call');
      const user = await this.data.getUser(username, password);
      if (user !== null) {
        this.setState(()=>{
          return {
            authenticatedUser: user,
          };
        });

        // set  cookie expiration 1 day
        Cookies.set(
            'authenticatedUser',
             JSON.stringify(user), 
             { expires: 1}
             );

        };

      return user;

    }

    // Signs out the user and set delete cookies
    signOut = () => {
      console.log('sign out from context');
        this.setState(()=> {
          return{
            authenticatedUser: null,
          };
        });
        Cookies.remove('authenticatedUser');
      }

} //End class Provider

export const Consumer = CourseContext.Consumer;

export default CourseContextProvider;
  


