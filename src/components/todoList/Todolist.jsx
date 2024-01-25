import PropTypes from 'prop-types';
import { getTodos, updateTodoTitle, deleteTodo } from '../../api/api';
import { useEffect, useState } from 'react';
import { Calendar } from '../calendar/Calendar';

export const TodoList = ({ tempTodos, setTempTodos }) => {
  const [todos, setTodos] = useState([]);
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, [tempTodos]);

  const handleDelete = (id) => {
    deleteTodo(id);
    setTempTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleEditTitle = (id, currentTitle) => {
    setEditableTodoId(id);
    setEditedTitle(currentTitle);
  };

  const handleUpdateTitle = async (id) => {
    try {
      await updateTodoTitle(id, editedTitle);
      setEditableTodoId(null);

      setTempTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, title: editedTitle } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo title:', error);
    }
  };

  return (
    <>
      <div className='todoList'>
        {todos.map(todo => (
          <div key={todo.id} className='todoList__todo'>
            {editableTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTitle(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <p className='todoList__todo_title'>{todo.title}</p>
                <div className='todoList__todo_buttonsWrapper'>
                  <button className='todoList__todo_button'>
                    <img 
                      src="../../public/pencil.svg" 
                      alt="rename" 
                      className='todoList__todo_button_img'
                      onClick={() => handleEditTitle(todo.id, todo.title)}
                    />
                  </button>

                  <button className='todoList__todo_button' onClick={() => handleDelete(todo.id)}>
                    <img 
                      src="../../public/trash.svg" 
                      alt="delete" 
                      className='todoList__todo_button_img' 
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className='calendar-block'>
        <Calendar todos={todos} />
      </div>
    </>
  );
};

TodoList.propTypes = {
  tempTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  setTempTodos: PropTypes.func,
};