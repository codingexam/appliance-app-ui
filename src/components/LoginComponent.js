import React from 'react';
import AuthenticationService from '../auth/AuthenticationService';

export default class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleInputChange(e){
        const targetName = e.target.name
        this.setState(() => ({ [targetName]: e.target.value}))
    }

    loginClicked(){
       AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        // .executeJwtAuthenticationService('admin', 'admin123')
            .then((response) => {
                console.log(response)
                AuthenticationService.registerSuccesfulLoginForJwt(this.state.username, response.data)
                this.props.history.push(`/home/${this.state.username}`) 
            })
            .catch((err) => {
                console.log(err)
                this.setState({ showSuccessMessage: false})
                this.setState({ hasLoginFailed: true})
            })
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleInputChange(e)}/>
                    <br/>
                    <br/>
                    Password: <input type="password" name="password" value={this.state.password}  onChange={(e) => this.handleInputChange(e)}/>
                    <br/>
                    <br/>
                    <button name="submit" className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}