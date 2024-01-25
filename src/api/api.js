import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, newTodo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.status === 201) {
      console.log('Todo added successfully!');
    } else {
      console.error("Failed to add new todo");
    }
  } catch(err) {
    console.error("Error:", err);
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todoList`);

    if(response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to get todos");
    }
  } catch(err) {
    console.error("Error:", err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);

    if(response.status === 200) {
      console.log('Todo deleted successfully!');
    } else {
      console.error("Failed to delete todo");
    }
  } catch(err) {
    console.error("Error:", err);
  }
};

export const updateTodoTitle = async (id, updatedTitle) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update/${id}`, { title: updatedTitle }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.status === 200) {
      console.log('Todo title updated successfully!');
    } else {
      console.error("Failed to update todo title");
    }
  } catch(err) {
    console.error("Error:", err);
  }
};
