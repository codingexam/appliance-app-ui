import axios from 'axios';

class ApplianceService {
    retrieveAllAppliances(user){
        return axios.get(`http://localhost:8080/users/${user}/appliances`)
    }

    deleteAppliance(name, serialNum){
        return axios.delete(`http://localhost:8080/users/${name}/appliances/${serialNum}`)
    }

    retrieveAppliance(name, serialNum){
        return axios.get(`http://localhost:8080/users/${name}/appliances/${serialNum}`)
    }

    updateAppliance(name, serialNum, appliance){
        return axios.put(`http://localhost:8080/users/${name}/appliances/${serialNum}`, appliance)
    }

    createAppliance(name, appliance){
        return axios.post(`http://localhost:8080/users/${name}/appliances`, appliance)
    }
}

export default new ApplianceService()