import React, { useState, useEffect } from 'react'
import { Container, Button, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { Cancel } from '@material-ui/icons'
import { userExists } from '../../helperFns'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    function convertToSlug(str) {
        str = str.toLowerCase();
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    useEffect(() => {
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
    }, [])

    const handleCancel = async (id) => {
        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
            return
        }

        axios.post(url + "/delete-category", { id: id, userId: localStorage.getItem('userId') }).then(res => {
            if (res.status === 200) {
                setCategories(categories.filter(category => category._id !== id))
            } else if (res.data.status === 401) {
                alert('You are not authorized to delete this category')
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const handleUpdate = async (id, name, minHeight) => {
        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }

        axios.post(url + "/update-category", { id: id, userId: localStorage.getItem('userId'), name: name, minHeight: minHeight }).then(res => {
            if (res.status === 200) {
                setCategories(categories.map(category => category._id === id ? { ...category, name: name, slug: convertToSlug(name), minHeight: minHeight } : category))
            } else if (res.data.status === 401) {
                alert('You are not authorized to update this category')
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const handleFormSubmit = async (e) => {
        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            minHeight: formData.get('min_height'),
            userId: localStorage.getItem('userId')
        }

        axios.post(url + "/add-category", data).then(res => {
            if (res.status === 200) {
                setCategories([...categories, res.data])
            } else if (res.data.status === 401) {
                alert('You are not authorized to add a category')
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const AddNewCategory = () => {
        return (
            <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
                <h3 style={{ textAlign: "center" }}>Add new Category</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter category name" required />
                        <Form.Text className="text-muted">
                            URL will be generated automatically.
                        </Form.Text> <br />
                        <Form.Label>Minimum Height</Form.Label>
                        <Form.Control type="number" name="min_height" placeholder="Enter minimum height" required />
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
            <AddNewCategory />
            <hr />
            <Table striped bordered hover style={{ marginTop: 30, textAlign: "center" }}>
                {
                    categories.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Minimum Height</th>
                                    <th>Date Added</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    !loading &&
                                    categories.map((category, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><input id={`name-${category._id}`} type="text" placeholder={category.name} style={{ textAlign: "center" }} /></td>
                                            <td><input id={`minHeight-${category._id}`} type="number" placeholder={category.minHeight} style={{ textAlign: "center" }} /></td>
                                            <td>{category.date}</td>
                                            <td>
                                                <Cancel fontSize="small" onClick={() => handleCancel(category._id)} style={{ cursor: "pointer" }} />
                                            </td>
                                            <td>
                                                <Button variant="outline-dark" size="sm" onClick={() => { handleUpdate(
                                                    category._id, 
                                                    document.getElementById(`name-${category._id}`).value === "" ? category.name : document.getElementById(`name-${category._id}`).value,
                                                    document.getElementById(`minHeight-${category._id}`).value === "" ? category.minHeight : document.getElementById(`minHeight-${category._id}`).value
                                                    )
                                                    ;document.getElementById(`name-${category._id}`).value = ""; document.getElementById(`minHeight-${category._id}`).value="" }}>
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

export default Categories
