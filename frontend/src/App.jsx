import React, { useState, useEffect } from 'react'
import TodoItem from './components/TodoItem'
import api from './api'

const App = () => {

  const [newTodoDes, setNewTodoDes] = useState("") // either used for creating a new todo
  const [todos, setTodos] = useState([])

  // send the task to backend and adds it to the array
  const addTodo = async () => {
    
    try {
      const response = await api.post('/todos', {title: newTodoDes})
      setTodos([...todos, response.data])
    }
    catch (error) {
      console.log(error)
    }

  }

  // send a delete request and removes the data from frontend
  const removeTodo = async (id) => {

    try {

      await api.delete(`/todos/${id}`)
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

    }
    catch (error) {

      console.log("could not delete task", error)

    }

  }

  // editing the current content of a todo
  const updateTitle = async (id, newTitle) => {
    try {
      await api.patch(`/todos/${id}/title`, {
        title: newTitle
      });
      setTodos(todos.map(todo => 
        todo.id === id ? {...todo, title: newTitle} : todo
      ));
    }
    catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/todos/${id}/status`, {
        completed: !currentStatus
      });
      setTodos(todos.map(todo => 
        todo.id === id ? {...todo, completed: !currentStatus} : todo
      ));
    } 
    catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // loads the intials todos
  useEffect(() => {

    const getTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data); // Axios wraps response data in .data
      } 
      catch (error) {
        console.error("Error fetching data:", error);
        // Optional: set error state here
      }
    };

    getTodos()

  }, [])

  // useEffect(() => {
  //   console.log(todos)
  // }, [todos])

  return (
    <div
      className='flex flex-col gap-5 min-h-screen h-full w-full bg-slate-800 font-poppins p-5 text-white text-sm'
    >
      
      <h1
        className='text-sky-500 text-xl font-semibold'      
      >
        Todo List
      </h1>

      {/* new task */}
      <div
        className='flex flex-col gap-1'
      >
        <p
          className='pl-1 text-sm'
        >
          New Task:
        </p>
        <div
          className='border-2 rounded-md p-2 pl-3 border-white flex flex-row gap-1'
        >
          <input 
            type="text" 
            placeholder='Task...'
            className='text-sm outline-none w-full' 
            value={newTodoDes}
            onChange={(e) => setNewTodoDes(e.target.value)} 
          />
          

          {/* confirm button */}
          {newTodoDes !== "" &&
            <>
              {/* clear button */}
              <button
                className='bg-rose-500 p-1 rounded border-2 '
                onClick={() => setNewTodoDes("")}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
                </svg>
              </button>

              {/* add new todo */}
              <button
                className='bg-emerald-500 p-1 rounded border-2 '
                onClick={() => addTodo()}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                </svg>
              </button>
            </>
            
          }

        </div>
        
      </div>

      <div
        className='flex flex-col gap-5 text-white'
      >

        <div
            className='flex flex-col gap-1'
        >
            <p
                className='font-medium pl-1'
            >
                Current Tasks:
            </p>
            <span 
                className='h-[1px] w-full bg-slate-300'
            ></span>
        </div>

        <div
          className='flex flex-col gap-3'
        >
            {todos.length > 0
              ? todos.map((task) => (
                  <TodoItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                    updateTitle={updateTitle}
                    deleteFunction={() => removeTodo(task.id)}
                    onToggle={toggleStatus}
                  />
                ))
              : <p>No tasks currently</p>
            }
        </div>

      </div>

    </div>
  )
}

export default App