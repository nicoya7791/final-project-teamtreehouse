import React, { Component, createContext } from 'react';
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
        authenticatedUser: null
    }
    
    render() {
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                
            }
        
        };
        return (
            <CourseContext.Provider value = { value }>
                {this.props.children}
            </CourseContext.Provider>
        )

    } // end render method
} //End class provider

export const Consumer = CourseContext.Consumer;

// export function withContext(Component) {
    // return function ContextComponent(props) {
    //   return (
        // <Context.Consumer>
         // {/* {/* {context => <Component {...props} context={context} />} */} */}
       // {/* </Context.Consumer> */}
    //   );
    // }
//   }
//   
  export default CourseContextProvider;
  


