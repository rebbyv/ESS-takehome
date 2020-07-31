var Test = (props) =>{
    return (
      <div>
        <span>{props.data.name}</span>
        <span>{props.data.duration}</span>
        <span>{props.data.numQuestions}</span>
        <span onClick={() => props.edit(props.data)}>Edit</span>
      </div>
    )
}

export default Test;