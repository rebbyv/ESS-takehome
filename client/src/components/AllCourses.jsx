import React from 'react';
import Test from './Test.jsx';

var AllCourses = (props) => {

  // returns the header row for the table to display tests & maps the rest of the rows
  return (
    <div>
      <div className='test-row'> 
        <span className='test-box test-checkbox'></span>
        <span className='test-box test-header'>Test Name</span>
        <span className='test-box test-header'>Test Duration</span>
        <span className='test-box test-header'># Questions</span>
        <span className='test-box test-header'>Course</span>
        <span className='test-box test-header'>Course Category</span>
        <span className='test-box test-header'>Options</span>
      </div>
      {props.courses.map((course, i) => <Test data={course} key={i} edit={props.edit} add={props.add} renderPDF={props.renderPDF}/>)}
    </div>
  )
}

export default AllCourses;