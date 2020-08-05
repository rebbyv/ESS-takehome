import React, {useState } from 'react';

var DeleteBtn = (props) => {
  const [count, setCount] = useState(0);

  const handleDelete = () => {
    // make user confirm deletion
    if (count === 0) {
      setCount(count + 1);
    } else {
      // delete & close edit modal
      props.delete(props.data)
      props.closeEdit()
    }
 
  }

  return (
    <div className='delete-div'>
      {count === 1 ? <span>Are you sure? {props.type} will be deleted.</span>: null}
      <button id='delete-btn' onClick={handleDelete}>{count === 1 ? 'Yes, ':null}Delete {props.type}</button>
    </div>
  )
}

export default DeleteBtn;