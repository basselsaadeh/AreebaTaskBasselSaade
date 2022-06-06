import React from 'react';
import{Link} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

export const Heading = () => {
    return (
        <Navbar color="dark" dark>
            <Container>
                <NavbarBrand color="gold" href="/">Areeba Task</NavbarBrand>
                <Nav>
                <NavItem>
                        <Link className="btn btn-primary" to="/checkNumber">Check Number</Link>
                    </NavItem>
                    space
                    <NavItem>
                        <Link className="btn btn-primary" to="/add">Add User</Link>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    )
}
