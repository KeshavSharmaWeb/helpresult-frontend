import React, { useState, useEffect } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate";

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // pagination
    const [userRows, setUserRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const rowsPerPage = 10;
    const pagesVisited = pageNumber * rowsPerPage;

    const displayRows = userRows.slice(pagesVisited, pagesVisited + rowsPerPage)

    const pageCount = Math.ceil(userRows.length / rowsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    // pagination end

    useEffect(() => {
        axios.get(`${url}/users`)
            .then(res => {
                setUsers(res.data)
                setLoading(false)
                setUserRows(res.data)
            })
    }, [])

    const handleCancel = (id) => {
        axios.post(url + "/user/delete", { id: id }).then(res => {
            if (res.status === 200) {
                setUsers(users.filter(user => user._id !== id))
            } else {
                alert("Something went wrong")
            }
        }
        )
    }


    return (
        <Container>
            <h3 style={{ textAlign: "center", marginTop: 40 }}>Users</h3>
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    users.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Roles</th>
                                    <th>Date added</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !loading &&
                                    displayRows.map(user => (
                                        <tr>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td>{user.roles.join(',')}</td>
                                            <td>{user.datetime}</td>
                                            <td>
                                                <Cancel fontSize="small" onClick={() => handleCancel(user._id)} style={{ cursor: "pointer" }} />
                                            </td>
                                            <td>
                                                <Button variant="outline-dark" size="sm" as={Link} to={`/admin/users/edit?id=${user._id}`} >
                                                    Edit
                                                </Button></td>
                                        </tr>
                                    ))}

                            </tbody>
                        </>
                    ) : <h3 style={{ textAlign: "center" }}>Nothing to display</h3>
                }
            </Table>
            {
                (users.length > 0 && loading === false) ? <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-end"}
                    previousLinkClassName={"page-link page-item disabled"}
                    nextLinkClassName={"page-link page-item disabled"}
                    disabledClassName={"page-item disabled"}
                    activeClassName={"page-item active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                /> : ""
            }
        </Container>
    )
}

export default Users
