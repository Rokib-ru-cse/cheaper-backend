import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { isUserLoggedIn, login } from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const mapDispatchToProps = (dispatch) => {
    return {
        log: (user) =>  dispatch(login(user)) ,
        isLoggedIn : ()=>dispatch(isUserLoggedIn())

    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

class index extends Component {

    state = {
        email: '',
        password: '',
        errors: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    userLogin = (e) => {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.log(user)
        this.props.isLoggedIn()
    }
   
    render() { 
        if (this.props.authReducers.authenticate) {
            return (
                <Redirect to='/mern-flipkart-backend/' />
            )
        }

        return (
            <Layout>
                <Container>
                    <Row style={{ marginTop: "50px" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={(e)=> this.userLogin(e) }>
                                <Input
                                    label='Email'
                                    type='email'
                                    placeholder='Email'
                                    value={this.state.email}
                                    name="email"
                                    onChange={(e) => this.handleChange(e)}
                                />

                                <Input
                                    label='Password'
                                    type='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    name="password"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Button variant="primary" type="submit">
                                    Signin
                            </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>

            </Layout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
