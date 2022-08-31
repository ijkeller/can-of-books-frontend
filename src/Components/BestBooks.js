import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateBook from './UpdateBook.js';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      books: []
    }
  }

  getBooks = async () => {
    try {
      let booksUrl = `${process.env.REACT_APP_SERVER}/books`
      // console.log(booksUrl)
      let booksData = await axios.get(booksUrl)
      this.setState({ books: booksData.data })

    } catch (error) {
      console.log("Error: ", error.response)
    }
  }

  handleAddBook = async (bookInfo) => {
    // console.log(bookInfo);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      const addBook = response.data;
      console.log('add book: ')
      console.table(addBook)
      this.setState({ books: [...this.state.books, addBook] })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  handleRemoveBook = async (bookToRemove) => {
    try {
      console.log(`bookToRemove: ${bookToRemove}`)
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToRemove._id}`);
      console.log('response status: ', response.status);

      const filterBooks = this.state.books.filter(book => {
        console.table(book)
        return book._id !== bookToRemove._id;
      })

      this.setState = ({
        books: filterBooks
      })

    } catch (error) {
      console.log('Error: ', error)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('status value: ', e.target.status.value)
    this.handleAddBook({
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  getImage = `https://picsum.photos/200/300`;

  render() {
    console.log(this.state.books)

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <BookFormModal handleSubmit={this.handleSubmit} />
        {
          this.state.books.length
            ?
            (
              <Carousel>
                {this.state.books.map((book, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img src={this.getImage} alt='random from picsum' />
                      <Carousel.Caption >
                        <h3 >{book.title}</h3>
                        <p>{book.description}</p>
                        <p>Status: {book.status} </p>
                        <UpdateBook />
                        <Button variant="secondary" onClick={() => this.handleRemoveBook(book)} >Remove Book</Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            )
            :
            (
              <h3>No Books Found</h3>
            )}
      </>
    )
  }
}

export default BestBooks;
