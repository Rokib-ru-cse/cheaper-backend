import React, { Component } from 'react'
import { Modal, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout/index'
import Input from '../../components/UI/Input/index'
import linearCategoryList from '../../helpers/linearCategoryList'
import { connect } from 'react-redux'
import {createPage} from '../../store/actions/index'
import Loading from '../../components/UI/Loading'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createPage : (formData)=>dispatch(createPage(formData))
    }
}
export class index extends Component {

    state = {
        createPageModal: false,
        title: '',
        category: '',
        type:"",
        description:'',
        categories: [],
        banners: [],
        products: []
    }
    componentDidMount() {
        this.setState({
            categories: linearCategoryList(this.props.categoryReducers.categories)
        })
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.name == 'category'){
            const cate = this.state.categories.find(item=>item.value==e.target.value)
            this.setState({
                type:cate.type
            })
        }
    }
    handleBannerImages = (e) => {
        this.setState({
            banners: [...this.state.banners, e.target.files[0]]
        })
    }
    handleProductImages = (e) => {
        this.setState({
            products: [...this.state.products, e.target.files[0]]
        })
    }

    pageCreate = () => {
        if(this.state.title==''){
            alert("Title is required")
            return
        }
        const formData = new FormData()
        formData.append('title',this.state.title)
        formData.append('description',this.state.description)
        formData.append('category',this.state.category)
        formData.append('type',this.state.type)
        this.state.banners.forEach((banner,index)=>{
            formData.append('banners',banner)
        })
        this.state.products.forEach((product,index)=>{
            formData.append('products',product)
        })
        this.props.createPage(formData)
    }

    renderCreatePageModal = () => {
        return (
            <Modal show={this.state.createPageModal} onHide={() => this.setState({ createPageModal: !this.state.createPageModal })}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                name="category"
                                onChange={(e) => this.handleInputChange(e)}
                            >
                                <option value="">Select category</option>
                                {
                                    this.state.categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={this.state.title}
                                name="title"
                                onChange={(e) => this.handleInputChange(e)}
                                placeholder="Page Title"
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={this.state.description}
                                name="description"
                                onChange={(e) => this.handleInputChange(e)}
                                placeholder="Page description"
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    {
                        this.state.banners.length > 0 ?
                            this.state.banners.map((item, i) => {
                                return (
                                    <Row key={i}>
                                        <Col>{item.name}</Col>
                                    </Row>
                                )
                            }) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={(e) => this.handleBannerImages(e)}
                            />
                        </Col>
                    </Row>
                    {
                        this.state.products.length > 0 ?
                            this.state.products.map((item, i) => {
                                return (
                                    <Row key={i}>
                                        <Col>{item.name}</Col>
                                    </Row>
                                )
                            }) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                onChange={(e) => this.handleProductImages(e)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>this.setState({ createPageModal: !this.state.createPageModal })}>
                        Close
                </Button>
                    <Button variant="danger" onClick={this.pageCreate}>
                        Done
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }



    render() {
        if(this.props.pageReducers.loading){
            return(
                <Loading/>
            )
        }
        return (
            <Layout sidebar>
                {this.renderCreatePageModal()}
                <button onClick={() => this.setState({ createPageModal: !this.state.createPageModal })}>Create Page</button>
            </Layout>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index)
