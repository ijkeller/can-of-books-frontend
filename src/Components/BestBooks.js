import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let booksUrl = `${process.env.REACT_APP_SERVER}/books`
      console.log(booksUrl)
      let booksData = await axios.get(booksUrl)
      this.setState({ books: booksData.data })
      
    } catch (error) {
      console.log("Error: ", error.response)
    }
  }
  
  componentDidMount() {
    this.getBooks();
  }
  
  render() {
    // console.log('booksdata.data: ', this.booksData.data)
    console.log(this.state.books)

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {
          this.state.books.length
            ?
            (
              <Carousel>
                {this.state.books.map((book, i )=> {
                  return(
                  <Carousel.Item key={i}>
                      <img src='https://picsum.photos/200/300' alt='random from picsum' />
                    <Carousel.Caption>
                      <h3 >{book.title}</h3>
                      <p>{book.description}</p>
                      <p>Status: {book.status} </p>
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
