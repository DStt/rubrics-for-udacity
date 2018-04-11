import React, {Component} from 'react';
import Book from './Book';

class Shelf extends Component {

	render() {
		return (
			<div className='row'>
				<div className="col">
					<h1>{this.props.name}</h1>

					<div className='row'>
						{this.props.books.length ?
							this.props.books.map(book => (
								<Book changeShelf={this.props.changeShelf} key={book.id} book={book}/>
							)) :
							<div className='col-12'>
								<div className='jumbotron'>
									<h4>Empty shelf</h4>
									<h5>Add some books!</h5>
								</div>
							</div>
						}
					</div>
					<hr className='divider'/>
				</div>
			</div>
		)
	}

}

export default Shelf;