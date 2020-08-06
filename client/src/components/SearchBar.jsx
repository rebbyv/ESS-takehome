import React, { useState } from 'react';

///////////// USING HOOKS /////////////
var SearchBar = (props) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('course id')

  const handleChange = (event) => {
    setQuery(event.target.value);
    props.search(event.target.value, option);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.search(query, option)
    setQuery('');
    setOption('course id');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={query} onChange={handleChange} placeholder='Search'></input>

      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value='course id'>Course Id</option>
        <option value='course name'>Course Name</option>
        <option value='test name'>Test Name</option>
      </select>

      <input id='form-submit-btn' type="submit" value="Submit"/>

      <button id='reset-btn' onClick={() => props.search(null, 'course id')}>Reset Search</button>
    </form>
  )
}

export default SearchBar;


/*
///////////// WITHOUT HOOKS /////////////
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      option: 'course id'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  // handle user input for searches
  handleChange(event) {
    // search what the user has entered so far
    this.props.search(event.target.value, this.state.option);
    // update state to hold current input
    this.setState({ input: event.target.value })
  }

  // on submitting the form, search for the input & reset state
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ input: '', option: 'course id' });
  }

  // change what term to search by- course id, course name, or test name
  handleSelectChange(event) {
    this.setState({ option: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.input} onChange={this.handleChange} placeholder='Search by Course or Test'></input>

        <select value={this.state.option} onChange={this.handleSelectChange}>
          <option value='course id'>Course Id</option>
          <option value='course name'>Course Name</option>
          <option value='test name'>Test Name</option>
        </select>

        <input id='form-submit-btn' type="submit" value="Submit"/>
      </form>
    )
  }
}
*/