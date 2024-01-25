import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { TodoList } from "../todoList/Todolist";
import { addTodo } from "../../api/api";

export const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newTodo = {
      id: Date.now().toString(),
      title: todo,
      date: date,
    };
  
    try {
      await addTodo(newTodo);
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
      setTodo('');
      setDate(null);

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

        <input 
          type="date" 
          className="form__input form__input--date" 
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit" className="btn btn-primary form__button">Add</button>
      </form>

      <TodoList tempTodos={todoList} setTempTodos={setTodoList} />
    </section>
  )
}