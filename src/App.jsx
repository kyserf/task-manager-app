import './App.scss';
import { TodoForm } from './components/todoForm/TodoForm';

function App() {
  return (
    <main className='app'>
      <div className='app__container'>
        <h1 className='app__title'>Task Manager</h1>

        <TodoForm />
      </div>
    </main>
  )
}

export default App
