import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CourseContext } from '../Context';

// Signs out user.
const UserSignOut = () => {
    const context = useContext(CourseContext);
    const signOut = context.actions.signOut;
    useEffect( () => {
        signOut();
    },[ signOut] );

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut;