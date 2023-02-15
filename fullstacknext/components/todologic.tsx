import React from 'react'

import {Suspense, useEffect, useState} from 'react';
function EditorApp() {
    const Delete = async (id) => {
        console.log('dfsa')
        const res  = await fetch(`api/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log(res)
        handleRefresh()
    
      }
    
    
      const [text, setText] = useState<string>('text')
      const handleSubmit = async () => {
        setText('')
        const res = await fetch("api/todos", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todo: text
          })
        })
        const data = await res.json()
        handleRefresh()
      }
      const [todos, setTodos] = useState()
      const handleRefresh = async () => {
        const res = await fetch("api/todos", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        setTodos(data)
      }
      useEffect(() => {
        handleRefresh()
      }, [])
    
    
    
  return (
    <>
          <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>add todo</button>

      <h1> todo list from prisma: </h1>
      <button onClick={handleRefresh}>refresh list of todo list</button>
      {todos ? (todos.map(todo => {
        return (

          <div key={todo.id}>
            {todo.todo} {todo.id}
            <button onClick={async () => await Delete(todo.id)}>delete todo</button>
          </div>
        )
      } )):<div>Loading todos</div>}
    </>
  )
}

export default EditorApp