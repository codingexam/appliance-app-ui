import axios from 'axios';
import config from '../config'

class AuthenticationService {
    executeBasicAuthenticationService(username, password){
        return axios.get(`${config.API_AUTH_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username,password)
            }
        })
    }

    executeJwtAuthenticationService(username, password){
        return axios.post(`${config.API_AUTH_URL}/authenticate`, {
            username,
            password 
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    createJwtToken(token){
        return 'Bearer ' + token
    }

    registerSuccesfulLogin(username, password){
        console.log("login successful")
        sessionStorage.setItem('authenticatedUser', username)
        this.setUpAxiosInterceptor(this.createBasicAuthToken(username,password));
    }

    registerSuccesfulLoginForJwt(username, token){
        console.log("login successful")
        sessionStorage.setItem('authenticatedUser', username)
        this.setUpAxiosInterceptor(this.createJwtToken(token));
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if( user === null) return false;
        return true;
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem('authenticatedUser')
        if( user === null) return '';
        return user;
    }

    setUpAxiosInterceptor(header){
        axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()){
                config.headers.authorization = header
            }
            return config
        })
    }
}


export default new AuthenticationService()