import React, { useEffect } from 'react'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
// import "./Navbar.css"

const AdminNav = () => {
    useEffect(() => {
        document.title = "Admin"
    }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/admin/dashboard">
                    <Navbar.Brand>Help Result</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Records" id="basic-nav-dropdown">
                            <LinkContainer to="/admin/records">
                                <NavDropdown.Item>My Records</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/records/add" >
                                <NavDropdown.Item>Add New Records</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Users" id="basic-nav-dropdown">
                            <LinkContainer to="/admin/users">
                                <NavDropdown.Item>My Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/users/add" >
                                <NavDropdown.Item>Add New Users</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/admin/categories">
                            <Nav.Link>Categories</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin/news-records">
                            <Nav.Link>News Records</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <span style={{ color: "white" }}>
                                {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : "None"}
                            </span>

                        </Navbar.Text>
                        <Navbar.Text style={{ marginLeft: "20px", cursor: "pointer", color: "white" }} onClick={() => {
                            localStorage.removeItem('user')
                            window.location.reload()
                        }}>Logout</Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNav
