import React from "react";
import moment from 'moment';
import ApplianceService from "../services/ApplianceDataService";
import AuthenticationService from "../auth/AuthenticationService";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import '../styles.css';

export default class ApplianceComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            serialNum: this.props.match.params.serialNum,
            brand: "",
            model: "",
            applianceStatus: [],
            dateBought: moment(new Date()).format('YYYY-MM-DD')
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values){
        const username = AuthenticationService.getLoggedInUsername();
        const appliance = {
            serialNum: this.state.serialNum,
            brand: values.brand,
            model: values.model,
            applianceStatus: values.applianceStatus,
            dateBought: values.dateBought
        }
        if(this.state.serialNum === -1){
            ApplianceService.createAppliance(username, appliance)
            .then(() => {
                this.props.history.push('/appliances')
            })
        } else{
            ApplianceService.updateAppliance(username, this.state.serialNum, appliance)
            .then(() => {
                this.props.history.push('/appliances')
            })
        }
    }

    validate(values){
        let errors = {}
        if (!values.brand){
            errors.brand = "Enter a brand"
        } else if (values.brand.length < 5){
            errors.brand = "Enter atleast 5 characters for brand"
        }

        if (!values.model){
            errors.model = "Enter a model"
        } else if (values.model.length < 5){
            errors.model = "Enter atleast 5 characters for model"
        }

        if(!moment(values.dateBought).isValid()){
            errors.dateBought = "Enter a valid date"
        }
        return errors
    }

    componentDidMount(){
        if(this.state.serialNum === -1){
            return
        }
        const user = AuthenticationService.getLoggedInUsername();
        ApplianceService.retrieveAppliance(user, this.state.serialNum)
        .then((response) => this.setState(() => ({
            brand: response.data.brand,
            model: response.data.model,
            applianceStatus: response.data.status,
            dateBought: moment(response.data.dateBought).format('YYYY-MM-DD')
        })))
    }

    render(){
        let { model, brand, applianceStatus, dateBought} = this.state;
        
        return(
            <div>
               <h2>Add/Edit Appliance</h2>
               <div className="container"> 
               <Formik  
                        initialValues = {{model, brand, applianceStatus, dateBought}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        // validateOnChange={false}
                        // validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage component="div" name="brand" className="alert alert-danger"/>
                                    <ErrorMessage component="div" name="model" className="alert alert-danger"/>
                                    <ErrorMessage component="div" name="status" className="alert alert-danger"/>
                                    <ErrorMessage component="div" name="dateBought" className="alert alert-danger"/>
                                    
                                    <fieldset className="form-group">
                                        <label>Brand</label>
                                        <Field className="form-control" type="text" name="brand"></Field>
                                    </fieldset>
                                    <br/>
                                    <fieldset className="form-group">
                                        <label>Model</label>
                                        <Field className="form-control" type="text" name="model"></Field>
                                    </fieldset>
                                    <br/>
                                    <fieldset className="form-group">
                                        <label>Status</label>
                                        <Field className="form-control" as="select" name="applianceStatus">
                                            {this.state.applianceStatus && this.state.applianceStatus.length > 0
                                                && this.state.applianceStatus.map((status) => (
                                                    <option key={status.id} value={status.description}></option>
                                                ))
                                                }
                                        </Field>
                                    </fieldset>
                                    <br/>
                                    <fieldset className="form-group">
                                        <label>Purchase Date</label>
                                        <Field className="form-control" type="date" name="dateBought"></Field>
                                    </fieldset>
                                    <br/>
                                    <button className="btn btn-primary btn-lg"  >Save</button>
                                </Form>
                            )
                        }
                    </Formik>
               </div>
              
            </div>
        )
    }
}