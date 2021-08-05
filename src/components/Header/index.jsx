import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogOut } from '../../store/actions/auth.actions'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        logout : ()=>dispatch(userLogOut())
    }
}

class index extends Component {

    aaa=()=>{
        this.props.logout()
    }

    renderLoggedInUser = () => {
        return (
            <>
                <li className='nav-item'>
                    <span onClick={this.aaa} className='btn nav-link'>Signout</span>
                </li>
            </>
        )
    }

    renderNonLoggedInUser = () => {
        return (
            <>
                <li className='nav-item'>
                    <NavLink className='nav-link' to="signin">Signin</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' to="signup">Signup</NavLink>
                </li>
            </>
        )
    }

    render() {
        return (
            <>
                <Navbar style={{ zIndex: "1" }} fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container fluid>
                        <Link className='navbar-brand' to='/'>Admin-DashBoard</Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>
                                {this.props.authReducers.authenticate ? this.renderLoggedInUser():this.renderNonLoggedInUser() }

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(index)
