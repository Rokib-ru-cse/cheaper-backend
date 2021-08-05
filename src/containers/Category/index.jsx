import React, { Component } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/index'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/index'
import Loading from '../../components/UI/Loading'
import { IoIosAdd, IoIosCloudUpload, IoIosTrash } from 'react-icons/io'
import { getAllCategory, addCategory, updateCategories, deleteCategories } from '../../store/actions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './style.css'
const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (form) => dispatch(addCategory(form)),
        updateCategories: (form) => dispatch(updateCategories(form)),
        getAllCategory: () => dispatch(getAllCategory()),
        deleteCategories: (idsArray) => dispatch(deleteCategories(idsArray))
    }
}
class index extends Component {
    state = {
        show: false,
        updateCategoryModal: false,
        deleteCategoryModal: false,
        category: '',
        parent: '',
        catimg: '',
        checked: [],
        expanded: [],
        checkedArray: [],
        expandedArray: [],
    }
    renderCategories = (allcategories) => {
        let categories = []
        for (let category of allcategories) {
            categories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length > 0 && this.renderCategories(category.children),
                }
            )
        }
        return categories
    }
    categoryList = (categories, cat = []) => {

        for (let category of categories) {
            cat.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type:category.type
            })
            if (category.children.length > 0) {
                this.categoryList(category.children, cat)
            }
        }
        return cat
    }
    handleForm = () => {
        const form = new FormData()
        if (this.state.category === '') {
            alert("Name is required")
            return
        }
        form.append('name', this.state.category)
        form.append('parentId', this.state.parent)
        form.append('categoryImage', this.state.catimg)
        this.props.addCategory(form)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCategoryImage = (e) => {
        this.setState({
            catimg: e.target.files[0]
        })
    }
    handleUpdateCategory = (e, index, type) => {
        if (type === 'checked') {
            const newCheckedArray = this.state.checkedArray.map((item, _index) => _index == index ? { ...item, [e.target.name]: e.target.value } : item)
            this.setState({
                checkedArray: newCheckedArray
            })
        }
        else if (type === 'expanded') {
            const newExpandedArray = this.state.expandedArray.map((item, _index) => _index == index ? { ...item, [e.target.name]: e.target.value } : item)
            this.setState({
                expandedArray: newExpandedArray
            })
        }
    }
    updateCategoriesForm = () => {
        var formData = new FormData()
        this.state.expandedArray.forEach((item, index) => {
            formData.append('_id', item.value);
            formData.append('name', item.name);
            formData.append('type', item.type);
            formData.append('parentId', item.parentId ? item.parentId : "");

        })
        this.state.checkedArray.forEach((item, index) => {
            formData.append('_id', item.value);
            formData.append('name', item.name);
            formData.append('type', item.type);
            formData.append('parentId', item.parentId ? item.parentId : "");
        })
        this.props.updateCategories(formData)
        this.setState({ updateCategoryModal: !this.state.updateCategoryModal })
    }
    updateCheckedAndExpandedCategories = () => {
        const categories = this.categoryList(this.props.categoryReducers.categories)
        this.state.checked.length > 0 && this.state.checked.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => cat.value == categoryId)
            this.state.checkedArray.push(category)
        })
        this.state.expanded.length > 0 && this.state.expanded.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => cat.value == categoryId)
            this.state.expandedArray.push(category)
        })
    }
    updateCategory = () => {
        this.updateCheckedAndExpandedCategories()
        this.setState({
            updateCategoryModal: !this.state.updateCategoryModal
        })
    }
    deleteCategory = () => {
        this.updateCheckedAndExpandedCategories()
        this.setState({ deleteCategoryModal: !this.state.deleteCategoryModal })
    }
    confirmDeleteCategory = () => {
        const expandedIdsArray = this.state.expandedArray.map(item => ({ _id: item.value }))
        const checkedIdsArray = this.state.checkedArray.map(item => ({ _id: item.value }))
        const idsArray = expandedIdsArray.concat(checkedIdsArray)
        if (this.state.checkedArray.length > 0) {
            this.props.deleteCategories(checkedIdsArray)
        }
        this.setState({ deleteCategoryModal: !this.state.deleteCategoryModal })
    }
    handleUpdateCategoryModal = () => {
        this.props.getAllCategory()
        this.setState({ updateCategoryModal: !this.state.updateCategoryModal })
    }
    handleDeleteCategoryModal = () => {
        this.props.getAllCategory()
        this.setState({ deleteCategoryModal: !this.state.deleteCategoryModal })
    }
    renderAddCategoryModal = () => {
        return (
            <Modal show={this.state.show} onHide={() => this.setState({ show: !this.state.show })}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Input
                                value={this.state.category}
                                placeholder="add category"
                                onChange={(e) => this.handleChange(e)}
                                name="category"
                                className="form-control-sm"
                            />
                        </Col>
                        <Col>
                            <select
                                value={this.state.parent}
                                onChange={(e) => this.handleChange(e)}
                                name="parent"
                                className="form-control form-control-sm" >
                                <option>select parent </option>
                                {
                                    this.categoryList(this.props.categoryReducers.categories).map((item, index) => {
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
                            <input type="file" name="categoryImage" onChange={(e) => this.handleCategoryImage(e)} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm" variant="outline-danger" onClick={() => this.setState({ show: !this.state.show })}>
                        Close
          </Button>
                    <Button className="btn-sm" variant="outline-success" onClick={this.handleForm}>
                        Save
          </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    rednerDeleteCategoryModal = () => {
        return (
            <Modal show={this.state.deleteCategoryModal} onHide={this.handleDeleteCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="text-danger text-center">Expanded</h2>
                    {
                        this.state.expandedArray.map((item, index) => <span key={index}>{item.name}    </span>)
                    }
                    <h2 className="text-danger text-center">Checked</h2>
                    {
                        this.state.checkedArray.map((item, index) => <span key={index}>{item.name}    </span>)
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.handleDeleteCategoryModal}>
                        Close
                </Button>
                    <Button variant="danger" onClick={this.confirmDeleteCategory}>
                        Done
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    renderUpdateCategoryModal = () => {
        return (
            <Modal size="lg" show={this.state.updateCategoryModal} onHide={this.handleUpdateCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h6>Expended</h6>
                        </Col>

                    </Row>
                    {
                        this.state.expandedArray.length > 0 &&
                        this.state.expandedArray.map((category, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <Input
                                            value={category.name}
                                            placeholder="Category Name"
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'expanded')}
                                            name="name"
                                        />
                                    </Col>
                                    <Col>
                                        <select
                                            value={category.parentId}
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'expanded')}
                                            name="parentId"
                                            className="form-control" >
                                            <option>select parent </option>
                                            {
                                                this.categoryList(this.props.categoryReducers.categories).map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.value}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Col>
                                    <Col>
                                        <select 
                                            className="form-control"
                                            value={category.type}
                                            name="type"
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'expanded')}
                                            >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                                    </Col>
                                </Row>


                            )
                        })
                    }
                    <Row>
                        <Col>
                            <h6>Checked</h6>
                        </Col>

                    </Row>
                    {
                        this.state.checkedArray.length > 0 &&
                        this.state.checkedArray.map((category, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <Input
                                            value={category.name}
                                            placeholder="Category Name"
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'checked')}
                                            name="name"

                                        />
                                    </Col>
                                    <Col>
                                        <select
                                            value={category.parentId}
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'checked')}
                                            name="parentId"
                                            className="form-control" >
                                            <option>select parent </option>
                                            {
                                                this.categoryList(this.props.categoryReducers.categories).map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.value}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Col>
                                    <Col>
                                        <select 
                                            className="form-control"
                                            name="type"
                                            value={category.type}
                                            onChange={(e) => this.handleUpdateCategory(e, index, 'checked')}
                                            >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                                    </Col>
                                </Row>


                            )
                        })
                    }
                    <input type="file" name="categoryImage" onChange={(e) => this.handleCategoryImage(e)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={this.handleUpdateCategoryModal}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={this.updateCategoriesForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    render() {
        if(this.props.categoryReducers.loading){
            return(
                <Loading />
            )
        }
        return (
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between">
                                <h3>Category</h3>
                                <div className="actionBtnContainer">
                                    <span>Actions : </span>
                                    <button onClick={() => this.setState({ show: !this.state.show })} className="btn btn-outline-primary"><IoIosAdd /><span> Add</span></button>
                                    <button onClick={this.updateCategory} className="btn btn-outline-info"><IoIosCloudUpload /><span> Update</span></button>
                                    <button onClick={this.deleteCategory} className="btn btn-outline-danger"><IoIosTrash /><span> Delete</span></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between">
                                <CheckboxTree
                                    nodes={this.renderCategories(this.props.categoryReducers.categories)}
                                    checked={this.state.checked}
                                    expanded={this.state.expanded}
                                    onCheck={checked => this.setState({ checked })}
                                    onExpand={expanded => this.setState({ expanded })}
                                    iconsClass="fa5"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                {this.renderAddCategoryModal()}
                {this.renderUpdateCategoryModal()}
                {this.rednerDeleteCategoryModal()}
            </Layout >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
