import React, { Component } from 'react';
import {    
        Card, 
        CardImg,
        ModalHeader, 
        ModalBody, 
        Row, 
        Col, 
        Label,
        CardText, 
        CardBody, 
        CardTitle, 
        Breadcrumb, 
        BreadcrumbItem, 
        Button, 
        Modal
    } from 'reactstrap';
import { Loading } from './LoadingComponent';    
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';    
import { baseUrl } from '../shared/baseUrl';

    // Fuctions that will be used for validation in the comment form
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);    


    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    /*
    * Rendering the comments
    */
    function RenderComments({comments, addComment, dishId}) {
        var commentList = comments.map(comment => {
            return (
                <li key={comment.id} >
                    {comment.comment}
                    <br /><br />
                    -- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    <br /><br />
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
                {/* Calling CommentForm component */}
                <CommentForm  dishId={dishId} addComment={addComment}/>
            </div>
        );
    }
   
    const DishDetail = props => {
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        } else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                                addComment = {props.addComment}
                                dishId = {props.dish.id} 
                            />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail;

// The CommentForm Component
export class CommentForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Here we set the isModalOpen to true when the submit button is clicked
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    /**
     * 
     * @param {*} values 
     */
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                {/* The Submit Button */}
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit comment</span>
                </Button>
                {/* The Modal div */}
                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    {/* The rating row */}
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Col md={10}>
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    {/* The Author row */}
                                    <Row className="form-group">
                                        <Label htmlFor="author" md={2}>Your name</Label>
                                        <Col md={10}>
                                            <Control.text 
                                                model=".author" 
                                                id="author" 
                                                name="author" 
                                                placeholder="Author" 
                                                className="form-control" 
                                                validators={{ 
                                                    required, 
                                                    minLength:  
                                                    minLength(3), 
                                                    maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".author" show="touched" messages=
                                                {{ 
                                                    required: 'Required', 
                                                    minLength: ' Must be greater than 3 characters', 
                                                    maxLength: 'Must be 15 charaters or less'
                                                }} />
                                        </Col>
                                    </Row>
                                    {/* The feedback row  */}
                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={2}>Your feedback</Label>
                                        <Col md={10}>
                                            <Control.textarea 
                                                model=".comment" 
                                                id="comment" name="message" 
                                                rows="6" 
                                                className="form-control" 
                                                validators={{ required }} />
                                            <Errors 
                                                className="text-danger" 
                                                model=".comment" 
                                                show="touched" messages=
                                                {{ required: 'Required'}} />
                                        </Col>
                                    </Row>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}