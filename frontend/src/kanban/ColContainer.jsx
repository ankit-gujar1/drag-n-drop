import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useMemo, useState } from 'react'
import Task from './Task';
import { getColor } from '../utils/colors';

const ColContainer = ({ col, deleteCol, updateTitle, createTask, tasks, deleteTask, updateTask }) => {
    const { color } = col;

    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
        id: col.id,
        //setting data in Sortable/Draggable things, when onDragStart function get called then event of onDragStart will contain this custom data
        data: {
            type: 'Col',
            col,
            color
        }
    });

    const [editMode, setEditMode] = useState(false);

    const taskIds = useMemo(() => {
        return tasks.map((i) => i.id);
    }, [tasks])
    const style = {
        transition,
        transform: CSS.Transform.toString(transform) //changed the type of transform
    }

    if (isDragging) {
        return (
            <div style={style} ref={setNodeRef} className={` bg-black text-white w-72 rounded-lg h-[32rem] flex flex-col opacity-40 border-2 ${color}`}></div>
        )
    }

    return (
        // key is IMP for smooth animation
        <div style={style} ref={setNodeRef} key={col.id} className='bg-gray-900 text-white w-72 rounded-lg h-[32rem] flex flex-col'>
            <div {...attributes} {...listeners} className={`flex justify-around items-center py-4 rounded-lg rounded-b-none ${color}`} onClick={() => setEditMode(true)}>
                {/* <p>0</p> */}
                {!editMode && <p className='font-bold'>{col.title}</p>}
                {editMode &&
                    <input value={col.title} autoFocus onBlur={() => setEditMode(false)} className='text-white bg-black border-2 border-white' type='text' onChange={(e) => updateTitle(e.target.value, col.id)}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter') return;
                            setEditMode(false);
                        }} />}
                <button onClick={() => { deleteCol(col.id) }}>
                    <svg className='size-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            </div>
            <div className='flex flex-grow flex-col gap-4 mt-4 mb-2 mx-3 overflow-y-auto'>
                <SortableContext items={taskIds}>
                    {tasks && tasks.map((i) => (
                        <Task task={i} key={i.id} deleteTask={deleteTask} updateTask={updateTask} color={color} />
                    ))}
                </SortableContext>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={() => createTask(col.id)} className={`flex justify-center items-center py-2 px-6 rounded-lg mb-5 my-2 ${color}`}>
                    <svg className='size-5 font-bold me-3' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#ffffff"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                    Add Task
                </button>
            </div>
        </div>
    )
}

export default ColContainer