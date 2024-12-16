import React, { useState } from 'react'
import '../views/Calendar.css' // Import the CSS file for styling

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const renderCalendar = () => {
    const month = currentMonth.getMonth()
    const year = currentMonth.getFullYear()
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = new Date(year, month, 1).getDay()

    const calendarDays = []

    // Fill empty slots before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>)
    }

    // Fill the calendar with actual days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div key={day} className="calendar-day">
          {day}
        </div>,
      )
    }

    return calendarDays
  }

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <div className="calendar-header">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)),
            )
          }
        >
          &lt;
        </button>
        <h2>
          {currentMonth.toLocaleString('default', { month: 'short' })}{' '}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)),
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      <div className="days-of-week">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
