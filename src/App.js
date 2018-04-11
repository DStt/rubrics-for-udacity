import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Shelf from './Shelf';
import SearchPage from './SearchPage';
import View from './View';
import * as BooksAPI from "./BooksAPI";
import './App.css';


class App extends Component {
	state = {
		books: [],
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: [],
		}
	};

	changeShelf = (book, shelf) => {
		if (shelf) {
			BooksAPI.update(book, shelf).then(result => {
				this.setState({
					shelves: result
				});
			});
		}
	};

	componentDidMount = () => {
		BooksAPI.getAll().then(result => {
			let shelves = {
				currentlyReading: [],
				wantToRead: [],
				read: [],
			};
			result.map(b => {
				shelves[b.shelf].push(b.id);
				return b;
			});
			this.setState({
				books: result,
				shelves: shelves
			});
		}).catch(err => {
			console.log(err);
		})
	};

	render() {
		return (
			<div className="App">
				<div className="navbar navbar-dark bg-dark fixed-top">
					<div className='container d-flex justify-content-between'>
						<Link to="/" className="navbar-brand" href="#">
							<i className='fa fa-fw fa-home'/>
							Rubrics for Udacity
						</Link>
						<span className="navbar-text">
							<Link to="/search" className='btn btn-link'>
								Search
								<i className='fa fa-fw fa-search'/>
							</Link>
				        </span>
					</div>
				</div>
				<div className='container'>
					<div className='spacer'/>
					<Route exact path='/' render={() => (
						<div>
							<Shelf changeShelf={this.changeShelf} name='Currently reading'
							       books={this.state.books.filter(b => this.state.shelves.currentlyReading.indexOf(b.id) > -1)}/>
							<Shelf changeShelf={this.changeShelf} name='Want to read'
							       books={this.state.books.filter(b => this.state.shelves.wantToRead.indexOf(b.id) > -1)}/>
							<Shelf changeShelf={this.changeShelf} name='Read'
							       books={this.state.books.filter(b => this.state.shelves.read.indexOf(b.id) > -1)}/>
						</div>
					)}/>
					<Route exact path="/view/:id" component={View}/>
					<Route exact path='/search' render={() => (
						<SearchPage shelves={this.state.shelves} changeShelf={this.changeShelf}/>
					)}/>
				</div>
			</div>
		);
	}
}

export default App;
