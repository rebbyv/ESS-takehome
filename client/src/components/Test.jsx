var Test = (props) =>{
    return (
      <li>
        <span>{props.data.name ? `•  ${props.data.name}  |  ${props.data.duration}  |  ${props.data.numQuestions} Questions`: null}</span>
        <span className='edit-test-btn' onClick={() => props.edit(props.data)}>{props.data.name ? 'Edit': null}</span>
      </li>
    )
}

export default Test;