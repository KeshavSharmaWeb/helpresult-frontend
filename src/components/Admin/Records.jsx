import React, { useState, useEffect } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { formattedDate, userExists } from '../../helperFns'

const Records = () => {
    const [records, setRecords] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
            })
        axios.get(`${url}/records`)
            .then(res => {
                setRecords(res.data)
            })
        setLoading(false)
    }, [])

    const handleCancel = async (id) => {
        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }

        axios.post(url + "/delete-record", { id: id, userId: localStorage.getItem('userId') }).then(res => {
            if (res.data.status === 401) {
                alert('You are not authorized to delete this record')
            }
             else if (res.status === 200) {
                setRecords(records.filter(record => record._id !== id))
            }  else {
                alert('Something went wrong')
            }
        })
    }


    return (
        <Container>
            <h3 style={{ textAlign: "center", marginTop: 40 }}>Records</h3>
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    records.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Post Display</th>
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
                                            <td>{record._id}</td>
                                            <td>{record.name}</td>
                                            <td>{record.post_display_name}</td>
                                            <td>{record.created_at}</td>
                                            <td>{record.updated_at}</td>
                                            <td>{record.short_information.slice(0, 50)}...</td>
                                            <td>{formattedDate(record.last_date)}</td>
                                            <td>{record.more_data_html.slice(0, 50)}...</td>
                                            <td>{categories.filter(category => record.categoryIds.indexOf(category._id) > -1).map(category => category.name).join(', ')}</td>
                                            
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
