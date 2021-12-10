import React, { useState, useEffect } from 'react'
import { Container, Button, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { userExists } from '../../helperFns'

const NewsRecord = () => {
    const [newsRecords, setNewsRecords] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${url}/news-records`)
            .then(res => {
                console.log(res.data);
                setNewsRecords(res.data)
                setLoading(false)
            })
    }, [])

    const handleCancel = async (id) => {
        axios.post(url + "/news-records/delete", { id: id }).then(res => {
            if (res.status === 200) {
                setNewsRecords(newsRecords.filter(newsRecord => newsRecord._id !== id))
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    // const handleUpdate = async (id, name, minHeight) => {
    //     axios.post(url + "/update-category", { id: id, userId: localStorage.getItem('userId'), name: name, minHeight: minHeight }).then(res => {
    //         if (res.status === 200) {
    //             setNewsRecords(categories.map(category => category._id === id ? { ...category, name: name, slug: convertToSlug(name), minHeight: minHeight } : category))
    //         } else {
    //             alert("Something went wrong")
    //         }
    //     }
    //     )
    // }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            recordId: formData.get('recordId'),
        }

        axios.post(url + "/news-records/add", data).then(res => {
            if (res.status === 200) {
                setNewsRecords([...newsRecords, res.data])
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const AddRecordToNews = () => {
        return (
            <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
                <h3 style={{ textAlign: "center" }}>Add a record to news</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>News Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter news name" required />
                    <br />
                        <Form.Label>Record Id</Form.Label>
                        <Form.Control type="text" name="recordId" placeholder="Enter record id" required />
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
            <AddRecordToNews />
            <hr />
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    newsRecords.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>News Name</th>
                                    <th>Record Id</th>
                                    <th>Date Added</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    !loading &&
                                    newsRecords.map((newsRecord, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{newsRecord.name}</td>
                                            <td>{newsRecord.recordId}</td>
                                            <td>
                                                <Cancel fontSize="small" onClick={() => handleCancel(newsRecord._id)} style={{ cursor: "pointer" }} />
                                            </td>
                                            <td>
                                                <Button variant="outline-dark" size="sm" >
                                                    Update
                                                </Button>
                                            </td>
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

export default NewsRecord
