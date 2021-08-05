import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { signup } from '../../store/actions/auth.actions'
import Loading from '../../components/UI/Loading'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(signup(user))
    }
}

class index extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signup(user)
    }

    render() {
        if (this.props.userauthReducers.loading) {
            return (
                <Layout>
                    <Container>
                        <Loading />
                    </Container>
                </Layout>
            )
        }
        if (this.props.authReducers.authenticate) {
            return (
                <Redirect to={'/mern-flipkart-backend/'} />
            )
        }
        return (
            <Layout>
                <Container>
                    <Row style={{ marginTop: "50px" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label='First Name'
                                            type='text'
                                            placeholder='First Name'
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label='Last Name'
                                            type='text'
                                            placeholder='Last Name'
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    label='Email'
                                    type='email'
                                    placeholder='Email'
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleChange(e)}
                                />

                                <Input
                                    label='Password'
                                    type='password'
                                    placeholder='Password'
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Button variant="primary" type="submit">
                                    Signup
                            </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>

            </Layout >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
