import React from 'react';
import SearchBar from './SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  search() {
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <SearchBar search={this.search.bind(this)}/>
        {/* <AllCourses /> */}
        <button>Add New Course</button>
      </div>
    )
  }
}

export default App;