/* eslint-disable react/prop-types */
import { Calendar as Planner, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "bootstrap/dist/css/bootstrap.min.css";

export const Calendar = ({ todos, onClick }) => {

  const todosWithFormattedDate = todos.map(todo => {
    const formattedDate = new Date(todo.date);
  
    return {
      ...todo,
      date: formattedDate,
    };
  });

  const localizer = momentLocalizer(moment);

  const events = todosWithFormattedDate.map((todo) => ({
    title: todo.title,
    start: todo.date,
    end: todo.date,
    allDay: true,
  }));

  return (
    <>
      <div className="planner-wrapper">
        <button onClick={onClick} className="button-close">
          <img 
            src="../../../public/close.svg" 
            alt="close-button" 
            className="button-image"
          />
        </button>
        <Planner
          className='calendar'
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </>
  )
}