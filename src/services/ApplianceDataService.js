import axios from 'axios';
import config from '../config'

class ApplianceService {
    retrieveAllAppliances(user){
        return axios.get(`${config.API_URL}/api/appliances`)
    }

    deleteAppliance(name, serialNum){
        return axios.delete(`${config.API_URL}/api/appliance?serialNum=${serialNum}`)
    }

    retrieveAppliance(name, serialNum){
        return axios.get(`${config.API_URL}/api/appliance?serialNumber=${serialNum}`)
    }

    updateAppliance(name, serialNum, appliance){
        console.log("--update appliance", appliance)
        return axios.put(`${config.API_URL}/api/appliance`, appliance)
    }

    createAppliance(name, appliance){
        return axios.post(`${config.API_URL}/api/appliance`, appliance)
    }
}

export default new ApplianceService()