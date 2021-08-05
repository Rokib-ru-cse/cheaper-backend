import React from 'react'
import { Form } from 'react-bootstrap'

function index(props) {
    return (
        <>
            <Form.Group >
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <Form.Control 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                    {...props}
                    />
                <Form.Text className="text-muted">
                    {props.errorMessage}
                </Form.Text>
            </Form.Group>
        </>
    )
}

export default index
