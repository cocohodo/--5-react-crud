import React, {useState} from 'react';

const List = React.memo(({handleClick, handleEditClick, id, title, price, todoData, setTodoData, provided, snapshot}) => {
      
  return (
    <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? "bg-green-200" : "bg-white"} flex items-center justify-between px-4 py-1 my-4 text-gray-600 border border-green-500 rounded hover:scale-105 transition-transform duration-500`}>
            <div className='items-center'>
              <span className='mr-4'>{title}</span>
            </div>
            <div className='items-center'>
              <span>{price}</span>
            </div>
            <div className='items-center'>
                <button className='px-1 py-2 ml-1 float-right hover:bg-green-200 rounded border border-green-500' onClick={() =>{handleClick(id)}}>delete</button>
                <button className='px-1 py-2 float-right hover:bg-green-200 rounded border border-green-500' onClick={() =>{handleEditClick(id)}}>edit</button>
            </div>
    </div>
  )
});
export default List;