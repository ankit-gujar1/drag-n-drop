import React, { useEffect, useMemo, useState } from 'react'
import ColContainer from './ColContainer';
import { closestCorners, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import Task from './Task';
import { getColor } from '../utils/colors';
// import { getColor } from '../utils/colors';

export const KanbanBoard = () => {

    const [color, setColor] = useState();

    const [cols, setCols] = useState([]);
    const [activeCol, setActiveCol] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    // console.log(activeTask);

    const colId = useMemo(() => cols.map((i) => i.id), [cols]);

    const deleteCol = (id) => {
        // console.log(id);
        const newCol = cols.filter((i) => i.id !== id);
        setCols(newCol);

        const newTasks = tasks.filter((i) => i.colId !== id);
        setTasks(newTasks);
    }

    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    }

    const createCol = () => {

        const colToAdd = {
            id: generateId(),
            // title: `Col ${cols.length + 1}`Double Click to Edit
            title: 'Click to Edit Title',
            color: getColor()
        };

        setCols([...cols, colToAdd]);
    }

    const handleDragStart = (e) => {
        // console.log('handleDragStart', e);
        if (e.active.data.current?.type === 'Col') {
            setActiveCol(e.active.data.current.col);
            return;
        }

        if (e.active.data.current?.type === "Task") {
            setActiveTask(e.active.data.current.task);
            setColor(e.active.data.current.color);
            return;
        }
    }

    //handel only cols
    const handleDragEnd = (e) => {
        // console.log('handleDragEnd', e);
        //imp to null or you will get weird overlays
        setActiveCol(null);
        setActiveTask(null);
        setColor(null);

        const { active, over } = e;
        if (!over) return;

        const activeColId = active.id;
        const overColId = over.id;

        if (activeColId === overColId) return;

        //handleDragEnd will run only for cols
        const isActiveAColumn = active.data.current?.type === "Col";
        if (!isActiveAColumn) return;

        setCols((cols) => {
            const activeColIndex = cols.findIndex((i) => i.id === activeColId);
            const overColIndex = cols.findIndex((i) => i.id === overColId);

            return arrayMove(cols, activeColIndex, overColIndex);
        })
    }

    //handel only tasks
    const handleDragOver = (e) => {
        // console.log('handleDragOver', e);
        // setActiveCol(null);
        // setActiveTask(null);

        const { active, over } = e;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        //is Active thing is Task or Col and on which its dropping is Task or Col
        const isActiveATask = active.data.current?.type === 'Task'; //is-Active-A-Task
        const isOverATask = over.data.current?.type === 'Task'; //is-Over-A-Task

        //handleDragEnd will run only for tasks
        if (!isActiveATask) return; //if active thing is not task then return

        //if dragging element is task and dropping element is also task(not dropping on blank space of col)

        //dropping a task over another task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((i) => i.id === activeId);
                const overIndex = tasks.findIndex((i) => i.id === overId);

                //when dropping a task over another task of different col just change colId of active task to colId of over task, so that task will become part of new col

                if (tasks[activeIndex].colId !== tasks[overIndex].colId) {
                    tasks[activeIndex].colId = tasks[overIndex].colId;
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        //dropping a task over blank space of another col
        const isOverACol = over.data.current?.type === 'Col'; //is-Over-A-Col
        if (isActiveATask && isOverACol) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((i) => i.id === activeId);

                //when dropping a task over another different col just change colId of active task to overId which in this case is colId, so that task will become part of new col
                tasks[activeIndex].colId = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )

    const updateTitle = (title, id) => {
        const newCols = cols.map(i => {
            if (i.id === id) {
                return { ...i, title };
            } else {
                return i;
            }
        });
        setCols(newCols);
    }

    const createTask = (colId) => {
        // console.log(colId);
        const newTask = {
            id: generateId(),
            colId,
            task: 'Click to Edit'
        }
        setTasks([...tasks, newTask]);
    }

    const deleteTask = (id) => {
        // console.log(id);
        const newTasks = tasks.filter((i) => i.id !== id);
        setTasks(newTasks);
    }

    const updateTask = (task, id) => {
        // console.log(task, id);
        const newTasks = tasks.map((i) => {
            if (i.id === id) {
                return { ...i, task };
            } else {
                return i;
            }
        });
        setTasks(newTasks)
    }

    return (
        <div className='flex flex-col items-center min-h-screen justify-center px-4 overflow-y-hidden gap-4'>
            <div className='flex gap-4 overflow-x-auto w-[95%]'>
                <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors}>
                    <div className='flex gap-4'>
                        <SortableContext items={colId}>
                            {
                                cols && cols.slice().reverse().map((i) => (
                                    <ColContainer col={i} deleteCol={deleteCol} key={i.id} updateTitle={updateTitle} createTask={createTask} tasks={tasks.filter((j) => j.colId === i.id)} deleteTask={deleteTask} updateTask={updateTask} />
                                ))
                            }
                        </SortableContext>
                    </div>

                    {createPortal(
                        <DragOverlay>
                            {activeCol && (
                                <ColContainer col={activeCol} deleteCol={deleteCol} tasks={tasks.filter((j) => j.colId === activeCol.id)} deleteTask={deleteTask} updateTask={updateTask} />
                            )}
                            {activeTask && (
                                <Task task={activeTask} deleteTask={deleteTask} updateTask={updateTask} color={color} />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
            <button className='px-8 py-3 bg-black text-white rounded-lg font-bold flex items-center' onClick={createCol}>
                <svg className='size-5 font-bold me-3' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#ffffff"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                Add List
            </button>
        </div>
    )
}
