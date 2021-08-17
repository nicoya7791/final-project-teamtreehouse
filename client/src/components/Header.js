import React, { useContext } from  'react';
import { CourseContext } from '../Context';

// Renders the header of the page
const Header = () => {
    const context = useContext(CourseContext);
    const { authenticatedUser} = context;
    console.log('from header user auth: '+authenticatedUser)
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href='/' >Courses</a></h1>
                <nav>
                { authenticatedUser ? (
                    <ul className="header--signedin">
                        <li>Welcome, {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</li>
                        <li><a href="/signout">Sign Out</a>
                        </li>
                    </ul>)
                    :
                    (
                        <ul className="header--signedout">
                        <li><a href='/signup' >Sign Up</a></li>
                        <li><a href='/signin' >Sign In</a></li>
                    </ul>

                    )}
                </nav>
            </div>
        </header>

    )
}


export default Header;