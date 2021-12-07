import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Box from '@material-ui/core/Box'
import { url } from '../../config'
import parse from 'html-react-parser'
import { userExists } from '../../helperFns'

const AddRecord = () => {
    const [categories, setCategories] = useState([])
    const [tableHTML, setTableHTML] = useState('')

    useEffect(() => {
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
            })
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            userId: localStorage.getItem('userId'),
            categoryId: formData.get('category'),
            shortInfo: formData.get('shortInfo'),
            more_data_html: formData.get('more_data_html'),
            last_date: formData.get('last_date'),
            post_display_name: formData.get('record_display_name'),
        }
        axios.post(url + "/add-record", data).then(res => {
            if (res.data.status === 401) {
                alert("You are not authorized to add record")
            }
            else if (res.status === 200) {
                alert("Record added successfully")
                window.location.pathname = '/admin/records'
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    return (
        <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
            <h3 style={{ textAlign: "center" }}>Add new Record</h3>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Record Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter record name"  onChange={(e) => document.getElementById("record_display_name").value = e.target.value} required />
                    <Form.Label>Record display name</Form.Label>
                    <Form.Control type="text" name="record_display_name" placeholder="Enter record display name" id="record_display_name" required />
                    <Form.Label>Short Information</Form.Label>
                    <Form.Control type="text" name="shortInfo" as="textarea" placeholder="Enter short information" required />
                    <Form.Label>Last Date to apply</Form.Label>
                    <Form.Control type="date" name="last_date" placeholder="Pick date" required />
                    <Form.Label>Table HTML</Form.Label>
                    <Form.Control type="text" name="more_data_html" as="textarea" placeholder="Enter table html" onChange={(e) => setTableHTML(e.target.value)} required />
                    <Form.Label>Category</Form.Label> <br />
                    <Form.Control as="select" name="category" id="category" required>
                        <Form.Control as="option" value="" disabled selected>Select Category</Form.Control>
                        {categories.map(category => {
                            return <Form.Control as="option" key={category._id} value={category._id}>{category.name}</Form.Control>
                        }
                        )}
                    </Form.Control>
                </Form.Group>
                <Button variant="outline-dark" type="submit" style={{ width: "100%" }}>
                    Submit
                </Button>
            </Form>
            <h3 style={{ textAlign: "center", marginTop: "50px" }}>HTML Display</h3>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px" }}>
                    {parse(tableHTML)}
                </Box>
        </Container>
    )
}

export default AddRecord
