import Course from './Course.jsx';

var AllCourses = (props) => {
  return (
    <div>
      <h3>Available Courses</h3>
      {props.courses.map((course, i) => <Course data={course} key={i} edit={props.edit}/>)}
    </div>
  )
}

export default AllCourses;