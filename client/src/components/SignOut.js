import React from 'react-dom';
import { Redirect } from 'react-router-dom';


const SignOut = () => {
// call in singout function from context
// set authenticated user to nunll
// remove cookies

    return (
        <Redirect to="/" />

    )
}

export default SignOut;