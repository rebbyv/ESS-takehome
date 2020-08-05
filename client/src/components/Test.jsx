import React, { useState, useEffect } from 'react';

///////////// USING HOOKS /////////////

var Test = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    props.data.completed = checked;
    props.renderPDF();
  },[checked])

  return (
    <div className='test-row'>
      <span className='test-box test-checkbox'>
        <input type="checkbox" name="checkBox1" checked={checked} onChange={() => setChecked(!checked)}></input>
      </span>
      <span className='test-box'>{props.data.name}</span>
      <span className='test-box'>{props.data.duration}</span>
      <span className='test-box'>{props.data.num_of_questions}</span>
      <span className='test-box'><strong>{props.data.course_name}</strong> - {props.data.description}</span>
      <span className='test-box'>{props.data.domain}</span>
      <span className='test-box edit-box'>
        <span className='edit-course-btn' onClick={() => props.modal('Edit', 'Course', props.data)}>Edit Course</span>
        {props.data.name !== null ? <span className='edit-test-btn' onClick={() => props.modal('Edit', 'Test', props.data)}>Edit Test</span>: null}
        <span className='edit-course-btn' onClick={() => props.modal('Add', 'Test', null, props.data.courseID)}>Add Test</span>
      </span>
    </div>
  )
}


///////////// WITHOUT HOOKS /////////////

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checked: false
//     }
//   }
  
//   // check or uncheck a test
//   checkBox() {
//     this.props.data.completed = !this.state.checked;
//     this.props.renderPDF();
//     this.setState({ checked: !this.state.checked })
//   }

//   render() {

//     return (
//       <div className='test-row'>
//         <span className='test-box test-checkbox'>
//           <input type="checkbox" name="checkBox1" checked={this.state.checked} onChange={this.checkBox.bind(this)}></input>
//         </span>
//         <span className='test-box'>{this.props.data.name}</span>
//         <span className='test-box'>{this.props.data.duration}</span>
//         <span className='test-box'>{this.props.data.num_of_questions}</span>
//         <span className='test-box'><strong>{this.props.data.course_name}</strong> - {this.props.data.description}</span>
//         <span className='test-box'>{this.props.data.domain}</span>
//         <span className='test-box edit-box'>
//           <span className='edit-course-btn' onClick={() => this.props.edit(this.props.data, 'Course')}>Edit Course</span>
//           {this.props.data.name !== null ? <span className='edit-test-btn' onClick={() => this.props.edit(this.props.data, 'Test')}>Edit Test</span>: null}
//           <span className='edit-course-btn' onClick={() => this.props.add('Test', this.props.data.courseID)}>Add Test</span>
//         </span>
//       </div>
//     )
//   }
// }

export default Test;