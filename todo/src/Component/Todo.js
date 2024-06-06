import React, {useState, useEffect} from 'react';
import '../Css/Todo.css';
import Checkbox from '@mui/material/Checkbox';


function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [count, setCount] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editTodo, setEditTodo] = useState(''); 
  
    const addTodo = () => {
      setTodos([...todos, newTodo]);
      setNewTodo('');
      setCount((count) => count + 1);
    };
  
    const removeTodo = (index) => {
        if(window.confirm('정말로 삭제하시겠습니까?')){
            const updatedTodos = [...todos];
            updatedTodos.splice(index, 1);
            setTodos(updatedTodos);
            setCount((count) => count - 1);
        }
    };
  
    const startEditing = (index, todo) => {
      setEditingIndex(index);
      setEditTodo(todo);
    };
  
    const saveEdit = () => {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = editTodo;
      setTodos(updatedTodos);
      setEditingIndex(null);
    };
  
    const cancelEdit = () => {
      setEditingIndex(null);
      setEditTodo('');
    };

    
    return(
        <>
            <div className='main-container'>
                <div className='head'>
                    <h1 style={{textAlign:'center', fontSize:'100px', color:'#A9A9F5'}}>Todo List</h1>
                    <h2>할 일 : {count}개</h2>
                </div>
                <div>
                    <div className='container'>
                        <input
                            type='text'
                            placeholder='할 일을 작성해주세요.'
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button onClick={addTodo}>Add Todo</button>
                    </div>
                        <div className='list-container'>
                        <ul className='list'>
                            {todos.map((todo, index) => (
                                <li key={index}>
                                    {editingIndex === index ? (
                                        <div>
                                            <input
                                                type='text'
                                                value={editTodo}
                                                onChange={(e) => setEditTodo(e.target.value)}
                                            />
                                            <div>
                                                <button onClick={saveEdit}>저장</button>
                                                <button onClick={cancelEdit}>취소</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='todo-contents'>
                                            <div className='todo'>
                                                {todo}
                                            </div> 
                                            <div className='btn'>
                                                <button onClick={() => startEditing(index, todo)}>수정</button>
                                                <button onClick={() => removeTodo(index)}>삭제</button>
                                            </div>  
                                        </div>        
                                    )}
                                </li>
                            ))}
                        </ul>
                        </div>
                </div>
            </div>
        </>
    );
}

export default TodoList;