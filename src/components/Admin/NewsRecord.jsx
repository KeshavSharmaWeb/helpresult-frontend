import React, { useState, useEffect } from 'react'
import { Container, Button, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { HexColorPicker } from "react-colorful";
import { Box } from '@material-ui/core'


const NewsRecord = () => {
    const [newsRecords, setNewsRecords] = useState([])
    const [color, setColor] = useState("#aabbcc");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${url}/news-records`)
            .then(res => {
                setNewsRecords(res.data)
                setLoading(false)
            })
    }, [])

    const handleCancel = async (id) => {
        axios.post(url + "/delete-news-records", { id: id }).then(res => {
            if (res.status === 200) {
                setNewsRecords(newsRecords.filter(newsRecord => newsRecord._id !== id))
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            recordId: formData.get('recordId'),
            fillColor: color,
        }

        axios.post(`${url}/add-news-records`, data).then(res => {
            if (res.status === 200) {
                console.log(res.data);
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
                    <Form.Label>Fill Color</Form.Label>
                    <Box style={{ display: "flex", alignItems: "flex-end", margin: "20px 0", marginTop: "5px" }}>

                    <HexColorPicker color={color} onChange={setColor} style={{ marginRight: "30px" }} />
                    <Box style={{ backgroundColor: color, width: "7vw", height: "7vw" }}></Box>
                    </Box>
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
                                    <th>Fill Color</th>
                                    <th>Date Added</th>
                                    <th>Delete</th>
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
                                            <td>{newsRecord.fillColor}</td>
                                            <td>{newsRecord.datetime}</td>
                                            <td>
                                                <Cancel fontSize="small" onClick={() => handleCancel(newsRecord._id)} style={{ cursor: "pointer" }} />
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
