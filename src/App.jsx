import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleEdit = (e,id) => {
   let t =  todos.filter((i)=> i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });

    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {

 
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });

    setTodos(newTodos)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-50 min-h-screen">
        <h1 className="font-bold text-center text-xl">iTask Manage yout todos at one place </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white px-3 mx-2 py-1 rounded-2xl'>Save</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos ">
          {todos.length ===0 && <div  className='m-5'>No todos to display</div> }
          {todos.map((item) => {
            return <div key={item.id} className="todo flex w-1/2 justify-between my-3 flex-wrap">
              <div className="aria-desctiption flex gap-5">

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full ">
                <button onClick={(e)=> {handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white px-3 ml-2 rounded'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white px-3 ml-1 rounded'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App;
