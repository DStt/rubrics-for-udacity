import React, {Component} from 'react';
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

class SearchPage extends Component {

	state = {
		query: '',
		books: []
	};

	updateQuery = (e) => {
		let query = e.target.value;
		this.setState({query: query},this.search);
	};

	search = () => {
		if (this.state.query !== '') {
			console.log('-SI');
			BooksAPI.search(this.state.query).then(result => {
				if (result.length) {
					result.map(book => {
						if (this.props.shelves.currentlyReading.indexOf(book.id) > -1) {
							book.shelf = 'currentlyReading';
						} else if (this.props.shelves.wantToRead.indexOf(book.id) > -1) {
							book.shelf = 'wantToRead';
						} else if (this.props.shelves.read.indexOf(book.id) > -1) {
							book.shelf = 'read';
						}
						return book;
					});
					this.setState({
						books: result
					});
				} else {
					this.setState({books: []});
				}
			}).catch(err => {
				console.log(err);
			});
		}
	};

	render() {
		return (
			<div className='row'>
				<div className='col-12'>
					<div className="form-group">
						<input placeholder='Search' className="form-control" value={this.state.query} onChange={this.updateQuery}/>
					</div>
					<div className='row'>
						{this.state.books.length ?
							this.state.books.map((book) => (
								<Book changeShelf={this.props.changeShelf} key={book.id} book={book}/>
							)) :
							<div className='col-12'>
								<h5>Type your search query to find related books</h5>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}

}

export default SearchPage;