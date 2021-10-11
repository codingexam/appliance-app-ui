import axios from 'axios';

class AuthenticationService {
    executeBasicAuthenticationService(username, password){
        return axios.get(`http://localhost:8080/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username,password)
            }
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    registerSuccesfulLogin(username, password){
        console.log("login successful")
        sessionStorage.setItem('authenticatedUser', username)
        this.setUpAxiosInterceptor(this.createBasicAuthToken(username,password));
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

    setUpAxiosInterceptor(basicAuthHeader){
        axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()){
                config.headers.authorization = basicAuthHeader
            }
            return config
        })
    }
}


export default new AuthenticationService()