class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      option: 'course id'
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSumbit = this.onSumbit.bind(this);
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
  onSumbit(event) {
    event.preventDefault();
    this.props.search(this.state, this.state.option);
    this.setState({ input: '', option: 'id' });
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

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default SearchBar;