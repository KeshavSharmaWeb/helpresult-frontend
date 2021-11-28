import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { formattedDate } from '../../helperFns'

const EditRecord = () => {
    const query = new URLSearchParams(window.location.search)
    const recordId = query.get('id')

    const [categories, setCategories] = useState([])
    const [record, setRecord] = useState([])

    useEffect(() => {
        axios.get(`${url}/categories`).then(res => {
            setCategories(res.data)
        }
        )
        axios.get(`${url}/records?_id=${recordId}`).then(res => {
            setRecord(res.data[0])
        }
        )
    }, [recordId])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            id: record._id,
            name: formData.get('name'),
            categoryId: formData.get('category'),
            shortInfo: formData.get('shortInfo'),
            more_data_html: formData.get('more_data_html'),
            last_date: formData.get('last_date'),
        }
        axios.post(`${url}/update-record`, data).then(res => {
            window.location.href = '/admin/records'
        }
        )
    }

    const date = formattedDate(record.last_date)

    return (
        <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
            <h3 style={{ textAlign: "center" }}>Edit Record</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Record Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter record name" defaultValue={record.name} required />
                    <Form.Label>Short Information</Form.Label>
                    <Form.Control type="text" name="shortInfo" as="textarea" placeholder="Enter Short Information" defaultValue={record.short_information} required />
                    <Form.Label>Last Date to apply  -  Current Date: {date}</Form.Label>
                    <Form.Control type="date" name="last_date" placeholder="Pick date" required />
                    <Form.Label>Table HTML</Form.Label>
                    <Form.Control type="text" name="more_data_html" as="textarea" placeholder="Enter table html" defaultValue={record.more_data_html} required />
                    <Form.Label>Category</Form.Label> <br />
                    <Form.Control as="select" name="category" id="category" required>
                        <Form.Control as="option" value="" disabled selected>Select Category</Form.Control>
                        {categories.map(category => {
                            return <Form.Control as="option" key={category._id} selected={category._id === record.categoryId ? true : false} value={category._id}>{category.name}</Form.Control>
                        }
                        )}
                    </Form.Control>
                </Form.Group>
                <Button variant="outline-dark" type="submit" style={{ width: "100%" }}>
                    Update
                </Button>
            </Form>
        </Container>
    )
}

export default EditRecord
