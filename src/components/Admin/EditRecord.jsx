import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../config'
import { formattedDate, userExists } from '../../helperFns'
import parse from 'html-react-parser';
import { Box } from '@material-ui/core'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        display: "flex",
        margin: "2% 8%",
        width: "100%",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]:{
            flexDirection: "column",
            margin: "2% 5%"
        }
    },
    box1:{
        width: "37%",
        [theme.breakpoints.down("xs")]:{
            width: "80%"
        }
    },
    box2: {
        marginTop: "0px",
        width: "60%",
    }
}))

const EditRecord = () => {
    const query = new URLSearchParams(window.location.search)
    const recordId = query.get('id')

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const [isChecked, setIsChecked] = useState(false)
    const [record, setRecord] = useState([])
    const [isReady, setIsReady] = useState(false)

    const [tableHTML, setTableHTML] = useState('<h2>Loading...</h2>')
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

    const handleCheckBox = (e) => {
        setIsChecked(e.target.checked)
    }

    useEffect(() => {
        axios.get(`${url}/records?_id=${recordId}`).then(res => {
            setRecord(res.data[0])
            setTableHTML(res.data[0].more_data_html)
            setSelectedCategories(res.data[0].categoryIds)
        }
        )
        axios.get(`${url}/categories`).then(res => {
            setCategories(res.data)
        }
        )
        axios.get(`${url}/sub-categories`)
            .then(res => {
                setSubCategories(res.data)
                setIsReady(true)
            }
            )

    }, [recordId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let last_date;

        const isUserExists = await userExists(localStorage.getItem('userId'))
        if (!isUserExists) {
            localStorage.removeItem('user')
            window.location.reload()
            alert('You have been logged out')
        }
        const formData = new FormData(e.target)
        if (!formData.get('last_date')) {
            last_date = record.last_date
        } else {
            last_date = formData.get('last_date')
        }
        const data = {
            id: record._id,
            userId: localStorage.getItem('userId'),
            name: formData.get('name'),
            categoryIds: selectedCategories,
            subCategoryId: formData.get('sub-category'),
            shortInfo: formData.get('shortInfo'),
            more_data_html: formData.get('more_data_html'),
            last_date: last_date,
            post_display_name: formData.get('record_display_name'),
        }
        axios.post(`${url}/update-record`, data).then(res => {
            if (res.data.status === 401) {
                alert("You are not authorized to edit this record")
            } else if (res.status === 200) {
                alert("Record updated successfully")
                window.location.href = '/admin/records'
            } else {
                alert("Something went wrong")
            }
        }
        )
    }

    const date = formattedDate(record.last_date)

    const classes = useStyles()

    return (
        // <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
        <Container className={classes.container} >
            <Box className={classes.box1}>
                <h3 style={{ textAlign: "center" }}>Edit Post</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Post Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter record name" defaultValue={record.name} onChange={(e) => document.getElementById("record_display_name").value = e.target.value} required />
                        <Form.Label>Post display name</Form.Label>
                        <Form.Control type="text" name="record_display_name" placeholder="Enter record display name" id="record_display_name" defaultValue={record.name} required />

                        <FormControl sx={{ marginY: 2, width: 300 }}>
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

                        <Form.Label>Sub Category</Form.Label> <br />
                        <Form.Control as="select" name="sub-category" id="sub-category" required>
                            <Form.Control as="option" value="" disabled selected>Select Category</Form.Control>
                            {subCategories.map(category => {
                                return <Form.Control as="option" key={category._id} value={category._id} selected={category._id === record.subCategory ? true : false}>{category.name}</Form.Control>
                            }
                            )}
                        </Form.Control> <br />

                        <Form.Label>Short Information</Form.Label>
                        <Form.Control type="text" name="shortInfo" as="textarea" placeholder="Enter Short Information" defaultValue={record.short_information} required />
                        <div style={{ margin: "10px 0" }}>

                            <input type="checkbox" id="show_last_date" onChange={handleCheckBox} />{"    "}
                            <label htmlFor="show_last_date">
                                Edit last date
                            </label> <br />
                        </div>
                        <div style={{ display: isChecked ? 'block' : 'none' }}>
                            <Form.Label>Last Date to apply -  Current Date: {date}</Form.Label>
                            <Form.Control type="date" name="last_date" placeholder="Pick date" />
                        </div>
                        <Form.Label>Table HTML</Form.Label>
                        <Form.Control type="text" name="more_data_html" as="textarea" placeholder="Enter table html" defaultValue={record.more_data_html} onChange={(e) => setTableHTML(e.target.value)} required />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" style={{ width: "100%" }}>
                        Update
                    </Button>
                </Form>
            </Box>


            <Box className={classes.box2}>
                <h3 style={{ textAlign: "center"}}>HTML Display</h3>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px" }}>
                    {parse(tableHTML)}
                </Box>
            </Box>

        </Container>
    )
}

export default EditRecord
