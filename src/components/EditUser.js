import React, {Component, useSate} from 'react';
import {Link} from 'react-router-dom'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
}from 'reactstrap';
import Axios from "axios";

export class EditUser extends Component {

   

    constructor(props){
        super(props);

        this.state = { userId: "",
            firstname: props.firstname,
            lastname: props.lastname,
            phonenumber: props.phonenumber,
            address: props.address,
        }
    }

    async updateUser(userId, firstname, lastname, phonenumber, address){
        const data = {
            "_id": userId,
            "firstname": firstname,
            "lastname": lastname,
            "phonenumber": phonenumber,
            "address": address,
        }
        Axios.post(`http://localhost:8888/updateUser/${userId}`,data)
    }

render(){

    const { state } = this.props.location;

    return (
        <Form onSubmit={this.handleSubmit}>
        <h2 style={{fontWeight:"bold", textAlign:"center"}}>Edit User</h2><br></br>
        <FormGroup>
            <Label><h2>Please fill the right information bellow:</h2></Label> <br></br><br></br>
            <Input type="hidden" defaultValue={state._id}></Input>
                <Label>First Name</Label>
                <Input type="text" className="firstname" defaultValue={state.firstname} onChange={e => this.setState({firstname : e.target.value})}></Input>
                <br></br>
                <Label>Last Name</Label>
                <Input type="text" className="lastname" defaultValue={state.lastname} onChange={e => this.setState({lastname : e.target.value})}></Input>
                <br></br>
                <Label>Phone</Label>
                <Input type="text" className="phonenumber" defaultValue={state.phonenumber} onChange={e => this.setState({phonenumber : e.target.value})}></Input>
                <br></br>
                <Label>Address</Label>
                <Input type="text" className="address" defaultValue={state.address} onChange={e => this.setState({address : e.target.value})}></Input>
                <br></br>
            </FormGroup>
        <br></br>
        <Button onClick={() => this.updateUser(state._id, this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.address)}>Edit User</Button> &nbsp;
        <Link to="/" className="btn btn-danger ml-2 ">Cancel</Link>
    </Form>
        
    )
}
}
