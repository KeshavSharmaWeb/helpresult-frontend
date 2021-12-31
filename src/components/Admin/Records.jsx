import React, { useState, useEffect } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { formattedDate, userExists } from '../../helperFns'
import ReactPaginate from "react-paginate";

const Records = () => {

    const [records, setRecords] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const [loading, setLoading] = useState(true)

    // pagination
    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const rowsPerPage = 10; // no of records per row 

    const pagesVisited = pageNumber * rowsPerPage;

    const displayRows = rows.slice(pagesVisited, pagesVisited + rowsPerPage)

    let rowindex = rows.indexOf(displayRows[0]) + 1

    const pageCount = Math.ceil(rows.length / rowsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    // pagination end


    useEffect(() => {
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
            })
        axios.get(`${url}/records`)
            .then(res => {
                setRecords(res.data)
                setRows(res.data)
            })
        axios.get(`${url}/sub-categories`)
            .then(res => {
                setSubCategories(res.data)
                setLoading(false)
            })
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
            } else {
                alert('Something went wrong')
            }
        })
    }

    const [searchText, setSearchText] = useState([])

    const searchForString = (e) => {
        let searchText = e.target.value.toLowerCase()
        console.log(searchText)
        if (e.target.value !== "") {
            let test = records.length > 0 ? records.filter((val) => {
                return val.name.toLowerCase().includes(searchText)
            }) : ""
            setSearchText(test)
            setRows(test)
        }else{
            setSearchText([])
            setRows(records)
        }
    }

    return (
        <Container>
            <h3 style={{ textAlign: "center", marginTop: 40 }}>Posts</h3>
            <input class="form-control me-2" type="search" placeholder="Search Here..." name="" id="" onChange={(e) => searchForString(e)} aria-label="Search" style={{ margin: "20px 0", width: "30%"}}/>
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    searchText.length > 0 ? <>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Post Display</th>
                                <th>Date Added</th>
                                <th>Date Updated</th>
                                <th>Last date</th>
                                <th>Category</th>
                                <th>Sub category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchText.reverse().map((text, id) => {
                                    return <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{text.name}</td>
                                        <td>{text.post_display_name}</td>
                                        <td>{text.created_at}</td>
                                        <td>{text.updated_at ?( (new Date(text.updated_at).toLocaleString()).toLowerCase() === "invalid date" ? text.updated_at : new Date(text.updated_at).toLocaleString()) : "N/A"}</td>

                                        <td>{formattedDate(text.last_date)}</td>
                                        <td>{categories.filter(category => text.categoryIds.indexOf(category._id) > -1).map(category => category.name).join(', ')}</td>
                                        <td>{subCategories.filter(category => text.subCategory === category._id)[0].name}</td>

                                        <td>
                                            <Cancel fontSize="small" onClick={() => handleCancel(text._id)} style={{ cursor: "pointer" }} />
                                        </td>
                                        <td>
                                            <Button variant="outline-dark" size="sm" as={Link} to={`/admin/records/edit?id=${text._id}`} >
                                                Edit
                                            </Button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </> :
                        (
                            records.length > 0 ? (
                                <>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Post Display</th>
                                            <th>Date Added</th>
                                            <th>Date Updated</th>
                                            <th>Last date</th>
                                            <th>Category</th>
                                            <th>Sub category</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            !loading &&
                                            displayRows.reverse().map((record, index) => (

                                                <tr>
                                                    <td>{index + rowindex}</td>
                                                    <td>{record.name}</td>
                                                    <td>{record.post_display_name}</td>
                                                    <td>{record.created_at}</td>
                                                    <td>{record.updated_at ?( (new Date(record.updated_at).toLocaleString()).toLowerCase() === "invalid date" ? record.updated_at : new Date(record.updated_at).toLocaleString()) : "N/A"}</td>
                                                    <td>{record.last_date ? formattedDate(record.last_date) : "N/A"}</td>
                                                    <td>{categories.filter(category => record.categoryIds.indexOf(category._id) > -1).map(category => category.name).join(', ')}</td>
                                                    <td>{subCategories.filter(category => record.subCategory === category._id)[0].name}</td>

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
                        )
                }
            </Table>
            {
                (records.length > 0 && loading === false) ? <ReactPaginate
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

export default Records
