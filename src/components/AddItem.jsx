import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({newItem, onNewItem, handaleSubmit}) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handaleSubmit}>
      <label htmlFor='addItem'>Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id='addItem'
        type='text'
        placeholder='Add Item'
        required
        value={newItem}
        onChange={(event) => onNewItem(event.target.value)}
      />
      <button type='submit' aria-label='Add Item'>
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
