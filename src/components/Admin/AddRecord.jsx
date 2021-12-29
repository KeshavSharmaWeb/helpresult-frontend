import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Box from '@material-ui/core/Box'
import { url } from '../../config'
import parse from 'html-react-parser'
import { userExists } from '../../helperFns'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

const AddRecord = () => {
    const [categories, setCategories] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [tableHTML, setTableHTML] = useState('')

    const [selectedCategories, setSelectedCategories] = useState([])
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        axios.get(`${url}/categories`)
            .then(res => {
                setCategories(res.data)
                setIsReady(true)
            })
    }, [])

    const handleCheckBox = (e) => {
        setIsChecked(e.target.checked)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        let last_date;

        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }
        const formData = new FormData(e.target)
        if (formData.get('last_date')) {
            last_date = formData.get('last_date')
        } else {
            last_date = null
        }
        const data = {
            name: formData.get('name'),
            userId: localStorage.getItem('userId'),
            categoryIds: selectedCategories,
            shortInfo: formData.get('shortInfo'),
            more_data_html: formData.get('more_data_html'),
            last_date: last_date,
            post_display_name: formData.get('record_display_name'),
        }
        axios.post(url + "/add-record", data).then(res => {
            if (res.data.status === 401) {
                alert("You are not authorized to add record")
            }
            else if (res.status === 200) {
                alert("Record added successfully")
                window.location.pathname = '/admin/records'
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    return (
        <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
            <h3 style={{ textAlign: "center" }}>Add new Post</h3>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Post Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter post name" onChange={(e) => document.getElementById("record_display_name").value = e.target.value} required />

                    <Form.Label>Post display name</Form.Label>
                    <Form.Control type="text" name="record_display_name" placeholder="Enter post display name" id="record_display_name" required />


                    <FormControl sx={{ marginY: 1, width: 300 }}>
                        <InputLabel>Categories</InputLabel>
                        <Select
                            multiple
                            value={selectedCategories}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => categories.filter(category => selected.indexOf(category._id) > -1).map(category => category.name).join(', ')}
                            MenuProps={MenuProps}
                            name="role"
                            required
                        >
                            {isReady && categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    <ListItemText primary={category.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl><br />

                    <Form.Label>Short Information</Form.Label>
                    <Form.Control type="text" name="shortInfo" as="textarea" placeholder="Enter short information" required />
                    <div style={{ margin: "10px 0" }}>

                        <input type="checkbox" id="show_last_date" onChange={handleCheckBox} />{"    "}
                        <label htmlFor="show_last_date">
                            Enter last date
                        </label> <br />
                    </div>
                    <div style={{ display: isChecked ? 'block' : 'none' }}>
                        <Form.Label>Last Date to apply</Form.Label>
                        <Form.Control type="date" name="last_date" placeholder="Pick date" />
                    </div>
                    <Form.Label>Table HTML</Form.Label>
                    <Form.Control type="text" name="more_data_html" as="textarea" placeholder="Enter table html" onChange={(e) => setTableHTML(e.target.value)} required />
                </Form.Group>
                <Button variant="outline-dark" type="submit" style={{ width: "100%" }}>
                    Submit
                </Button>
            </Form>
            <h3 style={{ textAlign: "center", marginTop: "50px" }}>HTML Display</h3>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px" }}>
                {parse(tableHTML)}
            </Box>
        </Container>
    )
}

export default AddRecord
