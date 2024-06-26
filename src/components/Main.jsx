import React, { useEffect, useRef, useState } from "react";

function Main() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const inputRef = useRef(null)

  useEffect(() => {
   inputRef.current.focus()
  })

  return (
    <div className="app">
      <h1>To-Do List</h1>


      {/* ----------------- Adding Items to ToDo list ------------------ */}

      <div className="input-container">
         <input
            onChange={(e) => setTodo((e.target.value))}
            type="text"
            id="new-task"
            placeholder="Add a new task"
            autoComplete="off"
            value={todo}
            ref={inputRef}
         ></input>
         <button
            id="add-task"
            onClick={() => {
               console.log(todo);
               setList([...list, { id: Date.now(), text: todo, status: false }]);
               setTodo('') 
            }}
         >
            Add
         </button>
      </div>



      {/* ------------------- Listing Incompleted ToDos --------------- */}

      <ul id="task-list">
        {list.map((element) => {
          if(element.status === false){
            return (
               <>
                 <li> 
                  <p onClick={(e) => {
                     console.log(e.target.value);
                     console.log(element);
                     setList(list.filter(obj => {
                        if(obj.id === element.id){
                           obj.status = !element.status
                        }
                        return obj
                     }))
                  }} >{element.text} </p>
                 <div>


                  {/* ------------------- Editing one element from the list ------------------------------ */}

                 <i onClick={() => {
                  setTodo((element.text))
                  setList(list.filter((obj) => obj.id !== element.id))
                 }} className="fa-solid fa-pen"></i>   


                 {/* --------------------- Deleting one element from the list -------------------------- */}

                 <i onClick={() => {
                  setList(list.filter((obj) => obj.id !== element.id));
                 }} className="fa-solid fa-xmark"></i>


                 </div>
                 </li>              
               </>
             );
          }
          return null
        })}
      </ul>



      {/* --------------------- Listing completed ToDos -------------------- */}


      {
         list.map((ele) => {
          if(ele.status){
             return(
                <>
                <ul className="completed-ul">
                   <li className="completed-li">
                      <p onClick={(e) => {
                         setList(list.filter(obj => {
                            if(obj.id === ele.id){
                               obj.status = !ele.status
                              }
                              return obj
                           }))
                        }} >{ele.text}</p>
                   </li>
                </ul>
                </>
             )
            }
            return null
         })
      }

      <div className="clear-div">

      {/* ------------------ Clear All button -------------------- */}

      {
         list.length > 0 ? (<button onClick={() => {
            setList([])
         }} className="delete">Clear all</button>) : null
      }


      {/* -----------------Clear completed items button ------------------ */}

      {
         list.length > 0 ? (
         <button onClick={() => {
            setList(list.filter((obj) => obj.status === false))
         }} className="delete"> Clear Completed </button>):null
      }
      </div>
      

    </div>
  );
}

export default Main;
