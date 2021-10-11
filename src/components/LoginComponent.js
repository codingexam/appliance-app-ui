import React from 'react';
import AuthenticationService from '../auth/AuthenticationService';

export default class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "test",
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
        if(this.state.username === 'test' && this.state.password === 'test'){
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/home/${this.state.username}`)
            // this.setState(() => ({ showSuccessMessage: true, 
            //     hasLoginFailed: false }))
        }else{
            this.setState(() => ({ showSuccessMessage: false,
                hasLoginFailed: true }))
        }
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