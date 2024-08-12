import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react'

const Task = ({ task, deleteTask, updateTask }) => {

    const [editMode, setEditMode] = useState(false);

    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
        id: task.id,
        //setting data in Sortable/Draggable things, when onDragStart function get called then event of onDragStart will contain this custom data
        data: {
            type: 'Task',
            task
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform) //changed the type of transform
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} key={task.id} className='flex justify-between items-center mx-2 rounded-lg bg-black px-4 py-6' onClick={() => setEditMode(true)} ></div>
        );
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} key={task.id} className='flex justify-between items-center mx-2 rounded-lg bg-black px-4 py-6' onClick={() => setEditMode(true)}>
            {!editMode && <p>{task.task}</p>}
            {editMode && <input value={task.task} autoFocus onBlur={() => setEditMode(false)} type="text" className='bg-black text-white w-full mx-2' onChange={(e) => updateTask(e.target.value, task.id)}
                onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    setEditMode(false);
                }} />}
            <button onClick={() => deleteTask(task.id)}>
                <svg className='size-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
        </div>
    )
}

export default Task