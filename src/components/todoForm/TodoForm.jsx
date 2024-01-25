import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { TodoList } from "../todoList/Todolist";
import { addTodo } from "../../api/api";

export const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newTodo = {
      id: Date.now().toString(),
      title: todo,
    };
  
    try {
      await addTodo(newTodo);
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
      setTodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <section>
      <form className="form__inputWrapper" onSubmit={handleSubmit}>
        <input 
          value={todo}
          type="text" 
          className="form__input"
          placeholder="Add your task"
          onChange={(e) => setTodo(e.target.value)}
        />

        <button type="submit" className="btn btn-primary form__button">Add Todo</button>
      </form>

      <TodoList tempTodos={todoList} setTempTodos={setTodoList} />
    </section>
  )
}