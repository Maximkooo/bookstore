import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";

import withBookstoreService from '../hoc'
import './book-list.css'

class BookList extends Component {

  componentDidMount() {
    const { bookstoreService } = this.props
    const data = bookstoreService.getBooks()

    this.props.booksLoaded(data)
  }

  render() {
    const { books } = this.props
    return (
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book} /></li>
            )
          })
        }
      </ul>
    )
  }
}

const mapStateToProps = ({ books }) => {
  return { books }
}
const mapDispatchToProps = (dispatch) => {
  return {
    booksLoaded: (newBooks) => {
      dispatch({
        type: 'BOOKS_LOADED',
        payload: newBooks
      })
    }
  }
}

export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList))