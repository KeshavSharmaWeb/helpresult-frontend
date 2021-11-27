import React from 'react'
import { Button, Container } from 'react-bootstrap'

const Records = () => {
    return (
        <Container>
            <Button style={{ width: "80%", marginTop: 10, display: "block", marginLeft: "auto", marginRight: "auto" }}  variant="outline-dark">Add new Record</Button>
        </Container>
    )
}

export default Records
