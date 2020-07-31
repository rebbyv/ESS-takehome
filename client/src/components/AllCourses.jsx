import Course from './Course.jsx';

var AllCourses = (props) => {
  return (
    <div>
      {props.courses.map((course, i) => <Course data={course} key={i} edit={props.edit} add={props.add}/>)}
    </div>
  )
}

export default AllCourses;