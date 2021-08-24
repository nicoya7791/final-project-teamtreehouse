import React from "react";

// Displays frindly message is user is not authorize certain task( like, delete someone else course ).
const Forbidden = () => {

    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
            <a className="button button-secondary" href="/">Return to List</a>
        </div>

    )
}

export default Forbidden;