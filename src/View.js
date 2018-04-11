import React, {Component} from 'react';
import * as BooksAPI from "./BooksAPI";

class View extends Component {
	state = {
		book: null
	};

	changeShelf = (e) => {
		this.props.changeShelf(this.props.book, e.target.value);
	};

	componentDidMount = () => {
		BooksAPI.get(this.props.match.params.id).then(result => {
			console.log(result);
			this.setState({
				book: result
			})
		}).catch(err => {
			console.log(err);
		})
	};

	render() {
		if (this.state.book) {
			return (
				<div className="row">
					<div className="col-4">
						<img className="col-12" alt=""
						     src={this.state.book.imageLinks && this.state.book.imageLinks.thumbnail ? this.state.book.imageLinks.thumbnail : 'http://via.placeholder.com/128x170'}/>
					</div>
					<div className="col-8">
						<h5>{this.state.book.title}</h5>
						<p>Author{this.state.book.authors.length > 1 && 's'}: {this.state.book.authors.join(',')}</p>
						<p> Description: <i>{this.state.book.description}</i></p>
						<p><a target='_blank' href={this.state.book.previewLink}>View preview</a></p>
					</div>
				</div>
			)
		} else {
			return (<div>Loading...</div>)
		}

	}

}

export default View;
