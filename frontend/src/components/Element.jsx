import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import React from 'react'

const Element = ({ id, name, value }) => {

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id });

    //to see dragging effect in real time
    const style = {
        transition,
        transform: CSS.Transform.toString(transform) //changed the type of transform
    }

    return (
        <div style={style} ref={setNodeRef} {...attributes} {...listeners} key={id} className='bg-white m-5 p-3 rounded-lg shadow-lg touch-none'>
            <p>{name}, {value}</p>

        </div>
    )
}

export default Element