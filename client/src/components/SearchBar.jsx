class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      option: 'id'
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSumbit = this.onSumbit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {
    this.props.search(event.target.value, this.state.option);
    this.setState({ input: event.target.value })
  }

  onSumbit(event) {
    event.preventDefault();
    this.props.search(this.state);
    this.setState({ input: '', option: 'id' });
  }

  handleSelectChange(event) {
    this.setState({ option: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.input} onChange={this.handleChange}></input>

        <select value={this.state.option} onChange={this.handleSelectChange}>
          <option value='id'>Course Id</option>
          <option value='course name'>Course Name</option>
          <option value='test name'>Test Name</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default SearchBar;