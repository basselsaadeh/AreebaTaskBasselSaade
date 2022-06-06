import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import {
    ListGroup,
    Button,
    Table
} from 'reactstrap';
import Axios from "axios";

export class UserComponent extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { users: []}
    }

    componentDidMount() {
        this._isMounted = true;
        this.refreshList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate() {
        this.refreshList();
    }

    async refreshList() {

        await Axios.get("http://localhost:8888/users", {}).then((response) => {
        this.setState({ users: response.data });})

}

    async deleteUser(userId) {
        if (window.confirm('Are you sure ?')) {
              const res = await Axios.delete(`http://localhost:8888/deleteUser/${userId}`)
        }
    }

    render() {

        const { users } = this.state;

        return (
            <ListGroup className="mt-4">
                {users.length > 0 ? (
                    <>
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>EDIT</th>
                                        <th>DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 && users.map((user) => (

                                        <tr key={user._id}>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phonenumber}</td>
                                            <td className="ml-auto">
                                                 <Link value={user._id} to={{
                                                     pathname:`edit/${user._id}`,
                                                     state: user
                                                     }}>Edit</Link>
                                            </td>
                                            <td><Button onClick={() => this.deleteUser(user._id)} color="danger">Delete</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                ) : (
                        <h1 className="text-center">No Users</h1>
                    )}

            </ListGroup>
        );
    }
}



const element = <UserComponent></UserComponent>
ReactDOM.render(element, document.getElementById('root'));