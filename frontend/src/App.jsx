import Main from "./components/Main"
import { KanbanBoard } from "./kanban/KanbanBoard"

function App() {
  return (
    <div>
      {/* <Main /> */}
      <KanbanBoard/>
    </div>
  )

}

export default App

{/* <div class='h-screen flex justify-center items-center gap-4 overflow-x-auto'>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-red-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>
  <div class="flex justify-center items-center">

  <button class="bg-red-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
</div>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-violet-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>
  <div class="flex justify-center items-center">

  <button class="bg-violet-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
</div>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-pink-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>
  <div class="flex justify-center items-center">

  <button class="bg-pink-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
</div>
</div>


<div class='h-screen flex justify-center items-center gap-4 overflow-x-auto'>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-green-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="flex justify-center items-center">

  <button class="bg-green-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
  
</div>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-cyan-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="flex justify-center items-center">

  <button class="bg-cyan-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
  
</div>

<div class="h-[96] w-64 bg-gray-800 rounded-lg">
  <div class="h-10 bg-fuchsia-500 rounded-lg rounded-b-none flex justify-center items-center text-white font-bold">
    To do
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>

  <div class="h-28 bg-gray-600 rounded-lg my-4 mx-3 flex justify-center items-center text-white px-4">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi?
  </div>
  <div class="flex justify-center items-center">

  <button class="bg-fuchsia-500 text-white px-5 py-1 rounded-lg mb-4">Add Task</button>
  </div>
</div>
</div> */}
