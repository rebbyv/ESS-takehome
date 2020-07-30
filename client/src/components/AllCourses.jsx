import Course from './Course.jsx';

class AllCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>Available Courses</h3>
        {this.props.courses.map((course, i) => <Course data={course} key={i}/>)}
      </div>
    )
  }
}

export default AllCourses;