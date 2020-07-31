var Test = (props) =>{
    return (
      <li>
        <span>•  {props.data.name}  |  {props.data.duration}  |  {props.data.numQuestions} Questions</span>
        {/* <span></span>
        <span></span> */}
        <span className='edit-test-btn' onClick={() => props.edit(props.data)}>Edit</span>
      </li>
    )
}

export default Test;