import React, { useState, useEffect } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'


const NewsRecord = () => {
    const [newsRecords, setNewsRecords] = useState([])
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

    const updateNewsRecord = async (id, name, recordId, color) => {
        axios.post(url + "/update-news-record", { id: id, fillColor: color, name: name, recordId: recordId }).then(res => {
            if (res.status === 200) {
                setNewsRecords(newsRecords.map(newsRecord => newsRecord._id === id ? { ...newsRecord, name: name, recordId: recordId, fillColor: color } : newsRecord))
                alert("Record Updated")
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    return (
        <Container>
            {/* <AddRecordToNews /> */}
            {/* <hr /> */}
            <h3 style={{ textAlign: "center", marginTop: 30 }}>News Posts</h3>
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
                                    <th>Type</th>
                                    <th></th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    !loading &&
                                    newsRecords.map((newsRecord, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><input type="text" defaultValue={newsRecord.name} id={`name-${newsRecord._id}`} style={{ textAlign: "center" }} /></td>
                                            <td><input type="text" defaultValue={newsRecord.recordId} id={`record-${newsRecord._id}`} style={{ textAlign: "center" }} /> </td>
                                            <td>{newsRecord.box ? <input type="text" defaultValue={newsRecord.fillColor} id={`color-${newsRecord._id}`} style={{ textAlign: "center" }} />: <><p>N/A</p>
                                            <input type="hidden" id={`color-${newsRecord._id}`} value={"NA"}/></>}</td>
                                            <td>{newsRecord.datetime}</td>
                                            <td>{newsRecord.box ? "Box": "Moving Text"}</td>
                                            <td><Button variant="outline-dark" size="sm" onClick={() => updateNewsRecord(
                                                newsRecord._id,
                                                document.getElementById(`name-${newsRecord._id}`).value === "" ? newsRecord.name : document.getElementById(`name-${newsRecord._id}`).value,
                                                document.getElementById(`record-${newsRecord._id}`).value === "" ? newsRecord.recordId : document.getElementById(`record-${newsRecord._id}`).value,
                                                document.getElementById(`color-${newsRecord._id}`).value === "" ? newsRecord.fillColor : document.getElementById(`color-${newsRecord._id}`).value
                                                )}>
                                                Update
                                            </Button></td>
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
