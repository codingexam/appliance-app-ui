import React from "react";
import ApplianceDataService from "../services/ApplianceDataService";
import AuthenticationService from "../auth/AuthenticationService";
import moment from 'moment';

export default class AppliancesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            appliances: [
                {serialNum: 1, brand: "LG", model: "TV",status: "In use", dateBought: moment(new Date()).format('YYYY-MM-DD')},
                {serialNum: 2, brand: "APPLE", model: "Computer", status: "Not in use", dateBought: moment(new Date()).format('YYYY-MM-DD')},
                {serialNum: 3, brand: "Samsung", model: "Speaker", status: "", dateBought: moment(new Date()).format('YYYY-MM-DD')}
            ],
            message: ""
        };
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.addApplianceClicked = this.addApplianceClicked.bind(this);
        this.updateApplianceClicked = this.updateApplianceClicked.bind(this);
        this.deleteApplianceClicked = this.deleteApplianceClicked.bind(this);
        this.refreshAppliances = this.refreshAppliances.bind(this);
    }

    componentDidMount(){
        const username = AuthenticationService.getLoggedInUsername()
        ApplianceDataService.retrieveAllAppliances(username)
        .then((res) => this.handleSuccessfulResponse(res))
    }

    handleSuccessfulResponse(response){
        this.setState(() => ({
            appliances: response.data
        }))
    }

    addApplianceClicked(){
        this.props.history.push(`/appliances/-1`)
    }

    updateApplianceClicked(serialNum){
        console.log("update serial num ", serialNum)
        this.props.history.push(`/appliances/${serialNum}`)
    }

    deleteApplianceClicked(serialNum){
        const username = AuthenticationService.getLoggedInUsername()
        ApplianceDataService.deleteAppliance(username, serialNum)
            .then((response) => {
                this.setState(() => ({message: `Delete of appliance ${serialNum} is successful`}))
                this.refreshAppliances();
            })
    }

    refreshAppliances(){
        const username = AuthenticationService.getLoggedInUsername()
        ApplianceDataService.retrieveAllAppliances(username)
        .then((res) => this.handleSuccessfulResponse(res))
    }

    render(){
        return(
            <div>
                <h2>List of Appliances</h2>
                {this.state.message != "" ? <div className="alert alert-success">{this.state.message}</div> : ""}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Status</th>
                                <th>Purchase Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.appliances && this.state.appliances.length > 0 && 
                            this.state.appliances.map((appliance) => (
                                <tr key={appliance.serialNum}>
                                    <td>{appliance.brand}</td>
                                    <td>{appliance.model}</td>
                                    <td>{appliance.status}</td>
                                    <td>{moment(appliance.dateBought).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-primary" onClick={() => this.updateApplianceClicked(appliance.serialNum)}>Update</button></td>
                                    <td><button className="btn btn-primary" onClick={() => this.deleteApplianceClicked(appliance.serialNum)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button  className="btn btn-primary"  onClick={this.addApplianceClicked}>Add Appliance</button>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}
