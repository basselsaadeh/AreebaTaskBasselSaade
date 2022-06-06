import React,{Component}from 'react';
import {Link} from 'react-router-dom'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
}from 'reactstrap';
import Axios from "axios";



export class AddUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            phonenumber: "",
            address: "",
            labelUn: "",
            valid: false
          };
    }

    checkPhoneNumber = () => {
        const options = {
            method: 'GET',
            url: 'https://phone-number-validation-and-verification2.p.rapidapi.com/validate',
            params: {phone: this.state.phonenumber},
            headers: {
              'X-RapidAPI-Host': 'phone-number-validation-and-verification2.p.rapidapi.com',
              'X-RapidAPI-Key': '8988800409msh25b5be8fcfdd627p182fc9jsnc17c7a1cd2b1'
            }
          };
          
          const fn = this.state.firstname
          const ln = this.state.lastname
          const pn = this.state.phonenumber
          const ad = this.state.address
          
          var self = this
          Axios.request(options).then(function (response) {
              if(response.data.valid){
                Axios.post("http://localhost:8888/addUser", {firstname: fn, lastname: ln, phonenumber: pn, address: ad})
                   .then((response) => {
                       console.log(response)
                   }).catch(error => console.log(error.response.data));
                   alert("User Added")
                   self.setState({ firstname: '', lastname: '', phonenumber: '', address: '', labelUn: ''})
              } else {
                  console.log("Invalid");
                  self.setState({labelUn: " -------    Invalid Phone Number Please Change it"});
              }
          }).catch(function (error) {
              console.error(error);
          });
          
          
    }


    

render(){

    return (
        
        <Form onSubmit={this.handleSubmit}>
            <h2 style={{fontWeight:"bold", textAlign:"center"}}>New User</h2><br></br>
            <FormGroup>
            <Label><h2>Please fill the right information bellow:</h2></Label> <br></br><br></br>
                <Label>First Name</Label>
                <Input type="text" name="firstName"  placeholder="First Name" value={this.state.firstname} onChange={e => this.setState({firstname : e.target.value})}></Input>
                <br></br>
                <Label>Last Name</Label>
                <Input type="text" name="LastName" placeholder="Last Name" value={this.state.lastname} onChange={e => this.setState({lastname : e.target.value})}></Input>
                <br></br>
                <Label>Phone</Label> <Label>{this.state.labelUn}</Label>
                <Input type="text" name="phone"  placeholder="Phone Number" value={this.state.phonenumber} onChange={e => this.setState({phonenumber : e.target.value})}></Input>
                <br></br>
                <Label>Address</Label>
                <Input type="text" name="address" placeholder="Address" value={this.state.address} onChange={e => this.setState({address : e.target.value})}></Input>
                <br></br>
            </FormGroup>
            <br></br>
            <Button onClick={() => this.checkPhoneNumber()}>Add User</Button> &nbsp;
            <Link to="/" className="btn btn-danger ml-2 ">Cancel</Link>
        </Form>
    )
}
}
