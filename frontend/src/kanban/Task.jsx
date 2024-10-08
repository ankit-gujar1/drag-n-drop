import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react'

const Task = ({ task, deleteTask, updateTask, color }) => {

    const [editMode, setEditMode] = useState(false);

    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
        id: task.id,
        //setting data in Sortable/Draggable things, when onDragStart function get called then event of onDragStart will contain this custom data
        data: {
            type: 'Task',
            task,
            color
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform) //changed the type of transform
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className={`flex justify-between items-center mx-1 rounded-lg ${color} h-28 py-14 px-4 opacity-40 text-white touch-none`} onClick={() => setEditMode(false)}></div>
        );
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} key={task.id} className={`flex justify-between items-center mx-1 rounded-lg ${color} h-28 py-14 px-4 relative group touch-none`} onClick={() => setEditMode(true)}>
            {!editMode && <p className='text-white'>{task.task}</p>}
            {editMode && <input value={task.task} autoFocus onBlur={() => setEditMode(false)} type="text" className='bg-black text-white w-full mx-2' onChange={(e) => updateTask(e.target.value, task.id)}
                onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    setEditMode(false);
                }} />}
            <button className='absolute -top-1 -right-1 bg-white p-1 rounded-full hidden group-hover:block' onClick={() => deleteTask(task.id)}>
                <svg className='size-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
        </div>
    )
}

export default Task