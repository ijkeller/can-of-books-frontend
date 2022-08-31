import React from 'react';


class UpdateBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    handleOpen = () => {
        this.setState({ showModal: true })
    }

    handleClose = () => {
        this.setState({ showModal: false })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let bookToUpdate = {
            title: e.target.title.value || this.props.book.title,
            description: e.target.description.value || this.props.book.description,
            status: e.target.status.value || this.props.book.status,
            _id: this.props.book._id,
            __v: this.props.book.__v
        }

        this.props.handleUpdateBook(bookToUpdate);
    }

    render() {
        return (
            <>
                <Button variant="secondary" onClick={this.handleOpen} >Update Book</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered className='modal' >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Title>Update Book</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={this.props.handleSubmit}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Control type="text" placeholder='Enter Book Name' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control type="text-area" placeholder='Enter Book Description' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="status">
                                <Form.Check
                                    type="switch"
                                    label="Has this book been read?"
                                />
                            </Form.Group>
                            <Button variant="secondary" type="submit" onClick={this.handleSubmit} >Submit</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default UpdateBook;