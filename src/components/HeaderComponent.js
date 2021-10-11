import React from "react";
import AuthenticationService from '../auth/AuthenticationService';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";

class HeaderComponent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
            <header>
                 <nav className="navbar navbar-expand-md">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link to="/home" className="nav-link">Home</Link></li>}
                        {isUserLoggedIn && <li><Link to="/appliances" className="nav-link">Appliances</Link></li>}
                    </ul>

                    <ul  className="navbar-nav navbar-collapse justify-content-end">
                        {isUserLoggedIn && <li><Link to="/logout" className="nav-link"  onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);