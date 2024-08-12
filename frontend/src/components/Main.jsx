import React from 'react'
import { closestCorners, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useState } from "react"
import Elements from "./Elements"
import { arrayMove } from "@dnd-kit/sortable";

const Main = () => {
    const [elements, setElements] = useState([
        { id: 1, name: 'Element 1', value: Math.random() },
        { id: 2, name: 'Element 2', value: Math.random() },
        { id: 3, name: 'Element 3', value: Math.random() },
        { id: 4, name: 'Element 4', value: Math.random() },
        { id: 5, name: 'Element 5', value: Math.random() }
      ]);
    
      // we use return keyword if we are using curly braces
      // const getElementPos = (id) => {
      //   elements.findIndex((i) => {
      //     i.id === id
      //   })
      // }
    
      // correct function with return keyword is
      // const getElementPos = (id) => {
      //   return elements.findIndex((i) => {
      //     return i.id === id;
      //   });
      // };
    
    
      const getElementPos = (id) => elements.findIndex((i) => i.id === id);
    
    
      const handleDragEnd = (e) => {
        // console.log(e.active.id);
    
        const { active, over } = e;
        if (active.id === over.id) return;
    
        setElements((prevElements) => {
          const originalPos = getElementPos(active.id);
          const newPos = getElementPos(over.id);
          // console.log(originalPos,newPos);
          return arrayMove(prevElements, originalPos, newPos);
        })
      }
    
      const sensors=useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
      )
    
      return (
        <div className="flex justify-center items-center flex-col h-screen p-0 m-0">
          <p className="text-3xl my-5">dnd</p>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <Elements elements={elements} />
          </DndContext>
        </div>
      )
}

export default Main