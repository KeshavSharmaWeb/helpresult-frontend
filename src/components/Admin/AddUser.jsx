import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { roles, url } from '../../config'
import axios from 'axios'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const AddUser = () => {
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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            roles: formData.get('role').split(','),
        }
        axios.post(`${url}/user/add`, data).then(res => { 
            if(res.status === 200) {
                window.location.href = "/admin/users"
                alert("User added successfully")
            } else alert("Something went wrong")
         })
    }

    const [roleName, setRoleName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setRoleName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Container style={{ width: "50%", marginTop: 30, marginBottom: 30 }}>
            <h3 style={{ textAlign: "center" }}>Add new User</h3>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter user name" required />

                    <Form.Label>User Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter user email" required />

                    <Form.Label>User Password</Form.Label>
                    <Form.Control type="text" name="password" placeholder="Enter user password" required />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            multiple
                            value={roleName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            name="role"
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    <Checkbox checked={roleName.indexOf(role) > -1} />
                                    <ListItemText primary={role} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Form.Group>
                <Button variant="outline-dark" type="submit" style={{ width: "100%" }}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddUser


