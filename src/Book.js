import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Book extends Component {

	toggleShowMove = () => {
		this.setState((prev) => ({
			show_move: !prev.show_move
		}));
	};

	constructor(props) {
		super(props);
		this.state = {
			show_move: false,
			shelf: props.book.shelf || 'none'
		};
	};

	changeShelf = (e) => {
		this.setState({
			show_move: false,
			shelf: e.target.value
		});
		this.props.changeShelf(this.props.book, e.target.value);
	};

	render() {
		return (
			<div className="col-sm-6 col-lg-4 col-xl-3">
				<div className="card">
					<img className="card-img-top" alt=""
					     src={this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail ? this.props.book.imageLinks.smallThumbnail : 'http://via.placeholder.com/128x170'}/>
					<div className="card-body">
						<h5 className="card-title">{this.props.book.title}</h5>
					</div>
					<div className='card-footer text-center'>
						{this.state.show_move ?
							<div className="input-group">
								<select className='custom-select' value={this.state.shelf}
								        onChange={this.changeShelf}>
									<option value="none" disabled>Select a shelf</option>
									<option value='currentlyReading'>Currently reading</option>
									<option value='wantToRead'>Want to read</option>
									<option value='read'>Read</option>
									<option value="none">None</option>
								</select>
								<span className="input-group-append">
									<button className='btn btn-default' onClick={this.toggleShowMove}>
										<i className='fa fa-close'/>
									</button>
								</span>
							</div>
							:
							<div className='btn-group'>
								<button className='btn btn-default' onClick={this.toggleShowMove}>
									Move <i className='fa fa-arrows'/>
								</button>
								<Link to={'/view/'+this.props.book.id+'/'} className='btn btn-primary' onClick={this.view}>
									View <i className='fa fa-eye'/>
								</Link>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}

}

export default Book;
