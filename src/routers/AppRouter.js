import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from '../routers/AuthenticatedRoute';
import LoginComponent from '../components/LoginComponent';
import HomeComponent from '../components/HomeComponent';
import PageNotFoundComponent from "../components/PageNotFoundComponent";
import AppliancesComponent from '../components/AppliancesComponent';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import LogoutComponent from '../components/LogoutComponent';
import ApplianceComponent from '../components/ApplianceComponent';

const AppRouter = () => (
    <div>
        <Router>
            <>
                <HeaderComponent/>
                <Switch>
                    <Route path="/" component={LoginComponent} exact/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute path="/home/:name" component={HomeComponent}/>
                    <AuthenticatedRoute path="/home" component={HomeComponent}/>
                    <AuthenticatedRoute path="/appliances/:serialNum" component={ApplianceComponent}/>
                    <AuthenticatedRoute path="/appliances" component={AppliancesComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <Route component={PageNotFoundComponent}></Route>
                </Switch>
                <FooterComponent/>
            </>
        </Router>
    </div>
)

export default AppRouter