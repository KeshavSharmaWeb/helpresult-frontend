import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../config'

const Dashboard = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${url}/logs`)
            .then(res => {
                setLogs(res.data)
                setLoading(false)
            })
    }, [])


    return (
        <Container>
            <h3 style={{ textAlign: "center", marginTop: 40 }}>Logs</h3>
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    logs.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Datetime</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    !loading &&
                                    logs.map((log, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{log.user}</td>
                                            <td>{log.action}</td>
                                            <td>{log.datetime}</td>
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

export default Dashboard
