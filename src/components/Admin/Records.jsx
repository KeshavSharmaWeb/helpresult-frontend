import React, { useState, useEffect } from 'react'
import { Container, Button, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { formattedDate } from '../../helperFns'

const Records = () => {
    const [records, setRecords] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${url}/records`)
            .then(res => {
                setRecords(res.data)
            })
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
            })
        setLoading(false)
    }, [])

    const handleCancel = (id) => {
        axios.post(url + "/delete-record", { id: id }).then(res => {
            if (res.status === 200) {
                setRecords(records.filter(record => record._id !== id))
            } else {
                alert("Something went wrong")
            }
        }
        )
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            categoryId: formData.get('category'),
            shortInfo: formData.get('shortInfo'),
            more_data_html: formData.get('more_data_html'),
            last_date: formData.get('last_date'),
        }
        axios.post(url + "/add-record", data).then(res => {
            if (res.status === 200) {
                setRecords([...records, res.data])
            } else {
                alert("Something went wrong")
            }
        }
        )
    }




    const AddNewRecord = () => {
        return (
            <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
                <h3 style={{ textAlign: "center" }}>Add new Record</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Record Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter record name" required />
                        <Form.Label>Short Information</Form.Label>
                        <Form.Control type="text" name="shortInfo" as="textarea" placeholder="Enter short information" required />
                        <Form.Label>Last Date to apply</Form.Label>
                        <Form.Control type="date" name="last_date" placeholder="Pick date" required />
                        <Form.Label>Table HTML</Form.Label>
                        <Form.Control type="text" name="more_data_html" as="textarea" placeholder="Enter table html" required />
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
            </Container>
        )
    }
    return (
        <Container>
            <AddNewRecord />
            <hr />
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    records.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Url</th>
                                    <th>Date Added</th>
                                    <th>Date Updated</th>
                                    <th>Short Information</th>
                                    <th>Last date</th>
                                    <th>Table HTML</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    !loading &&
                                    records.map((record, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{record.name}</td>
                                            <td>{record.slug}</td>
                                            <td>{record.created_at}</td>
                                            <td>{record.updated_at}</td>
                                            <td>{record.short_information.slice(0, 50)}...</td>
                                            <td>{formattedDate(record.last_date)}</td>
                                            <td>{record.more_data_html.slice(0, 50)}...</td>

                                            <td>{((categories.filter(category => category._id === record.categoryId))[0]).name}</td>

                                            <td>
                                                <Cancel fontSize="small" onClick={() => handleCancel(record._id)} style={{ cursor: "pointer" }} />
                                            </td>
                                            <td>
                                                <Button variant="outline-dark" size="sm" as={Link} to={`/admin/records/edit?id=${record._id}`} >
                                                    Edit
                                                </Button></td>
                                        </tr>
                                    )
                                    )
                                }

                            </tbody>
                        </>
                    ) : <h3 style={{ textAlign: "center" }}>Nothing to display</h3>
                }
            </Table>
        </Container>
    )
}

export default Records
