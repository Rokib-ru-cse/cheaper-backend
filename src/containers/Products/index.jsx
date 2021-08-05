import React, { Component } from 'react'
import Layout from '../../components/Layout/index'
import { connect } from 'react-redux'
import ProductPage from './ProductStore/index'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}


class index extends Component {

    render() {
        return (
            <Layout sidebar>
                <ProductPage />
            </Layout>
        )
    }
}

export default connect(mapStateToProps)(index)
