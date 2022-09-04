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

  booksUrl = process.env.REACT_APP_SERVER;

  getBooks = async () => {
    try {
      let getbooksUrl = `${this.booksUrl}/books`
      console.log(getbooksUrl)
      let getbooksData = await axios.get(getbooksUrl)
      this.setState({ books: getbooksData.data })

    } catch (error) {
      console.log("Error: ", error.response)
    }
  }

  handleAddBook = async (bookInfo) => {
    // console.log(bookInfo);
    try {
      const response = await axios.post(`${this.booksUrl}/books`, bookInfo);
      const addBook = response.data;
      console.log('add book: ')
      console.table(addBook)
      this.setState({ books: [...this.state.books, addBook] })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  handleUpdateBook = async (bookToUpdate) => {
    try {
      console.log('bookToUpdate: ', bookToUpdate)
      let url = `${this.booksUrl}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate)

      console.log('updatedBook.data:')
      console.table(updatedBook)
      
      let updatedBookArray = this.state.books.map(origBook => {
        return origBook._id === bookToUpdate._id
        ? updatedBook.data
        : origBook
      });
      this.setState({
        books: updatedBookArray
      })

    } catch (error) {
      console.log('Error: ', error)
    }
  }

  handleRemoveBook = async (bookToRemove) => {
    try {
      console.log(`bookToRemove: ${bookToRemove}`)
      const response = await axios.delete(`${this.booksUrl}/books/${bookToRemove._id}`);
      console.log('response status: ', response.status);

      const filterBooks = this.state.books.filter(book => {
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
                        <h3 className='carousel-title' >{book.title}</h3>
                        <p className='carousel-description' >{book.description}</p>
                        <p className='carousel-read' >Read: {book.status} </p>
                        <UpdateBook book={book} handleUpdateBook={this.handleUpdateBook} />
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
