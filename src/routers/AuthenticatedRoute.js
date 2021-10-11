import React from "react";
import { Route, Redirect } from "react-router";
import AuthenticationService from "../auth/AuthenticationService";

export default class AuthenticatedRoute extends React.Component{
    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return (<Route {...this.props}/>)
        }else{
            return(<Redirect to="/login"/>)
        }
    }
}