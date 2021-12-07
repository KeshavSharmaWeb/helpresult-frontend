import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../config'

const Login = () => {
    const handleSubmitForm = (e) => {
        e.preventDefault()
        // get form data
        const form = e.target
        const data = new FormData(form)

        const payload = {
            username: data.get('username'),
            password: data.get('password')
        }
        // send data to server
        axios.post(`${url}/login`, payload)
            .then(res => {
                // if response is ok, redirect to home
                if (res.data.success) {
                // set user in local storage
                    localStorage.removeItem('user')
                    localStorage.setItem('user', JSON.stringify({ email: res.data.user.email, name: res.data.user.name }))
                    localStorage.setItem('userId', res.data.user._id)
                    window.location.href = '/admin/dashboard'
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
            })
    }

    return (
        // eslint-disable-next-line
        <Container style={{ width: "50%", margin: 0, position: "absolute", top: "30%", transform: "translateY(-50%)", left: "50%", transform: "translateX(-50%)" }}>
            <h2 style={{ textAlign: "center" }}>Sign In</h2>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" name="username" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Login
