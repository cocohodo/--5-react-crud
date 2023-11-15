import React from 'react'
import List from './List'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Lists = React.memo(({ todoData, setTodoData, handleClick, handleEditClick }) => {
    const handleEnd = (result) => {
        console.log(result);
        if(!result.destination) return;
        const newTodoData = todoData;

        // 1. 변경시키는 아이템을 배열에서 지운다.
        // 2. return값으로 지워진 아이템을 잡는다.
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        //원하는 자리에 reorderedItem을 insert한다.
        newTodoData.splice(result.destination.index,0,reorderedItem);
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
    }
    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId='todo'>
                    {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {todoData.map((data, index) => (
                        <Draggable
                        key={data.id}
                        draggableId={data.id.toString()}
                        index={index}
                        >
                            {(provided, snapshot) => (
                                <List handleClick={handleClick} handleEditClick={handleEditClick} key={data.id} id={data.id} title={data.title} price={data.price} todoData={todoData} setTodoData={setTodoData} provided={provided} snapshot={snapshot}/>
                            )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
})

export default Lists
