import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CourseContext } from '../Context';


const UserSignOut = () => {
    const context = useContext(CourseContext);
    const signOut = context.actions.signOut;
    console.log('You been signed out');
    useEffect( () => {
        signOut();
    },[ signOut] );

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut;