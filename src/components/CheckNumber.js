import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import Axios from "axios";



export class CheckNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenumber: "",
            valid: false,
            countryCode: "",
            countryName: "",
            operatorName: "",
        };
    }

    checkPhoneNumber = () => {
        const options = {
            method: 'GET',
            url: 'https://phone-number-validation-and-verification2.p.rapidapi.com/validate',
            params: { phone: this.state.phonenumber },
            headers: {
                'X-RapidAPI-Host': 'phone-number-validation-and-verification2.p.rapidapi.com',
                'X-RapidAPI-Key': '8988800409msh25b5be8fcfdd627p182fc9jsnc17c7a1cd2b1'
            }
        };

        var self = this;
        Axios.request(options).then(function (response) {
            if(response.data.valid){
                self.setState({valid: response.data.valid});
                self.setState({countryCode: response.data.country.code});
                self.setState({countryName: response.data.country.name});
                self.setState({operatorName: response.data.type});
            } else {
                alert("Invalid Phone Number")
            }
            
        }).catch(function (error) {
            console.error(error);
        });

        
    }



    render() {

        return (

            <Form onSubmit={this.handleSubmit}>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Check Phone Number</h2><br></br>
                <FormGroup>
                    <Label><h2>Please Insert Number</h2></Label> <br></br><br></br>

                    <Input type="text" name="phone" placeholder="Phone Number" value={this.state.phonenumber} onChange={e => this.setState({ phonenumber: e.target.value })}></Input>
                    <br></br>
                    <Label>Country Code: </Label> <Label>{this.state.countryCode}</Label>
                    <br></br>
                    <Label>Country Name: </Label> <Label>{this.state.countryName}</Label>
                    <br></br>
                    <Label>Operator: </Label> <Label>{this.state.operatorName}</Label>

                    <br></br>
                </FormGroup>
                <br></br>
                <Button onClick={() => this.checkPhoneNumber()}>Check</Button> &nbsp;
            <Link to="/" className="btn btn-danger ml-2 ">Cancel</Link>
            </Form>
        )
    }
}
