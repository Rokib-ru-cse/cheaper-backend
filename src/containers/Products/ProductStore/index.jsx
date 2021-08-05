import React, { Component } from 'react'
import { Button, Col, Container, Modal, Row,Table } from 'react-bootstrap'
import Layout from '../../../components/Layout/index'
import Input from '../../../components/UI/Input/index'
import {connect} from 'react-redux'
import { addProduct,deleteProductById } from '../../../store/actions/index'

const mapStateToProps = (state)=>{
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        addProduct:(form)=>dispatch(addProduct(form)),
        deleteProductById:(payload)=>dispatch(deleteProductById(payload))
    }
}

class index extends Component {

    state = {
        detailshow:false,
        show: false,
        selectedProduct:null,
        name:'',
        productPictures:[],
        price:'',
        description:'',
        category:'',
        quantity:'',
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleProductImage = (e) => {
        const files = [...this.state.productPictures]
        files.push(e.target.files[0])
        this.setState({
            productPictures: files
        })
    }

    handleForm = ()=>{
        const form = new FormData()
        form.append('name',this.state.name)
        form.append('price',this.state.price)
        form.append('description',this.state.description)
        form.append('category',this.state.category)
        form.append('quantity',this.state.quantity)
        for(let pic of this.state.productPictures){
            
            form.append('productPictures',pic)
        }

        this.props.addProduct(form)
    }
    categoryList = (categories, cat = []) => {

        for (let category of categories) {
            cat.push({
                value: category._id,
                name: category.name
            })
            if (category.children.length > 0) {
                this.categoryList(category.children, cat)
            }
        }
        return cat

    }


    handleClose = () => {
        this.setState({
            show: false,
            detailshow:false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    productDetailModal = ()=>{
        if(this.state.selectedProduct == null){
            return null
        }
        return(
            <Modal show={this.state.detailshow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    <Row>
                        <Col md={6}>
                            <label >Name</label>
                            <p>{this.state.selectedProduct.name}</p>
                        </Col>
                        <Col md={6}>
                            <label >Price</label>
                            <p>{this.state.selectedProduct.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label >Quantity</label>
                            <p>{this.state.selectedProduct.quantity}</p>
                        </Col>
                        <Col md={6}>
                            <label >catrgory</label>
                            <p>{this.state.selectedProduct.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <label >Description</label>
                            <p>{this.state.selectedProduct.description}</p>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col style={{display:'flex'}}>
                            {this.state.selectedProduct.productPictures.map((pic,index)=>{
                                return(
                                    <div key={index}>
                                        <img src={`http://localhost:3000/public/${pic.img}`} alt="" width="100px" className="img-fluid" />
                                    </div>
                                )
                            })}
                        </Col> 
                        
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        
                    </Modal.Footer>
                </Modal>
        )
    } 
    productDetail = (product)=>{
        this.setState({
            detailshow: true,
            selectedProduct:product
        })
        
    }
  
    render() {
        return (
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between">
                                <h3>product</h3>
                                <button className="btn btn-primary" onClick={this.handleShow}>
                                    add
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between">
                                <ul>

                                    aaaaaaaaaaaaa
                                                
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table responsive="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>quantity</th>
                                    <th>category</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                     this.props.initialDataReducers.products.map((product,index)=>{
                                         return(
                                            <tr key={index}>
                                            <td>#</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.category.name}</td>
                                            <td>
                                                <button onClick={()=>this.productDetail(product)}>info</button>
                                                <button onClick={()=>{
                                                    const payload = {
                                                        productId : product._id,
                                                    };
                                                    this.props.deleteProductById(payload)
                                                }}>Delete</button>
                                            </td>
                                        
                                        </tr>
                                         )
                                     })
                                    }                            
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                {this.productDetailModal()}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            value={this.state.name}
                            placeholder="add product"
                            onChange={(e) => this.handleChange(e)}
                            name="name"
                            type="text"
                        />
                        <Input
                            value={this.state.description}
                            placeholder="add description"
                            onChange={(e) => this.handleChange(e)}
                            name="description"
                            type="text"

                        />
                        <Input
                            value={this.state.price}
                            placeholder="price"
                            onChange={(e) => this.handleChange(e)}
                            name="price"
                            type="number"

                        />
                        <Input
                            value={this.state.quantity}
                            placeholder="quantity"
                            onChange={(e) => this.handleChange(e)}
                            name="quantity"
                            type="number"
                        />
                        <select
                            value={this.state.category}
                            onChange={(e) => this.handleChange(e)}
                            name="category"
                            className="form-control" >
                            {
                                this.categoryList(this.props.categoryReducers.categories).map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            this.state.productPictures.length > 0 ? 
                            this.state.productPictures.map((pic,index)=>{
                                return(
                                <div key={index}>{pic.name}</div>
                                )
                            }) : null
                        }
                        <input type="file" name="productPictures" onChange={(e) => this.handleProductImage(e)} />




                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={this.handleForm}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(index)
