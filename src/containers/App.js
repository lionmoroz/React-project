import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import {setSearchField} from '../action';
import "./App.css";


const mapStateToProps=state=>{
	return{
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {	
		onSearchChange:(event)=>(dispatch(setSearchField(event.target.value))
	)}
}

class App extends Component  {
	constructor() {
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots:users}));
	}

	render (){
		const{robots} = this.state;
		const{searchField, onSearchChange}=this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
			})
		if (!robots.length){
			return <h1 className='tc'>Loading</h1>
		}else{
			return (
				<div className='tc'>
					<h1 className="f2">My litle robots</h1>
					<Searchbox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>);
			}
		}

	}



export default connect(mapStateToProps, mapDispatchToProps) (App);