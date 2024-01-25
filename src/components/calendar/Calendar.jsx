/* eslint-disable react/prop-types */
import { Calendar as Planner } from "react-calendar";
import classNames from "classnames";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Calendar = ({ todos }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const events = todos.map((task) => ({
    title: task.title,
    start: task.id,
    end: task.id,
  }));

  return (
    <div>
      <button 
        className='btn btn-primary modal-button'
        onClick={handleButtonClick}
      >
        Show calendar
      </button>

      <div className={classNames('calendarBlock', { visible: isVisible })}>
        <div className="planner-wrapper">
          <button onClick={handleButtonClick} className="button-close">
            <img 
              src=".../../../public/close.svg" 
              alt="close-button" 
              className="button-image"
            />
          </button>
          <Planner
            className='calendar'
            events={events}
            onChange={onChange} 
            value={value}
          />
        </div>
      </div>
    </div>
  )
}