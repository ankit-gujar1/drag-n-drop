import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import Element from './Element'

const Elements = ({ elements }) => {
    return (
        <div className='bg-indigo-200 p-5 rounded-lg flex flex-col justify-center items-center'>
            <SortableContext items={elements} strategy={verticalListSortingStrategy}>
                {elements.map((i) => (
                    <Element id={i.id} name={i.name} value={i.value}/>
                ))}
            </SortableContext>
        </div>
    )
}

export default Elements