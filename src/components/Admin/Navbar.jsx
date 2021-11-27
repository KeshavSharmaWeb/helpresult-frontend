import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

const AdminNav = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/admin/dashboard">
                    <Navbar.Brand>Help Result</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/admin/records">
                            <Nav.Link>Records</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin/categories">
                            <Nav.Link>Categories</Nav.Link>
                        </LinkContainer>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNav
